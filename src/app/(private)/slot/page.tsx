import { getSlotsByUserId } from "@/actions/slot.action";
import { AddFreeTimeSlot } from "@/components/slot/add-free-time-slot";
import SlotList from "@/components/slot/slot-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function SlotPage() {
  const slots = await getSlotsByUserId();
  return (
    <div className='flex flex-col gap-5 w-[1600px]'>
      <div className='flex justify-end'>
        <AddFreeTimeSlot>
          <Button size='sm' className='font-bold'>
            <Plus className='h-4 w-4' /> Add Free Time Slot
          </Button>
        </AddFreeTimeSlot>
      </div>
      <SlotList slots={slots} />
    </div>
  );
}
