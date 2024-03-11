import React from "react";
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button";

export default function BusinessList({ businessList, title }) {
  return (
    <div className="mt-5">
      <h2 className="font-bold text-primary text-2xl">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 ">
        {businessList.length > 0 ? businessList.map((restaurant, index) => (
          <Link href={'/details/'+ restaurant.id} className="shadow-sm rounded-lg hover:shadow-lg hover:shadow-primary cursor-pointer hover:scale-105 transition-all ease-in-out" key={index}>
            <Image
              src={restaurant.images[0].url}
              alt={restaurant.name}
              width={400}
              height={200}
              className="h-[150px] md:h-[200px] object-cover rounded-lg"
            />
            <div className="flex flex-col items-baseline p-3 gap-1">
                <h2 className="italic text-gray-400 font-regular p-1">{restaurant.category.name}</h2>
                <h2 className="font-bold text-lg">{restaurant.name}</h2>
                <h2 className="text-primary text-sm">{restaurant.contactPerson}</h2>
                <h2 className="text-gray-500 text-sm">{restaurant.address}</h2>
                <Button className="rounded-lg mt-3">Book Now</Button>
            </div>
          </Link>
        )) : [1, 2, 3, 4,5,6].map((item, index) => <div key={index} className="h-[250px] w-full bg-slate-400 animate-pulse rounded-lg">

        </div>)}
      </div>
    </div>
  );
}
