import React from "react";
import { Header } from "@/components/Header"; // Adjust the import path as needed

export default function NoFooterLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
