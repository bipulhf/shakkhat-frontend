"use client";

import { AddFreeTimeSlot } from "@/components/slot/add-free-time-slot";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Slot } from "@/components/slot/slot";
import { AnimatePresence, motion } from "motion/react";

const initialSlots = [
  {
    id: "1",
    startTime: "10:00",
    endTime: "11:00",
    startDate: "2023-05-15",
    endDate: "2023-05-15",
  },
  {
    id: "2",
    startTime: "14:00",
    endTime: "15:00",
    startDate: "2023-05-15",
    endDate: "2023-05-15",
  },
  {
    id: "3",
    startTime: "09:00",
    endTime: "10:00",
    startDate: "2023-05-16",
    endDate: "2023-05-16",
  },
  {
    id: "4",
    startTime: "13:00",
    endTime: "14:00",
    startDate: "2023-05-16",
    endDate: "2023-05-16",
  },
  {
    id: "5",
    startTime: "11:00",
    endTime: "12:00",
    startDate: "2023-05-17",
    endDate: "2023-05-17",
  },
];

export default function SlotPage() {
  return (
    <div className='flex flex-col gap-5 w-[1600px]'>
      <div className=''>
        <AddFreeTimeSlot>
          <Button size='sm' className='font-bold'>
            <Plus className='h-4 w-4' /> Add Free Time Slot
          </Button>
        </AddFreeTimeSlot>
      </div>
      <motion.div layout>
        <AnimatePresence>
          {initialSlots.map((slot) => (
            <motion.div
              key={slot.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              <Slot
                id={slot.id}
                startTime={slot.startTime}
                endTime={slot.endTime}
                startDate={slot.startDate}
                endDate={slot.endDate}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
