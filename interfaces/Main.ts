export interface ICustodian {
  id: string;
  name: string;
}
export type TGainerLoser = "gainer" | "loser";
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
