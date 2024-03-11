import React from "react";
import Image from "next/image";
import { MapPin, Calendar, User,Clock } from "lucide-react";

export default function BookingHistoryList({ bookingHistory }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {bookingHistory.map((booking, index) => (
        <div key={index} className="flex gap-4 border rounded-lg p-4 mb-5">
          {booking?.businessList?.name && (
            <Image
              src={booking?.businessList?.images[0]?.url}
              alt="image"
              width={150}
              height={150}
              className="rounded-lg object-cover"
            />
          )}
            <div className="flex flex-col gap-2">
              <h2 className="fomt-bold">{booking.businessList.name}</h2>
              <h2 className="flex gap-2 text-primary"><User />{booking.businessList.contactPerson}</h2>
              <h2 className="flex gap-2 text-gray-400"><MapPin />{booking.businessList.address}</h2>
              <h2 className="flex gap-2 text-green-700"><Calendar /> Reservation Date: {booking.date}</h2>
              <h2 className="flex gap-2 text-purple-600"><Clock /> Reservation Time: {booking.time}</h2>
            </div>
          
        </div>
      ))}
    </div>
  );
}
