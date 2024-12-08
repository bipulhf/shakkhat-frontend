import { getAllMeetings } from "@/actions/meeting.action";
import { getAllUsers } from "@/actions/users.action";
import AdminDashboard from "@/components/admin/dashboard/admin-dashboard";

const AdminPage = async () => {
  const users = await getAllUsers();
  const meetings = await getAllMeetings();
  return (
    <div className='w-[1600px] mx-auto'>
      <AdminDashboard users={users} meetings={meetings} />
    </div>
  );
};

export default AdminPage;
