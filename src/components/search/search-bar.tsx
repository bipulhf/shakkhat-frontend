"use client";

import { format } from "date-fns";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RequestScheduleDialog } from "./request-appointment";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const UserSearchComponent = ({ data }: { data: User[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [hostId, setHostId] = useState(0);
  const [slotId, setSlotId] = useState(0);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = data.filter((user) => {
      return (
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value) ||
        user.slots.some((slot) => {
          const { title, description, startDate, endDate } = slot;
          return (
            title.toLowerCase().includes(value) ||
            description.toLowerCase().includes(value) ||
            (startDate &&
              format(new Date(startDate), "Pp")
                .toLowerCase()
                .includes(value)) ||
            (endDate &&
              format(new Date(endDate), "Pp").toLowerCase().includes(value))
          );
        })
      );
    });

    setFilteredData(filtered);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle>Search Users and Slots</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              type='text'
              placeholder='Search by name, email, slot title, or date (YYYY-MM-DD)...'
              value={searchTerm}
              onChange={handleSearch}
              className='pl-10'
            />
          </div>
        </CardContent>
      </Card>

      {filteredData.length > 0 ? (
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {filteredData.map((user) => (
            <Card key={user.id} className='overflow-hidden'>
              <CardHeader className='flex flex-row items-center gap-4 pb-2'>
                <Avatar className='h-12 w-12'>
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                  <CardTitle className='text-lg'>{user.name}</CardTitle>
                  <p className='text-sm text-muted-foreground'>{user.email}</p>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className='mb-2 font-semibold'>Slots:</h4>
                {user.slots.length === 0 ? (
                  <p className='text-center text-sm text-muted-foreground'>
                    No slots found.
                  </p>
                ) : (
                  <div className='grid gap-2'>
                    {user.slots.map((slot) => (
                      <Card key={slot.id} className='bg-muted'>
                        <CardContent className='p-4'>
                          <div className='mb-2 flex items-center justify-between'>
                            <h5 className='font-semibold'>{slot.title}</h5>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size='sm'
                                    onClick={() => {
                                      setOpen(true);
                                      setHostId(user.id);
                                      setSlotId(slot.id);
                                    }}
                                  >
                                    Request
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Request this slot</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <p className='text-sm text-muted-foreground'>
                            {slot.description}
                          </p>
                          <div className='mt-2 text-xs text-muted-foreground'>
                            <p>
                              Start: {format(new Date(slot.startDate), "PPp")}
                            </p>
                            <p>End: {format(new Date(slot.endDate), "PPp")}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        searchTerm && (
          <Card>
            <CardContent className='flex items-center justify-center p-6'>
              <p className='text-center text-muted-foreground'>
                No results found.
              </p>
            </CardContent>
          </Card>
        )
      )}

      <RequestScheduleDialog
        open={open}
        setOpen={setOpen}
        users={data}
        hostId={hostId}
        slotId={slotId}
      />
    </div>
  );
};

export default UserSearchComponent;
