"use client";

import { approvingMeeting } from "@/actions/meeting.action";
import toast from "react-hot-toast";

const SlotMeetings = ({
  slotMeetings,
}: {
  slotMeetings: AnotherSlotMeeting[] | undefined;
}) => {
  if (!slotMeetings || slotMeetings.length === 0) {
    return (
      <div className='flex justify-center items-center h-full text-gray-600'>
        <p>No slot meetings found.</p>
      </div>
    );
  }

  return (
    <div className='grid gap-4'>
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        slotMeetings.map((meeting: any) => (
          <div
            key={meeting.id}
            className='p-4 border rounded-lg shadow-md bg-white'
          >
            <h3 className='font-bold text-lg'>{meeting.slot.title}</h3>
            <p>{meeting.description}</p>
            <p>
              <strong>Time:</strong>{" "}
              {meeting.slot.startTime
                ? new Date(meeting.slot.startTime).toLocaleString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : "N/A"}{" "}
              -{" "}
              {meeting.slot.endTime
                ? new Date(meeting.slot.endTime).toLocaleString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : "N/A"}
            </p>
            <p>
              <strong>Host:</strong> {meeting.host.name} (
              {meeting.host.profession})
            </p>
            <div className='mt-2 flex gap-2'>
              <button
                className='px-4 py-2 bg-green-500 text-white rounded-md'
                onClick={async () => {
                  toast.loading("Approving meeting...");
                  const resp = await approvingMeeting(meeting.id);
                  if (resp) {
                    toast.dismiss();
                    toast.success("Meeting approved successfully");
                  } else {
                    toast.dismiss();
                    toast.error("Failed to approve meeting");
                  }
                  window.location.reload();
                }}
              >
                Approve
              </button>
              <button className='px-4 py-2 bg-red-500 text-white rounded-md'>
                Reject
              </button>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default SlotMeetings;
