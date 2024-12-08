import { Input } from "../ui/input";

const SearchMeeting = () => {
  return (
    <div>
      <Input
        type='text'
        placeholder='Search meeting'
        style={{ padding: "10px", width: "100%", boxSizing: "border-box" }}
      />
    </div>
  );
};

export default SearchMeeting;
