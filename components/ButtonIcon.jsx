import { Button } from "@/components/ui/button";

export function ButtonIcon({ children, styles }) {
  return (
    <Button size="icon" className={styles}>
      {children}
    </Button>
  );
}
