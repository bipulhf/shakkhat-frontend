import { getAllMeetings } from "@/actions/meeting.action";
import { getNotificationByUserId } from "@/actions/notification.action";
import { getUserId } from "@/actions/users.action";
import { UserAnalytics } from "@/components/analytics/user-analytics";
import { DownloadButton, transformers } from "@/components/react-csv";

export default async function AnalyticsPage() {
  const meetings = (await getAllMeetings()) as Meeting[];
  const notifications = await getNotificationByUserId();
  const userId = await getUserId();
  const completedMeetings = meetings.filter((meeting) => meeting.status === 2);
  const hostedMeetings = completedMeetings.filter(
    (meeting) => meeting.hostId === parseInt(userId!)
  );
  const meetings_type = [
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
    <div className='space-y-6 w-[1600px]'>
      <div className='flex justify-between space-x-4'>
        <h1 className='text-4xl font-bold mb-6'>User Analytics</h1>
        <div className='flex gap-4'>
          {/* Download buttons for different data types */}
          <DownloadButton
            data={meetings_type}
            filename={`meeting_status_${userId}.csv`}
            label='Download Meeting Status'
            transformer={transformers.meetingStatusTransformer}
          />
          <DownloadButton
            data={meetingTrends}
            filename={`meeting_trends_${userId}.csv`}
            label='Download Meeting Trends'
            transformer={transformers.meetingTrendsTransformer}
          />
          <DownloadButton
            data={notifications.slice(0, 3)}
            filename={`recent_notifications_${userId}.csv`}
            label='Download Notifications'
            transformer={transformers.notificationsTransformer}
          />
        </div>
      </div>
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
