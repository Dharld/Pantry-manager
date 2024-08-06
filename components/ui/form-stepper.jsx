import { cn } from "@/lib/utils";
import React from "react";

/**
 * Use to put the stepper in a for
 */
export default function FormStepper({ step, steps }) {
  const stepsArray = new Array(steps).fill(0);
  for (let i = 0; i < stepsArray.length; i++) {
    stepsArray[i] = i + 1;
  }
  return (
    <div className="flex justify-between items-center mb-4 gap-2">
      {[1, 2, 3].map((stepNumber) => (
        <div key={stepNumber} className="w-full flex flex-col items-center">
          <div
            className={cn(
              "w-full h-1 rounded-full",
              step >= stepNumber ? "bg-accent-primary" : "bg-gray-300"
            )}
          />
        </div>
      ))}
    </div>
  );
}
