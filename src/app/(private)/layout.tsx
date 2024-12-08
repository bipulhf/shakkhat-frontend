import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function DashboardPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell>
      <div className='mx-5'>{children}</div>
    </DashboardShell>
  );
}
