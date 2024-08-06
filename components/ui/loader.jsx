import React from "react";
import { cn } from "@/lib/utils";

export function Loader({ className, sm, ...props }) {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-4 border-t-4 border-transparent border-t-accent-primary h-8 w-8",
        className,
        sm ? "h-4 w-4" : ""
      )}
      {...props}
    />
  );
}
