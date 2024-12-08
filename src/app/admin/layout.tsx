import { AdminDashboardShell } from "@/components/admin/AdminDashboardShell";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminDashboardShell>
      <div className='mx-5'>{children}</div>
    </AdminDashboardShell>
  );
}
