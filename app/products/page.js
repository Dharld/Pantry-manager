import React from "react";
import ProductList from "@/components/ProductList";

export default function Products() {
  return (
    <div className="h-screen container">
      <div className="px-6 w-full h-screen bg-background-primary text-primary">
        <ProductList />
      </div>
    </div>
  );
}
