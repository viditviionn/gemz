export interface ICustodian {
  id: string;
  name: string;
}
export type TTabType =
  | "Overview"
  | "Family"
  | "Vaultz"
  | "Analysis"
  | "Planning"
  | "Assets";

export type TInsights =
  | "positions"
  | "performers"
  | "holdings"
  | "transactions";
