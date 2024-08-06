import React from "react";
import Image from "next/image";
import Button from "@/components/Button";

import { ProductActionMenu } from "./ui/more-dropdown-menu";
import { getProducts } from "@/lib/firebase";
import Link from "next/link";

// Mock Data
/* const productData = [
  new Product(
    1,
    "Organic Apples",
    "/images/apple.jpg",
    "1kg",
    50,
    3.99,
    2.5,
    "Fruits",
    true
  ),
  new Product(
    2,
    "Whole Milk",
    "/images/milk.jpg",
    "1L",
    30,
    2.49,
    1.8,
    "Dairy",
    true
  ),
  new Product(
    3,
    "Whole Wheat Bread",
    "/images/bread.jpg",
    "700g",
    5,
    2.99,
    2.2,
    "Bakery",
    true
  ),
  new Product(
    4,
    "Chicken Breast",
    "/images/chicken.jpg",
    "500g",
    20,
    5.99,
    4.5,
    "Meat",
    true
  ),
  new Product(
    5,
    "Penne Pasta",
    "/images/pasta.jpg",
    "500g",
    40,
    1.99,
    1.4,
    "Grains",
    false
  ),
];
 */

export default async function ProductList() {
  const productData = await getProducts();

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
            className="bg-secondary rounded-lg px-4 py-2 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <Image
                alt={product.name}
                width={48}
                height={48}
                className="rounded-md bg-gray-700"
              />
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <div className="flex items-baseline gap-2 text-secondary">
                  <p className="text-xs text-gray-400">
                    {product.category.name} • {product.size} •
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
