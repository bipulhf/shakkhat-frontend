// import { ScheduleView } from "@/components/dashboard/schedule-view";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { RequestSchedule } from "@/components/dashboard/request-schedule";
// import SearchMeeting from "@/components/dashboard/search-meeting";
import Calendar from "@/components/dashboard/calendar";

export default function DashboardPage() {
  return (
    <div className='flex flex-col gap-5 w-[1600px]'>
      <div className='flex justify-between'>
        <RequestSchedule>
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
