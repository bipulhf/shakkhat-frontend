import { SearchBar } from "@/components/search/search-bar";
import { SearchScheduleView } from "@/components/search/search-schedule-view";

export default function AnalyticsPage() {
  return (
    <div className='w-[1600px] flex flex-col gap-5'>
      <div>
        <SearchBar />
      </div>
      <div>
        <SearchScheduleView />
      </div>
    </div>
  );
}
