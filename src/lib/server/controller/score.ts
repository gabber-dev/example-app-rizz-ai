import {
  Configuration,
  Persona,
  PersonaApiFactory,
  Scenario,
  ScenarioApiFactory,
  SessionApiFactory,
} from "@/generated";
import OpenAI from "openai";

export class ScoreController {
  static async calculateScore(session: string): Promise<Record<string, any>> {
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
    const sessionApi = SessionApiFactory(config);
    const personaApi = PersonaApiFactory(config);
    const ScenarioApi = ScenarioApiFactory(config);

    const sessionObj = (await sessionApi.apiV1SessionSessionIdEndPost(session))
      .data;
    if (!sessionObj.persona || !sessionObj.scenario) {
      throw new Error("Couldn't get persona or scenario");
    }
    const scenarioObj = (
      await ScenarioApi.apiV1ScenarioScenarioIdGet(sessionObj.scenario)
    ).data;

    const personaObj = (
      await personaApi.apiV1PersonaPersonaIdGet(sessionObj.persona)
    ).data;

    const sessionMessages = (
      await sessionApi.apiV1SessionSessionIdMessagesGet(session)
    ).data;

    const history = sessionMessages.values.map((message) => {
      return {
        role: message.agent ? "assistant" : "user",
        content: message.text || "",
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
      console.log("NEIL", scoreJsonString);
      return scoreObj;
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
      console.log("NEIL Fixed", scoreJsonString);
      if (!fixedJsonString) {
        throw new Error("Failed to fix JSON");
      }
      const scoreObj = JSON.parse(fixedJsonString);
      return scoreObj;
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
- ability_to_progress_conversation
- kindness

each with scores: poor, fair, good

Please provide your outputs in JSON format with the format:
{
  "wit": "fair" | "good" | "poor",
  "humor": "fair" | "good" | "poor",
  "confidence": "fair" | "good" | "poor",
  "seductiveness": "fair" | "good" | "poor",
  "ability_to_progress_conversation": "fair" | "good" | "poor"
  "kindness": "fair" | "good" | "poor"
}

Make the output JSON parsable. Don't include any extra text or markdown. 
`;

  return prompt;
};
