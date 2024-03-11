import React from "react";
import Image from "next/image";
import Link from "next/link"

export default function CategoryList({ categoryList }) {
  return (
    <div className="mx-4 md:mx-22 lg:mx-52 grid grid-cols-2 md:grid-col-4 lg:grid-cols-4 gap-4">
      {categoryList.length > 0
        ? categoryList.map((category, index) => (
            <Link
            href={'/search/'+ category.name}
              key={index}
              className={`flex flex-col items-center justify-center gap-2 bg-[#F47820] p-5 rounded-lg hover:scale-105 transition-all cursor ease-in-out`}
            >
              <Image
                src={category.image.url}
                alt="icon"
                width={100}
                height={100}
              />
              <h2 className="font-semibold text-white italic">
                {category.name}
              </h2>
            </Link>
          ))
        : [1, 2, 3, 4].map((item, index) => <div key={index} className="h-[150px] w-full bg-slate-400 animate-pulse rounded-lg">

        </div>)}
    </div>
  );
}
