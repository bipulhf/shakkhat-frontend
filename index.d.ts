type User = {
  id: number;
  name: string;
  email: string;
  profession: string;
  createdAt: string;
  slots: Slot[];
};

type Meeting = {
  id: number;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  slotId: number;
  hostId: number;
  createdAt: string;
  status: number; // 0 for cancelled, 1 for pending, 2 for completed
  host: User;
  meetingClients: {
    id: number;
    guestId: number;
    meetingId: number;
  }[];
};

type Slot = {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  active: boolean;
  user: User;
  userId: number;
};

type SlotMeeting = {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  active: boolean;
  userId: number;
  meetings: Meeting[];
};

type NotificationType = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
};
type AnotherSlotMeeting = {
  id: number;
  description: string;
  date: string | null;
  start_time: string | null;
  end_time: string | null;
  slotId: number;
  hostId: number;
  status: number; // e.g., 1 for pending, 2 for approved, etc.
  createdAt: string;
  slot: {
    id: number;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    startDate: string;
    endDate: string;
    userId: number;
    active: boolean;
    recurring: boolean;
  };
  host: {
    id: number;
    name: string;
    email: string;
    password: string; // hashed password
    timezone: string;
    profession: string;
    notificationId: string | null;
    role: string; // e.g., "User" or "Admin"
    createdAt: string;
  };
};
