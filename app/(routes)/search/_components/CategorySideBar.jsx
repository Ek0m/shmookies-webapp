"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GlobalApi from "@/app/_services/GlobalApi";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategorySideBar() {
  const [categoryList, setCategoryList] = useState([]);
  const [selecetedCategory, setSelectedCategory] = useState();
  const params = usePathname();
  const category = params.split("/")[2];

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    params && setSelectedCategory(params.split("/")[2]);
  }, [params]);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      setCategoryList(resp.categories);
    });
  };

  return (
    <div>
      <h2 className="font-bold mb-3 text-lg text-primary">Categories</h2>
      <div>
        {categoryList.map((category, index) => (
          <Link
            href={"/search/" + category.name}
            className={`flex gap-2 p-3 items-center border-2 border-gray-300 rounded-lg mb-3 md:mr-10 cursor-pointer hover:bg-orange-100 hover:text-primary hover:border-primary hover:shadow-primary shadow-sm ${
              selecetedCategory == category.name &&
              "border-primary text-primary shadow-md"
            }`}
            key={index}
          >
            <Image src={category.image.url} alt="icon" width={40} height={40} />
            <h2>{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
