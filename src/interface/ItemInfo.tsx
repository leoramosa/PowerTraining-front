import { ReactNode } from "react";

export interface ItemInfoProps {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
}
