import { ReactNode } from "react";

export interface IPagDataFilters {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
}
export interface ContainerProps {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
}
