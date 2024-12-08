// "use client";

// import * as React from "react";
// import { Search } from "lucide-react";
// import { format } from "date-fns";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export function SearchBar({
//   setFilteredUser,
// }: {
//   setFilteredUser: React.Dispatch<React.SetStateAction<User[]>>;
// }) {
//   return (
//     <form className={cn("space-y-4")}>
//       <div className='flex flex-col gap-4'>
//         <div
//           className={cn(
//             "flex items-center space-x-2 transition-all duration-300"
//           )}
//         >
//           <div className='relative flex-grow'>
//             <Input
//               type='search'
//               name='search'
//               placeholder='Search Name...'
//               className={cn(
//                 "w-full pl-10 pr-4 py-2 rounded-full transition-all duration-300"
//               )}
//             />
//             <Search
//               className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
//               size={18}
//             />
//           </div>
//         </div>

//         <div className='flex flex-wrap gap-4'>
//           <div className='flex-1 min-w-[200px]'>
//             <Label htmlFor='start-date'>Start Date</Label>
//             <Input
//               id='start-date'
//               type='date'
//               name='start-date'
//               required
//               min={format(new Date(), "yyyy-MM-dd")}
//             />
//           </div>

//           <div className='flex-1 min-w-[200px]'>
//             <Label htmlFor='end-date'>End Date</Label>
//             <Input
//               id='end-date'
//               type='date'
//               name='end-date'
//               required
//               min={format(new Date(), "yyyy-MM-dd")}
//             />
//           </div>

//           <div className='flex-1 min-w-[200px]'>
//             <Label htmlFor='start-time'>Start Time</Label>
//             <Input
//               type='time'
//               id='start-time'
//               name='start-time'
//               className='w-full'
//               min={format(new Date(), "yyyy-MM-dd")}
//             />
//           </div>

//           <div className='flex-1 min-w-[200px]'>
//             <Label htmlFor='end-time'>End Time</Label>
//             <Input
//               type='time'
//               id='end-time'
//               name='end-time'
//               className='w-full'
//               min={format(new Date(), "yyyy-MM-dd")}
//             />
//           </div>
//         </div>
//       </div>

//       <Button type='submit' className='w-full md:w-auto'>
//         Search
//       </Button>
//     </form>
//   );
// }

import { format } from "date-fns";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { RequestScheduleDialog } from "./request-appointment";

const UserSearchComponent = ({ data }: { data: any }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [open, setOpen] = useState(false);
  const [hostId, setHostId] = useState(0);
  const [slotNo, setSlotNo] = useState(0);

  // Handle the search logic
  const handleSearch = (event: any) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = data.filter((user: any) => {
      return (
        // Search within user fields
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        // Search within slots
        user.slots.some((slot: any) => {
          const { title, description, startDate, endDate } = slot;

          return (
            title.toLowerCase().includes(value) ||
            description.toLowerCase().includes(value) ||
            (startDate &&
              format(new Date(slot.startDate), "Pp").includes(value)) || // Matches start date
            (endDate && format(new Date(slot.endDate), "Pp").includes(value)) // Matches end date
          );
        })
      );
    });

    setFilteredData(filtered);
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Search by name, email, slot title, or date (YYYY-MM-DD)...'
        value={searchTerm}
        onChange={handleSearch}
        className='border rounded p-2 mb-4 w-full'
      />
      <ul>
        {filteredData.length > 0 ? (
          <ul className='space-y-4'>
            {filteredData.map((user: any) => (
              <li key={user.id} className='bg-white rounded-lg shadow p-4'>
                {/* User Details */}
                <div className='flex items-center justify-between'>
                  <h3 className='text-xl font-bold text-gray-800'>
                    {user.name}
                  </h3>
                  <p className='text-sm text-gray-500'>{user.email}</p>
                </div>
                {/* Slot Details */}
                <div className='mt-4'>
                  <h4 className='text-lg font-semibold text-gray-700 mb-2'>
                    Slots:
                  </h4>
                  {user.slots.length === 0 ? (
                    <div className='bg-gray-50 p-4 rounded-lg border text-center'>
                      <p className='text-sm text-gray-500'>No slots found.</p>
                    </div>
                  ) : (
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
                      {user.slots.map((slot: any) => (
                        <div
                          key={slot.id}
                          className='bg-gray-100 rounded-lg p-4 shadow hover:bg-gray-200 transition flex flex-col gap-2'
                        >
                          <p className='text-sm font-medium text-gray-800'>
                            <span className='font-bold'>Title:</span>{" "}
                            {slot.title}
                          </p>
                          <p className='text-sm text-gray-600'>
                            <span className='font-bold'>Description:</span>{" "}
                            {slot.description}
                          </p>
                          <p className='text-sm text-gray-600'>
                            <span className='font-bold'>Start Date:</span>{" "}
                            {format(new Date(slot.startDate), "Pp")}
                          </p>
                          <p className='text-sm text-gray-600'>
                            <span className='font-bold'>End Date:</span>{" "}
                            {format(new Date(slot.endDate), "Pp")}
                          </p>
                          <Button
                            onClick={() => {
                              setOpen(!open);
                              setHostId(user.id);
                              setSlotNo(slot.id);
                            }}
                          >
                            Request Schedule
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-center text-gray-500'>No results found.</p>
        )}
      </ul>
      <RequestScheduleDialog
        open={open}
        setOpen={setOpen}
        users={data}
        hostId={hostId}
        slotId={slotNo}
      />
    </div>
  );
};

export default UserSearchComponent;
