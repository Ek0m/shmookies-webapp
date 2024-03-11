import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { NotebookPen, MapPin, User } from "lucide-react";
import GlobalApi from "@/app/_services/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import BookingSection from "./BookingSection";

export default function SuggestedBusiness({ business }) {
  const [filteredBusiness, setFilteredBusiness] = useState([]);

  useEffect(() => {
    business && getBusinessListByCategory();
  }, []);

  const getBusinessListByCategory = () => {
    GlobalApi.getFilteredBusinessByCategory(business?.category?.name).then(
      (resp) => {
        setFilteredBusiness(resp?.businessLists);
      }
    );
  };

  return (
    <div className="md:pl-10">
      <BookingSection business={business}>
      <Button className="flex gap-2 md:w-full mb-4">
        <NotebookPen />
        Book Reservation
      </Button>
      </BookingSection>
      <div className="hidden md:block">
        <h2 className="font-bold text-lg mb-3 mt-3 ">Similar Restaurants</h2>
        <div className="">
          {filteredBusiness &&
            filteredBusiness.map((restaurant, index) => (
              <Link
                href={"/details/" + restaurant?.id}
                className="flex items-center gap-3 mb-3 hover:border-primary rounded-lg p-2 cursor-pointer shadow-md hover:shadow-primary"
                key={index}
              >
                <Image
                  src={restaurant?.images[0].url}
                  width={100}
                  alt="Image"
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h2 className="font-bold">{restaurant?.name}</h2>
                  <h2 className="flex text-primary">
                    {" "}
                    <User restaurant="w-4" />
                    {restaurant?.contactPerson}
                  </h2>
                  <h2 className="flex text-gray-400 ">
                    <MapPin className="w-4" />
                    {restaurant?.address}
                  </h2>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
