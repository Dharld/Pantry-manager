import React from "react";
import Image from "next/image";
import Button from "@/components/Button";

import { ProductActionMenu } from "./ui/more-dropdown-menu";
import { getProducts } from "@/lib/firebase";
import Link from "next/link";
import ProductListClient from "./ProductListClient";

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

  return <ProductListClient initialProductData={productData} />;
}
