"use client";

import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";
import moment from "moment";

export default function BookingSection({ children, business }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [bookedSlot, setBookedSlot] = useState([]);
  const { data } = useSession();

  useEffect(() => {
    getTime();
  }, []);

  useEffect(() => {
    date && BusinessBookedSlot();
  }, [date]);

  const BusinessBookedSlot = () => {
    GlobalApi.BusinessBookedSlot(
      business.id,
      moment(date).format("DD-MMM-yyyy")
    ).then((resp) => {
      console.log(resp);
      setBookedSlot(resp.bookings);
    });
  };

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }

    setTimeSlot(timeList);
  };

  const saveBooking = () => {
    GlobalApi.createNewBooking(
      business.id,
      moment(date).format("DD-MMM-yyyy"),
      selectedTime,
      data.user.email,
      data.user.name
    ).then(
      (resp) => {
        console.log(resp);
        if (resp) {
          setDate();
          setSelectedTime("");
          toast("Service Booked successfully!");
          // Toast Msg
        }
      },
      (e) => {
        toast("Error while creating booking");
        //Error Toast Msg
      }
    );
  };

  const isSlotBooked = (time) => {
    return bookedSlot.find((item) => item.time == time);
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Book a Reservation</SheetTitle>
            <SheetDescription>
              Select your date, time slot and input your reservation details to
              book a reservation
              <div className="mt-3 flex flex-col gap-5 items-baseline">
                <h2 className="font-bold text-[16px] mb-2">Select Your Date</h2>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
              <h2 className="my-5 text-[16px] font-bold">Select Time Slot</h2>
              <div className="grid grid-cols-3 gap-4">
                {timeSlot.map((item, index) => (
                  <Button
                    disabled={isSlotBooked(item.time)}
                    className={`border rounded-full 
                  p-2 px-3 hover:bg-primary
                   hover:text-white
                   ${selectedTime == item.time && "bg-primary text-white"}`}
                    onClick={() => setSelectedTime(item.time)}
                    key={index}
                    variant="outline"
                  >
                    {item.time}
                  </Button>
                ))}
              </div>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="mt-5">
            <SheetClose asChild>
              <div className="flex gap-5">
                <Button
                  disabled={!(selectedTime && date)}
                  onClick={() => saveBooking()}
                  type="submit"
                >
                  Book Reservation
                </Button>
                <Button variant="destructive" type="submit">
                  Close
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
