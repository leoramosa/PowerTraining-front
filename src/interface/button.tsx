import { ReactNode } from "react";
export interface ButtonActionsProps {
  status: "delete" | "edit" | "view";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  tooltip?: string;
  className?: string;
}

export interface ButtonAppProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "submit" | "cancel" | "checkout" | "payment" | "success";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  tooltip?: string;
  className?: string;
}

export interface ButtonPrimaryProps {
  text: string;
  onClick: () => void;
}
