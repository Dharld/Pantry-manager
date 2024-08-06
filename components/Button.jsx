import React from "react";
import { Button } from "@/components/ui/button";

export default function MyButton({ children }) {
  return (
    <Button className="bg-accent-primary hover:bg-accent-secondary transition-colors outline-none">
      {children}
    </Button>
  );
}
