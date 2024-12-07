export type Persona = {
  id: string;
  name: string;
  description: string;
  project: string;
  created_at: Date;
  tags: PersonaTag[];
  image_url: string | null;
  voice: string;
  human: string | null;
  gender: "male" | "female" | null;
};

export type PersonaTag = {
  name: string;
  human_name: string;
};
