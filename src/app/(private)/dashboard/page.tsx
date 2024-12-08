import { ScheduleView } from "@/components/dashboard/schedule-view";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddSchedule } from "@/components/dashboard/add-schedule";
import SearchMeeting from "@/components/dashboard/search-meeting";

export default function DashboardPage() {
  return (
    <div className='flex flex-col gap-5 w-[1600px]'>
      <div className='flex justify-between'>
        <AddSchedule>
          <Button size='sm' className='font-bold'>
            <Plus className='h-4 w-4' /> Add a meeting
          </Button>
        </AddSchedule>
        <div>
          <SearchMeeting />
        </div>
      </div>
      <div className=''>
        <ScheduleView />
      </div>
    </div>
  );
}
