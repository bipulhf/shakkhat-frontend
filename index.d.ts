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
