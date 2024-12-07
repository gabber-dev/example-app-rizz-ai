"use client";

import {
  Configuration,
  Persona,
  PersonaApi,
  RealtimeApi,
  RealtimeSession,
  Scenario,
  ScenarioApi,
} from "@/generated";
import axios from "axios";
import { se } from "date-fns/locale";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import Stripe from "stripe";

type AppStateContextType = {
  usageToken: string;

  credits: number;
  creditsLoading: boolean;

  sessions: RealtimeSession[];
  sessionsLoading: boolean;

  personas: Persona[];
  personasLoading: boolean;

  scenarios: Scenario[];
  scenariosLoading: boolean;

  hasPaid: boolean;
  products: Stripe.Product[];
  showPaywall: { session: string | null } | null;

  realtimeApi: RealtimeApi;
  personaApi: PersonaApi;
  scenarioApi: ScenarioApi;

  setShowPaywall: (paywall: { session: string | null } | null) => void;
  refreshCredits: () => void;
  refreshPersonas: () => void;
  refreshScenarios: () => void;
  refreshSessions: () => void;
};

export const CreditContext = createContext<AppStateContextType | undefined>(
  undefined,
);

export function AppStateProvider({
  children,
  usageToken,
  initialSessions,
  initialPersonas,
  initialScenarios,
  initialCredits,
  initialHasPaid,
  initialProducts,
}: {
  children: React.ReactNode;
  usageToken: string;
  initialSessions: RealtimeSession[];
  initialPersonas: Persona[];
  initialScenarios: Scenario[];
  initialCredits: number;
  initialHasPaid: boolean;
  initialProducts: Stripe.Product[];
}) {
  const [credits, setCredits] = useState<number>(initialCredits);
  const [creditsLoading, setCreditsLoading] = useState<boolean>(true);

  const [showPaywall, setShowPaywall] = useState<{
    session: string | null;
  } | null>(null);

  const [sessions, setSessions] = useState<RealtimeSession[]>(initialSessions);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const sessionsLock = useRef(false);

  const [personas, setPersonas] = useState<Persona[]>(initialPersonas);
  const [personasLoading, setPersonasLoading] = useState(false);
  const personasLock = useRef(false);

  const [scenarios, setScenarios] = useState<Scenario[]>(initialScenarios);
  const [scenariosLoading, setScenariosLoading] = useState(false);
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

  return (
    <CreditContext.Provider
      value={{
        usageToken,

        sessions,
        sessionsLoading,

        personas,
        personasLoading,

        scenarios,
        scenariosLoading,

        credits,
        creditsLoading,

        hasPaid: initialHasPaid,
        products: initialProducts,
        showPaywall,

        realtimeApi,
        personaApi,
        scenarioApi,

        setShowPaywall,
        refreshCredits,
        refreshPersonas,
        refreshScenarios,
        refreshSessions,
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
