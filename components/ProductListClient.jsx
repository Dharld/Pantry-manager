"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { ProductActionMenu } from "./ui/more-dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProducts } from "@/lib/firebase";
import { Loader } from "./ui/loader";

export default function ProductListClient({ initialProductData }) {
  const router = useRouter();
  const [productData, setProductData] = useState(initialProductData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const refreshData = async () => {
      setIsLoading(true);
      try {
        const freshData = await getProducts();
        setProductData(freshData);
      } catch (error) {
        console.error("Failed to refresh products:", error);
        // Optionally, show an error toast here
      } finally {
        setIsLoading(false);
      }
    };

    refreshData();
  }, [router.asPath]); // This will re-run when the route changes

  if (isLoading) {
    return (
      <div className="fixed flex justify-center items-center h-screen w-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="text-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Product</h2>
        <Button asChild>
          <Link href="/products/add">Add Product</Link>
        </Button>
      </div>
      <div className="space-y-4">
        {productData.map((product) => (
          <div
            key={product.id}
            className="bg-secondary rounded-lg px-4 py-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <Image
                alt={product.name}
                width={64}
                height={64}
                className="rounded-md bg-gray-700 object-contain overflow-hidden"
                src={product.thumbnail}
              />
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <div className="flex items-baseline gap-2 text-secondary">
                  <p className="text-xs text-gray-400">
                    {product.category} • {product.size} •
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        product.quantity > 10
                          ? "bg-green-900 text-primary"
                          : "bg-status-red text-primary"
                      }`}
                    >
                      {product.quantity > 10 ? "In stock" : "Low stock"}
                    </span>
                    <span className="text-xs text-gray-400 text-primary">
                      {product.quantity} in stock
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-8 relative">
              <div className="absolute w-[1px] h-full bg-gray-700 left-0 top-0"></div>
              <div>
                <p className="text-sm text-secondary">Retail Price</p>
                <p className="font-semibold">
                  ${product.retailPrice.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-secondary">Wholesale Price</p>
                <p className="font-semibold">
                  ${product.wholeSalePrice.toFixed(2)}
                </p>
              </div>
              <ProductActionMenu productId={product.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
