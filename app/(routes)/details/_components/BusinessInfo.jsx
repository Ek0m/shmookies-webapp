import React from "react";
import Image from "next/image";
import { MapPin, Mail, Share, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BusinessInfo({ business }) {
  return (
    business?.name && (
      <div className=" md:flex gap-4 items-center">
        <Image
          src={business?.images[0]?.url}
          alt={business?.name}
          width={350}
          height={200}
          className="object-cover rounded-lg"
        />
        <div className="md:flex justify-between items-center w-full">
          <div className="flex flex-col mt-3 items-baseline gap-3">
            <h2 className="text-primary italic font-semibold ">
              {business?.category?.name}
            </h2>
            <h2 className="text-3xl font-bold ">{business?.name}</h2>
            <h2 className="flex items-center text-lg font-semibold gap-1">
              <MapPin className="w-5" />
              {business?.address}
            </h2>
            <h2 className="flex items-center font-semibold text-lg gap-1">
              <Mail className="w-5" />
              {business?.email}
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end gap-4">
            <Button className="flex flex-col gap-5 items-center">
              <Share />
            </Button>
            <h2 className="flex gap-2 text-xl text-primary">
              <User />
              {business.contactPerson}
            </h2>
            <h2 className="flex gap-2 text-xl items-center text-gray-400">
              <Clock />
              Availabale 8am - 12am
            </h2>
          </div>
        </div>
      </div>
    )
  );
}
