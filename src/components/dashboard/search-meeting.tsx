import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const SearchMeeting = () => {
  return (
    <form
      className={cn("flex items-center space-x-2 transition-all duration-300")}
    >
      <Input
        type='search'
        name='search'
        placeholder='Search...'
        className={cn(
          "w-full pr-4 py-2 rounded-full transition-all duration-300"
        )}
      />
    </form>
  );
};

export default SearchMeeting;
