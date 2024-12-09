"use client";

import {
  Configuration,
  Persona,
  PersonaApi,
  RealtimeApi,
  RealtimeSession,
  Scenario,
  ScenarioApi,
  SessionApi,
  LLMApi,
} from "@/generated";
import { UserInfo } from "@/lib/server/controller/user";
import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import Stripe from "stripe";
import { shuffle } from "lodash";

type AppStateContextType = {
  userInfo: UserInfo | null;
  usageToken: string;

  credits: number;
  creditsLoading: boolean;
  refreshCredits: () => void;

  sessions: RealtimeSession[];
  sessionsLoading: boolean;
  refreshSessions: () => void;

  personas: Persona[];
  personasLoading: boolean;
  selectedPersona: Persona | null;
  setSelectedPersona: (p: Persona | null) => void;
  refreshPersonas: () => void;
  shufflePersonas: () => void;

  scenarios: Scenario[];
  scenariosLoading: boolean;
  selectedScenario: Scenario | null;
  refreshScenarios: () => void;
  setSelectedScenario: (s: Scenario | null) => void;

  hasPaid: boolean;
  products: Stripe.Product[];

  showPaywall: { session: string | null } | null;
  setShowPaywall: (paywall: { session: string | null } | null) => void;

  showSignupWall: boolean;
  setShowSignupWall: (show: boolean) => void;

  realtimeApi: RealtimeApi;
  personaApi: PersonaApi;
  scenarioApi: ScenarioApi;
  sessionApi: SessionApi;
  llmApi: LLMApi;
  gender: "men" | "women" | "all";
  setGender: (g: "men" | "women" | "all") => void;

  user: UserInfo | null;
};

export const CreditContext = createContext<AppStateContextType | undefined>(
  undefined,
);

export function AppStateProvider({
  children,
  userInfo,
  usageToken,
  initialSessions,
  initialPersonas,
  initialScenarios,
  initialCredits,
  initialHasPaid,
  initialProducts,
}: {
  children: React.ReactNode;
  userInfo: UserInfo | null;
  usageToken: string;
  initialSessions: RealtimeSession[];
  initialPersonas: Persona[];
  initialScenarios: Scenario[];
  initialCredits: number;
  initialHasPaid: boolean;
  initialProducts: Stripe.Product[];
}) {
  const [gender, setGender] = useState<"men" | "women" | "all">("all");
  const [credits, setCredits] = useState<number>(initialCredits);
  const [creditsLoading, setCreditsLoading] = useState<boolean>(true);

  const [showPaywall, setShowPaywall] = useState<{
    session: string | null;
  } | null>(null);
  const [showSignupWall, setShowSignupWall] = useState<boolean>(false);

  const [sessions, setSessions] = useState<RealtimeSession[]>(initialSessions);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const sessionsLock = useRef(false);

  const [personas, setPersonas] = useState<Persona[]>(initialPersonas);
  const [personasLoading, setPersonasLoading] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const personasLock = useRef(false);

  const [scenarios, setScenarios] = useState<Scenario[]>(initialScenarios);
  const [scenariosLoading, setScenariosLoading] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(
    null,
  );
  const scenariosLock = useRef(false);

  const realtimeApi = useMemo(() => {
    return new RealtimeApi(new Configuration({ accessToken: usageToken }));
  }, [usageToken]);

  const personaApi = useMemo(() => {
    return new PersonaApi(new Configuration({ accessToken: usageToken }));
  }, [usageToken]);

  const scenarioApi = useMemo(() => {
    return new ScenarioApi(new Configuration({ accessToken: usageToken }));
  }, [usageToken]);

  const sessionApi = useMemo(() => {
    return new SessionApi(new Configuration({ accessToken: usageToken }));
  }, [usageToken]);

  const llmApi = useMemo(() => {
    return new LLMApi(new Configuration({ accessToken: usageToken }));
  }, [usageToken]);

  const refreshPersonas = useCallback(async () => {
    if (personasLock.current) return;
    personasLock.current = true;
    setPersonasLoading(true);
    try {
      const { data } = await personaApi.listPersonas();
      setPersonas(data.values || []);
    } catch (error) {
      toast.error("Failed to load personas");
    } finally {
      setPersonasLoading(false);
      personasLock.current = false;
    }
  }, [personaApi]);

  const refreshScenarios = useCallback(async () => {
    if (scenariosLock.current) return;
    scenariosLock.current = true;
    setScenariosLoading(true);
    try {
      const { data } = await scenarioApi.listScenarios();
      setScenarios(data.values || []);
    } catch (error) {
      toast.error("Failed to load scenarios");
    } finally {
      setScenariosLoading(false);
      scenariosLock.current = false;
    }
  }, [scenarioApi]);

  const refreshSessions = useCallback(async () => {
    if (sessionsLock.current) return;
    sessionsLock.current = true;
    setSessionsLoading(true);
    try {
      const { data } = await realtimeApi.listRealtimeSessions();
      setSessions(data.values || []);
    } catch (error) {
      toast.error("Failed to load sessions");
    } finally {
      setSessionsLoading(false);
      sessionsLock.current = false;
    }
  }, [realtimeApi]);

  const refreshCredits = async () => {
    const { balance } = (await axios.get("/api/credits")).data;
    setCredits(balance);
  };

  const shufflePersonas = () => {
    setPersonas(shuffle(personas));
  };

  const filteredPersonas = useMemo(() => {
    return personas.filter((p) => {
      if (gender === "all") return true;
      if (gender === "men") {
        return p.gender === "male";
      } else if (gender === "women") {
        return p.gender === "female";
      }
      return true;
    });
  }, [gender, personas]);

  return (
    <CreditContext.Provider
      value={{
        userInfo,
        usageToken,

        sessions,
        sessionsLoading,
        refreshSessions,

        personas: filteredPersonas,
        personasLoading,
        selectedPersona,
        refreshPersonas,
        shufflePersonas,
        setSelectedPersona,

        scenarios,
        scenariosLoading,
        selectedScenario,
        refreshScenarios,
        setSelectedScenario,

        credits,
        creditsLoading,
        refreshCredits,

        hasPaid: initialHasPaid,
        products: initialProducts,

        showPaywall,
        setShowPaywall,

        showSignupWall,
        setShowSignupWall,

        realtimeApi,
        personaApi,
        scenarioApi,
        sessionApi,
        llmApi,

        gender,
        setGender,

        user: userInfo,
      }}
    >
      {children}
    </CreditContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(CreditContext);
  if (context === undefined) {
    throw new Error("useCredit must be used within a CreditProvider");
  }
  return context;
}
