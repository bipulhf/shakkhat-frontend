"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { deleteSlot } from "@/actions/slot.action";

interface SlotData {
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
}

export function Slot({
  id,
  index,
  startTime,
  endTime,
  startDate,
  endDate,
}: {
  id: number;
  index: number;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
}) {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [updatedSlot, setUpdatedSlot] = useState<SlotData>({
    startTime,
    endTime,
    startDate,
    endDate,
  });

  const handleUpdate = () => {
    // onUpdate(id, updatedSlot);
    setIsUpdateDialogOpen(false);
  };

  const handleDelete = async () => {
    toast.dismiss();
    toast.loading("Deleting slot ...");
    const resp = await deleteSlot(id);
    if (resp.error) {
      toast.dismiss();
      toast.error("Failed to delete slot");
      return;
    }
    toast.dismiss();
    toast.success("Slot deleted successful.", {
      duration: 2000,
    });
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className='flex items-center justify-between p-4 border rounded-lg shadow-sm my-3'>
      <div>
        <h3 className='text-lg font-semibold'>Slot {index + 1}</h3>
        <p className='font-medium'>
          From :{" "}
          {format(new Date(`${startDate}T${startTime}`), "MMM d, yyyy h:mm a")}{" "}
          <br /> To :{" "}
          {format(new Date(`${endDate}T${endTime}`), "MMM d, yyyy h:mm a")}
        </p>
      </div>
      <div className='flex space-x-2'>
        <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant='outline' size='sm'>
              <Edit className='w-4 h-4 mr-2' />
              Update
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Slot</DialogTitle>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='start-date'>Start Date</Label>
                  <Input
                    id='start-date'
                    type='date'
                    value={updatedSlot.startDate}
                    onChange={(e) =>
                      setUpdatedSlot({
                        ...updatedSlot,
                        startDate: e.target.value,
                      })
                    }
                    min={format(new Date(), "yyyy-MM-dd")}
                  />
                </div>
                <div>
                  <Label htmlFor='start-time'>Start Time</Label>
                  <Input
                    id='start-time'
                    type='time'
                    value={updatedSlot.startTime}
                    onChange={(e) =>
                      setUpdatedSlot({
                        ...updatedSlot,
                        startTime: e.target.value,
                      })
                    }
                    min={format(new Date(), "yyyy-MM-dd")}
                  />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='end-date'>End Date</Label>
                  <Input
                    id='end-date'
                    type='date'
                    value={updatedSlot.endDate}
                    onChange={(e) =>
                      setUpdatedSlot({
                        ...updatedSlot,
                        endDate: e.target.value,
                      })
                    }
                    min={format(new Date(), "yyyy-MM-dd")}
                  />
                </div>
                <div>
                  <Label htmlFor='end-time'>End Time</Label>
                  <Input
                    id='end-time'
                    type='time'
                    value={updatedSlot.endTime}
                    onChange={(e) =>
                      setUpdatedSlot({
                        ...updatedSlot,
                        endTime: e.target.value,
                      })
                    }
                    min={format(new Date(), "yyyy-MM-dd")}
                  />
                </div>
              </div>
            </div>
            <Button onClick={handleUpdate}>Update Slot</Button>
          </DialogContent>
        </Dialog>
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogTrigger asChild>
            <Button variant='destructive' size='sm'>
              <Trash className='w-4 h-4 mr-2' />
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Slot</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete this slot?</p>
            <Button onClick={handleDelete} variant='destructive'>
              Delete Slot
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
