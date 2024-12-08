"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

export function AddSchedule({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className='w-80'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              placeholder='Enter description'
              required
              autoFocus
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Host Email</Label>
            <Input
              id='email'
              placeholder='Enter host email'
              type='email'
              required
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='start-time'>Start Time</Label>
              <Input
                id='start-time'
                type='time'
                required
                min={format(new Date(), "yyyy-MM-dd")}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='end-time'>End Time</Label>
              <Input
                id='end-time'
                type='time'
                required
                min={format(new Date(), "yyyy-MM-dd")}
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='date'>Date</Label>
              <Input
                id='date'
                type='date'
                required
                min={format(new Date(), "yyyy-MM-dd")}
              />
            </div>
          </div>
          <Button type='submit' className='w-full'>
            Add meeting schedule
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
