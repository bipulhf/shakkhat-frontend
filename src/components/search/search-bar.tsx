"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SearchBarProps {
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export function SearchBar({ className, ...props }: SearchBarProps) {
  return (
    <form className={cn("space-y-4", className)} {...props}>
      <div className='flex flex-col gap-4'>
        <div
          className={cn(
            "flex items-center space-x-2 transition-all duration-300"
          )}
        >
          <div className='relative flex-grow'>
            <Input
              type='search'
              name='search'
              placeholder='Search Name...'
              className={cn(
                "w-full pl-10 pr-4 py-2 rounded-full transition-all duration-300"
              )}
            />
            <Search
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              size={18}
            />
          </div>
        </div>

        <div className='flex flex-wrap gap-4'>
          <div className='flex-1 min-w-[200px]'>
            <Label htmlFor='start-date'>Start Date</Label>
            <Input
              id='start-date'
              type='date'
              name='start-date'
              required
              min={format(new Date(), "yyyy-MM-dd")}
            />
          </div>

          <div className='flex-1 min-w-[200px]'>
            <Label htmlFor='end-date'>End Date</Label>
            <Input
              id='end-date'
              type='date'
              name='end-date'
              required
              min={format(new Date(), "yyyy-MM-dd")}
            />
          </div>

          <div className='flex-1 min-w-[200px]'>
            <Label htmlFor='start-time'>Start Time</Label>
            <Input
              type='time'
              id='start-time'
              name='start-time'
              className='w-full'
              min={format(new Date(), "yyyy-MM-dd")}
            />
          </div>

          <div className='flex-1 min-w-[200px]'>
            <Label htmlFor='end-time'>End Time</Label>
            <Input
              type='time'
              id='end-time'
              name='end-time'
              className='w-full'
              min={format(new Date(), "yyyy-MM-dd")}
            />
          </div>
        </div>
      </div>

      <Button type='submit' className='w-full md:w-auto'>
        Search
      </Button>
    </form>
  );
}
