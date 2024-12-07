import {
  Configuration,
  SessionApiFactory,
  PersonaApiFactory,
  SessionTimelineItem,
} from "@/generated";

export class SessionController {
  private static getConfig() {
    return new Configuration({
      apiKey: process.env.GABBER_API_KEY,
      basePath: "https://app.gabber.dev",
    });
  }

  static async getSessions(userId: string) {
    const config = this.getConfig();
    const sessionApi = SessionApiFactory(config);
    const response = await sessionApi.apiV1SessionListGet(userId);
    return response.data;
  }

  static async getSessionMessages(sessionId: string) {
    const config = this.getConfig();
    const sessionApi = SessionApiFactory(config);
    const response =
      await sessionApi.apiV1SessionSessionIdMessagesGet(sessionId);
    return response.data;
  }

  static async getSessionTimeline(sessionId: string) {
    const config = this.getConfig();
    const sessionApi = SessionApiFactory(config);
    const response =
      await sessionApi.apiV1SessionSessionIdTimelineGet(sessionId);
    return response.data;
  }

  static async getSessionDetails(sessionId: string) {
    const config = new Configuration({
      apiKey: process.env.GABBER_API_KEY,
      basePath: "https://app.gabber.dev",
    });

    const sessionApi = SessionApiFactory(config);

    const [sessionData, messages, timeline] = await Promise.all([
      sessionApi.apiV1SessionSessionIdGet(sessionId),
      sessionApi.apiV1SessionSessionIdMessagesGet(sessionId),
      sessionApi.apiV1SessionSessionIdTimelineGet(sessionId),
    ]);

    const stats = this.calculateSessionStats(timeline.data.values);

    return {
      session: sessionData.data,
      messages: messages.data.values,
      timeline: timeline.data.values,
      stats,
      duration: this.calculateTotalDuration(timeline.data.values),
    };
  }

  private static calculateSessionStats(
    timeline: Array<SessionTimelineItem> = [],
  ) {
    const totalDuration = timeline.reduce(
      (acc, item) => acc + (item.seconds ?? 0),
      0,
    );

    const userTime = timeline
      .filter((item) => item.type === "user")
      .reduce((acc, item) => acc + (item.seconds ?? 0), 0);

    const silenceTime = timeline
      .filter((item) => item.type === "silence")
      .reduce((acc, item) => acc + (item.seconds ?? 0), 0);

    const agentTime = timeline
      .filter((item) => item.type === "agent")
      .reduce((acc, item) => acc + (item.seconds ?? 0), 0);

    return {
      totalDuration,
      userTime,
      silenceTime,
      agentTime,
      userPercentage: (userTime / totalDuration) * 100,
      silencePercentage: (silenceTime / totalDuration) * 100,
      agentPercentage: (agentTime / totalDuration) * 100,
    };
  }

  private static calculateTotalDuration(
    timeline: Array<SessionTimelineItem> = [],
  ) {
    return timeline.reduce((acc, item) => acc + (item.seconds ?? 0), 0);
  }
}
