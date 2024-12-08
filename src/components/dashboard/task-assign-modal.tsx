"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { getMeetingBySlotId } from "@/actions/meeting.action";
import SlotMeetings from "../slot/slot-meeting-list";

export default function TaskAssignModal({
  open,
  setOpen,
  taskId,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  taskId: string | number | null;
}) {
  const [data, setData] = useState<AnotherSlotMeeting[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getMeetingBySlotId(taskId as number);
        // Ensure response is an array
        setData(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error fetching slot meetings:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (open && taskId !== null) {
      fetchData();
    } else {
      setData([]);
    }
  }, [open, taskId]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Slot</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {loading ? "Loading..." : "Slot Meetings"}
        </DialogDescription>
        {loading ? (
          <div className='text-center'>Loading data...</div>
        ) : data.length === 0 ? (
          <div className='text-center text-gray-600'>
            No slot meetings found.
          </div>
        ) : (
          <SlotMeetings slotMeetings={data} />
        )}
      </DialogContent>
    </Dialog>
  );
}
