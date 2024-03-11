import { DropdownMenuCheckboxes } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react';

import React from 'react'

export default function Hero() {
  return (
    <div className="flex items-center flex-col gap-3 justify-center pt-14 pb-7 ">
      <h2 className="font-bold md:tracking-wide text-center text-primary text-3xl lg:text-4xl mb-4">Discover and reserve the best<br/> Restaurants and Kitchens</h2>
      <p className="text-center tracking-wide font-bold text-[#B1ACAC] ">Explore restaurants, their menu,<br /> meal prices and book a reservation</p>
      <div className="mt-4 flex  gap-4 items-center">
       <Input placeholder="search restaurant" className="rounded-full md:w-[350px]" />
       <Button className="rounded-full h-[46px]">
          <Search className="h-4 w-4" />
       </Button>
      </div>
    </div>
  )
}
