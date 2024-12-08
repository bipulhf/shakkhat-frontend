import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { RequestSchedule } from "@/components/dashboard/request-schedule";
import Calendar from "@/components/dashboard/calendar";
import { getAllUsers } from "@/actions/users.action";

export default async function DashboardPage() {
  const users = await getAllUsers();

  return (
    <div className='flex flex-col gap-5 w-[1600px]'>
      <div className='flex justify-end'>
        <RequestSchedule users={users}>
          <Button size='sm' className='font-bold'>
            <Plus className='h-4 w-4' /> Request Schedule
          </Button>
        </RequestSchedule>
        {/* <div>
          <SearchMeeting />
        </div> */}
      </div>
      <div className=''>
        {/* <ScheduleView /> */}
        <Calendar />
      </div>
    </div>
  );
}
