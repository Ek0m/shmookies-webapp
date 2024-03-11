"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingHistoryList from "./_component/BookingHistoryList";
import GlobalApi from "@/app/_services/GlobalApi";
import { useSession } from "next-auth/react";

export default function MyBooking() {
  const { data } = useSession();
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    data && GetUserBookingHistory();
  }, [data]);

  const GetUserBookingHistory = () => {
    GlobalApi.GetUserBookingHistory(data.user.email).then((resp) => {
      console.log(resp);
      setBookingHistory(resp.bookings);
    });
  };

  const filterData = (type) => {
    const result = bookingHistory.filter((item) =>
      type == "booked"
        ? new Date(item.date) >= new Date()
        : new Date(item.date) <= new Date()
    );

    return result;
  };

  return (
    <div className="my-10 mx-5 md:mx-36">
      <h2 className="font-bold text-[30px] my-2">My Reservations</h2>
      <Tabs defaultValue="account" className="w-full justify-start">
        <TabsList className="w-full">
          <TabsTrigger value="reserved">Reservations</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="reserved">
          <BookingHistoryList bookingHistory={filterData("booked")} />
        </TabsContent>
        <TabsContent value="completed">
          <BookingHistoryList bookingHistory={filterData("completed")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
