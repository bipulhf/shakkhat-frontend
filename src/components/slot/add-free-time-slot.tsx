"use client";

import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format, set } from "date-fns";
import toast from "react-hot-toast";
import { createSlot } from "@/actions/slot.action";
import { useRouter } from "next/navigation";

export function AddFreeTimeSlot({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    toast.dismiss();
    toast.loading("Creating Slot ...");
    const resp = await createSlot({
      title,
      description,
      startTime,
      endTime,
      startDate,
      endDate,
    });

    if (resp.error) {
      toast.dismiss();
      toast.error("Failed to create slot");
      return;
    }
    toast.dismiss();
    toast.success("Slot added successful.", {
      duration: 2000,
    });
    setOpen(false);
    setTitle("");
    setDescription("");
    setStartTime("");
    setEndTime("");
    setStartDate("");
    setEndDate("");
    router.refresh();
  };

  useEffect(() => {
    setIsValid(
      title !== "" &&
        description !== "" &&
        startTime !== "" &&
        endTime !== "" &&
        startDate !== "" &&
        endDate !== ""
    );
  }, [title, description, startTime, endTime, startDate, endDate]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className='w-80' align='end'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              placeholder='Enter title'
              required
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              placeholder='Enter description'
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='start-time'>Start Time</Label>
              <Input
                id='start-time'
                type='time'
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='end-time'>End Time</Label>
              <Input
                id='end-time'
                type='time'
                required
                min={format(new Date(), "yyyy-MM-dd")}
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='start-date'>Start Date</Label>
              <Input
                id='start-date'
                type='date'
                required
                min={format(new Date(), "yyyy-MM-dd")}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='end-date'>End Date</Label>
              <Input
                id='end-date'
                type='date'
                required
                min={format(new Date(), "yyyy-MM-dd")}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <Button type='submit' className='w-full' disabled={!isValid}>
            Add Free Time Slot
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
