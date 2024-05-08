"use client";
import React from "react";
import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "./ProductCard";
import Loader from "./Loader";

export interface Product {
  id?: string;
  productName: string;
  price: number;
  rating: number;
  discount: number;
  availability: string;
  company: string;
  category: string;
}

const Products = () => {
  const getProducts = async () => {
    const products = (await axios.get("http://localhost:4000/products")).data;
    return products as Product[];
  };

  const { data: products, isLoading } = useQuery({
    queryKey: ["getProducts"],
    queryFn: getProducts,
  });

  console.log(products);
  return (
    <div className="flex  w-full items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4  xl:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-4 gap-8 p-3">
        {isLoading ? (
          <Loader ind={8} />
        ) : products ? (
          products.map((product, ind) => (
            <div key={ind} className="w-full">
              <ProductCard index={ind} item={product} key={ind} />
            </div>
          ))
        ) : (
          <div className="col-span-4 h-screen w-full items-center justify-center">
            No Products Found
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
