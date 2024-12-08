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
import { format, set } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import toast from "react-hot-toast";
import { createMeeting } from "@/actions/meeting.action";

export function RequestSchedule({
  children,
  users,
}: {
  children: React.ReactNode;
  users: User[];
}) {
  const [open, setOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [invitedUsers, setInvitedUsers] = useState<number[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [slotNo, setSlotNo] = useState(0);
  const [date, setDate] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    toast.dismiss();
    toast.loading("Requesting schedule ...");
    const resp = await createMeeting({
      date,
      slotNo,
      description,
      hostId: selectedUser!.id,
      guestIds: invitedUsers.map((id) => id),
    });
    if (resp.error) {
      toast.dismiss();
      toast.error("Failed to request schedule");
      return;
    }
    toast.dismiss();
    toast.success("Schedule requested successfully", {
      duration: 2000,
    });
    setOpen(false);
  };

  useEffect(() => {
    if (email)
      setFilteredUsers(users.filter((user) => user.email.includes(email)));
    else {
      setFilteredUsers([]);
    }
  }, [email]);

  useEffect(() => {
    if (description.length > 20 && selectedUser && slotNo && date) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [description]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className='w-80' align='end'>
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
                    onClick={() => {
                      setEmail(user.email);
                      setSelectedUser(user);
                      setFilteredUsers([]);
                    }}
                  >
                    {user.name} - {user.email}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className=''>
            <div className='space-y-2'>
              <Label htmlFor='slot-no'>Slot No</Label>
              <Select
                value={slotNo as unknown as string}
                onValueChange={(value) => setSlotNo(parseInt(value))}
              >
                <SelectTrigger className='w-[280px]'>
                  <SelectValue placeholder='Select Slot ...' />
                </SelectTrigger>
                <SelectContent>
                  {selectedUser === null || selectedUser?.slots.length === 0 ? (
                    <SelectItem value='null' disabled>
                      No slots available
                    </SelectItem>
                  ) : (
                    selectedUser.slots.map((slot) => (
                      <SelectItem
                        key={slot.id}
                        value={slot.id as unknown as string}
                      >
                        Slot {slot.id} - {slot.title} (
                        {format(new Date(slot.startTime), "p")} -{" "}
                        {format(new Date(slot.endTime), "p")})
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
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
          <div>
            <Label>Available Users</Label>
            <div className='border rounded-md max-h-40 overflow-y-auto min-h-6'>
              {users
                .filter((user) => !invitedUsers.includes(user.id))
                .map((user) => (
                  <div
                    key={user.id}
                    className='p-2 hover:cursor-pointer hover:bg-gray-100'
                    onClick={() => setInvitedUsers([...invitedUsers, user.id])}
                  >
                    {user.name} - {user.email}
                  </div>
                ))}
            </div>
          </div>
          <div>
            <Label>Selected Users</Label>
            <div className='border rounded-md max-h-40 overflow-y-auto min-h-6'>
              {users
                .filter((user) => invitedUsers.includes(user.id))
                .map((user) => (
                  <div
                    key={user.id}
                    className='p-2 hover:cursor-pointer hover:bg-gray-100'
                    onClick={() =>
                      setInvitedUsers(
                        invitedUsers.filter((id) => id !== user.id)
                      )
                    }
                  >
                    {user.name} - {user.email}
                  </div>
                ))}
            </div>
          </div>
          <Button type='submit' className='w-full' disabled={!isValid}>
            Request schedule
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
