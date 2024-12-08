import { getAllMeetings } from "@/actions/meeting.action";
import { getNotificationByUserId } from "@/actions/notification.action";
import { getUserId } from "@/actions/users.action";
import { UserAnalytics } from "@/components/analytics/user-analytics";

export default async function AnalyticsPage() {
  const meetings = (await getAllMeetings()) as Meeting[];
  const notifications = await getNotificationByUserId();
  const userId = await getUserId();
  const completedMeetings = meetings.filter((meeting) => meeting.status === 2);
  const hostedMeetings = completedMeetings.filter(
    (meeting) => meeting.hostId === parseInt(userId!)
  );
  let meetings_type = [
    {
      status: "Completed",
      count: 0,
    },
    {
      status: "Pending",
      count: 0,
    },
    {
      status: "Cancelled",
      count: 0,
    },
  ];
  hostedMeetings.map((meeting) => {
    if (meeting.status === 0) meetings_type[2].count++;
    if (meeting.status === 1) meetings_type[1].count++;
    if (meeting.status === 2) meetings_type[0].count++;
  });

  const meetingTrends = hostedMeetings.map((meeting) => {
    return {
      date: meeting.createdAt,
      count: hostedMeetings.filter((m) => m.createdAt === meeting.createdAt)
        .length,
    };
  });

  let completedMeetingsCount = 0;
  completedMeetings.map((meeting) =>
    meeting.meetingClients.map((client) => {
      if (client.guestId === parseInt(userId!)) completedMeetingsCount++;
    })
  );
  return (
    <div>
      <UserAnalytics
        userId={parseInt(userId!)}
        totalMeetingsAttended={completedMeetingsCount}
        totalMeetingsHosted={hostedMeetings.length}
        meetingStatusDistribution={meetings_type}
        meetingTrends={meetingTrends}
        notifications={notifications.splice(0, 3)}
      />
    </div>
  );
}
