"use client";

import { Slot } from "@/components/slot/slot";
import { format } from "date-fns";
import { AnimatePresence, motion } from "motion/react";

const transformSlots = (slots: Slot[]) => {
  return slots
    .filter((slot) => slot.active)
    .map((slot) => ({
      ...slot,
      startTime: format(new Date(slot.startTime), "HH:mm"),
      endTime: format(new Date(slot.endTime), "HH:mm"),
      startDate: format(new Date(slot.startDate), "yyyy-MM-dd"),
      endDate: format(new Date(slot.endDate), "yyyy-MM-dd"),
    }));
};

export default function SlotList({ slots }: { slots: Slot[] }) {
  const data = transformSlots(slots);
  return (
    <motion.div layout>
      <AnimatePresence>
        {data.length === 0 ? (
          <div>
            <h1 className='text-2xl text-gray-400 text-center'>
              No slots available. Please create one.
            </h1>
          </div>
        ) : (
          data.map((slot, index) => (
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
                index={index}
                startTime={slot.startTime}
                endTime={slot.endTime}
                startDate={slot.startDate}
                endDate={slot.endDate}
              />
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </motion.div>
  );
}
