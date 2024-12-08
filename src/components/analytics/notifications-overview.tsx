import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface NotificationsOverviewProps {
  notifications: { title: string; date: string }[];
}

export function NotificationsOverview({
  notifications,
}: NotificationsOverviewProps) {
  return (
    <div className='space-y-4'>
      {notifications.map((notification, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className='text-sm'>{notification.title}</CardTitle>
            <CardDescription>{notification.date}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
