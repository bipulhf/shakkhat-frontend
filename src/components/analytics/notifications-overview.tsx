import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

export function NotificationsOverview({
  notifications,
}: {
  notifications: NotificationType[];
}) {
  return (
    <div className='space-y-4'>
      {notifications.map((notification, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className='text-sm'>{notification.title}</CardTitle>
            <CardDescription>
              <p>{notification.description}</p>
              <p>{formatDistanceToNow(new Date(notification.createdAt))} ago</p>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
