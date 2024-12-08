"use client";

import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

export function RequestSchedule({
  children,
  users,
}: {
  children: React.ReactNode;
  users: User[];
}) {
  const [open, setOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [slotNo, setSlotNo] = useState(0);
  const [date, setDate] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
    setOpen(false);
  };

  useEffect(() => {
    setFilteredUsers(users.filter((user) => user.email.includes(email)));
  }, [email]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className='w-80'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              name='description'
              placeholder='Enter description'
              required
              autoFocus
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Host Email</Label>
            <Input
              id='email'
              name='email'
              placeholder='Enter host email'
              type='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='filtered-users'>Select User</Label>
            <Input
              id='filtered-users'
              name='filtered_users'
              placeholder='Search users by email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {filteredUsers.length > 0 && (
              <div className='border rounded-md max-h-40 overflow-y-auto'>
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className='p-2 cursor-pointer hover:bg-gray-200'
                    onClick={() => setEmail(user.email)}
                  >
                    {user.email}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='slot-no'>Slot No</Label>
              <Input
                id='slot-no'
                name='slot_no'
                type='number'
                required
                value={slotNo}
                onChange={(e) => setSlotNo(parseInt(e.target.value))}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='date'>Date</Label>
              <Input
                id='date'
                type='date'
                name='date'
                required
                min={format(new Date(), "yyyy-MM-dd")}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <Button type='submit' className='w-full'>
            Request schedule
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
