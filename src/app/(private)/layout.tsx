import { getNotificationByUserId } from "@/actions/notification.action";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function DashboardPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const notifications = await getNotificationByUserId();
  return (
    <DashboardShell notifications={notifications}>
      <div className='mx-5'>{children}</div>
    </DashboardShell>
  );
}
