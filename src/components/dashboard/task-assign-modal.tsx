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
import { slotPriority } from "@/actions/slot.action";
import { Loader2 } from "lucide-react";

const AILoadingMessages = [
  "Analyzing slot dynamics...",
  "Retrieving meeting insights...",
  "Synthesizing scheduling data...",
  "Optimizing meeting connections...",
  "Decoding slot priorities...",
  "Mapping collaborative landscapes...",
  "Generating meeting intelligence...",
  "Unlocking scheduling potential...",
];

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
  const [loadingMessage, setLoadingMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Dynamically change loading message
      const messageInterval = setInterval(() => {
        const randomMessage =
          AILoadingMessages[
            Math.floor(Math.random() * AILoadingMessages.length)
          ];
        setLoadingMessage(randomMessage);
      }, 2000);

      try {
        const slotPr = await slotPriority(taskId as number);
        console.log("Slot Priority", slotPr);
        const response = await getMeetingBySlotId(taskId as number);
        // Ensure response is an array
        setData(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error fetching slot meetings:", error);
        setData([]);
      } finally {
        clearInterval(messageInterval);
        setLoading(false);
        setLoadingMessage("");
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
          <DialogTitle>Slot Meetings</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {loading ? loadingMessage : "Slot Meetings"}
        </DialogDescription>
        {loading ? (
          <div className='flex flex-col items-center justify-center space-y-4 py-8'>
            <Loader2
              className='animate-spin text-primary'
              size={48}
              strokeWidth={2}
            />
            <p className='text-sm text-muted-foreground animate-pulse'>
              {loadingMessage}
            </p>
          </div>
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
