import { format } from "date-fns";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { RequestScheduleDialog } from "./request-appointment";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserSearchComponent = ({ data }: { data: any }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [open, setOpen] = useState(false);
  const [hostId, setHostId] = useState(0);
  const [slotNo, setSlotNo] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearch = (event: any) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filtered = data.filter((user: any) => {
      return (
        // Search within user fields
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              filteredData.map((user: any) => (
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
                        {
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          user.slots.map((slot: any) => (
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
                          ))
                        }
                      </div>
                    )}
                  </div>
                </li>
              ))
            }
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
