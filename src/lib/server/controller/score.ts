import {
  Configuration,
  LLMApiFactory,
  Persona,
  PersonaApiFactory,
  RealtimeApiFactory,
  Scenario,
  ScenarioApiFactory,
} from "@/generated";
import OpenAI from "openai";
import { Score } from "@/lib/model/score";

export class ScoreController {
  static async calculateScore(session: string): Promise<Score> {
    const openai = new OpenAI({
      apiKey: "",
      baseURL: "https://app.gabber.dev/api/v1",
      defaultHeaders: { "x-api-key": process.env.GABBER_API_KEY },
    });
    const llm = "66df3c9d-5d8c-4cfc-8b65-a805c1f8ab53"; // Gabber LLM from dashboard
    const config = new Configuration({
      apiKey: process.env.GABBER_API_KEY,
      basePath: "https://app.gabber.dev",
    });
    const realtimeApi = RealtimeApiFactory(config);
    const personaApi = PersonaApiFactory(config);
    const scenarioApi = ScenarioApiFactory(config);
    const llmAPI = LLMApiFactory(config);

    const sessionObj = (await realtimeApi.getRealtimeSession(session)).data;
    if (
      !sessionObj.config.generative.persona ||
      !sessionObj.config.generative.scenario
    ) {
      throw new Error("Couldn't get persona or scenario");
    }
    const scenarioObj = (
      await scenarioApi.getScenario(sessionObj.config.generative.scenario.id)
    ).data;

    const personaObj = (
      await personaApi.getPersona(sessionObj.config.generative.persona.id)
    ).data;

    const messages = (
      await llmAPI.listContextMessages(sessionObj.config.generative.context.id)
    ).data;

    const history = messages.values
      .filter((msg) => msg.role !== "system")
      .map((msg) => {
        return {
          role: msg.role,
          content: msg.content,
        };
      });

    const systemMessage = generateSystemMessage(personaObj, scenarioObj);
    const scoreMessage = generateScoreMessage();

    const llmMessages = [
      { role: "system", content: systemMessage },
      ...history,
      { role: "user", content: scoreMessage },
    ] as { role: "user" | "assistant" | "system"; content: string }[];

    const result = await openai.chat.completions.create({
      model: llm,
      messages: llmMessages,
    });
    const scoreJsonString = result.choices[0].message.content;
    if (!scoreJsonString) {
      throw new Error("Failed to generate score");
    }
    try {
      const scoreObj = JSON.parse(scoreJsonString);
      const rizzScore = calculateRizzScore(scoreObj);
      return {
        ...scoreObj,
        rizz_score: rizzScore,
      };
    } catch (e) {
      const jsonFixMesages = [
        {
          role: "system",
          content: generateJSONSystemMessage(personaObj, scenarioObj),
        },
        { role: "user", content: scoreJsonString },
      ] as { role: "user" | "assistant" | "system"; content: string }[];
      const jsonFixResult = await openai.chat.completions.create({
        model: llm,
        messages: jsonFixMesages,
      });
      const fixedJsonString = jsonFixResult.choices[0].message.content;
      if (!fixedJsonString) {
        throw new Error("Failed to fix JSON");
      }
      const scoreObj = JSON.parse(fixedJsonString);
      const rizzScore = calculateRizzScore(scoreObj);
      return {
        ...scoreObj,
        rizz_score: rizzScore,
      };
    }
  }
}

const generateJSONSystemMessage = (persona: Persona, scenario: Scenario) => {
  return `You generated a score for a simulated scenario in JSON format. 
  The JSON format wasn't quite right. Can you fix this incorrect JSON?
  Make the output JSON parsable. Don't include any extra text or markdown.`;
};

const generateSystemMessage = (persona: Persona, scenario: Scenario) => {
  return `Your name is ${persona?.name}. ${persona?.description}.I want you to pretend ${scenario?.prompt}.
end of this exchange I will ask you to score me and return the score in JSON format.`;
};

const generateScoreMessage = () => {
  const prompt = `Thanks for helping me with that simulated scenario. Now that it's over, I want to generate a score. \
Please be harsh on me with the score.

For context on scoring
  
  Please rate my performance in the scenario based on the following attributes:
- wit
- humor
- confidence
- seductiveness
- flow (lack of filler words, ability to progress conversation)
- kindness

each with scores: poor, fair, good

For each attribute, include a short, casual and funny sentence of why you gave me the score I received for that attribute. For example, for flow you could say "You kept the conversation going, but used a lot of filler words like "um" and "like""

Also include an "overall_summary" field that summarizes my performance in the scenario. Make it funny and casual, using slang, but still useful

Please provide your outputs in JSON format with the format:
{
  "wit": "fair" | "good" | "poor",
  "wit_summary": "<summary of wit>"
  "humor": "fair" | "good" | "poor",
  "humor_summary": "<summary of humor>"
  "confidence": "fair" | "good" | "poor",
  "confidence_summary": "<summary of confidence>"
  "seductiveness": "fair" | "good" | "poor",
  "seductiveness_summary": "<summary of seductiveness>"
  "flow": "fair" | "good" | "poor"
  "flow_summary": "<summary of flow>"
  "kindness": "fair" | "good" | "poor",
  "kindness_summary": "<summary of kindness>"
  "overall_summary": <string>
}

Make the output JSON parsable. Don't include any extra text or markdown. 
`;

  return prompt;
};

const calculateRizzScore = (scoreObj: Record<string, string>): number => {
  const pointValues = {
    poor: 0,
    fair: 1,
    good: 2,
  };

  const attributes = [
    "wit",
    "humor",
    "confidence",
    "seductiveness",
    "flow",
    "kindness",
  ];

  let totalPoints = 0;
  const maxPoints = attributes.length * 2; // 2 is max points per attribute

  for (const attr of attributes) {
    const score = scoreObj[attr] as keyof typeof pointValues;
    totalPoints += pointValues[score] || 0;
  }

  // Convert to score out of 100 and round to nearest integer
  return Math.round((totalPoints / maxPoints) * 100);
};
