type User = {
  id: number;
  name: string;
  email: string;
  profession: string;
  createdAt: string;
};

type Meeting = {
  id: number;
  description: string;
  date: string;
  start_time: string;
  end_time: string;
  slotId: number;
  hostId: number;
  status: number; // 0 for cancelled, 1 for pending, 2 for completed
  host: User;
};
