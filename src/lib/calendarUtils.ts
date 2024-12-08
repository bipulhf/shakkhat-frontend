import { isWithinInterval, startOfDay, endOfDay } from "date-fns";

export interface Task {
  id: number;
  title: string;
  start: Date;
  end: Date;
  free: boolean;
}

export const getTaskPositionAndHeight = (task: Task, day: Date) => {
  const dayStart = startOfDay(day);
  const dayEnd = endOfDay(day);

  const taskStart = task.start < dayStart ? dayStart : task.start;
  const taskEnd = task.end > dayEnd ? dayEnd : task.end;

  const totalMinutes = 24 * 60;
  const startMinutes = taskStart.getHours() * 60 + taskStart.getMinutes();
  const durationMinutes =
    (taskEnd.getTime() - taskStart.getTime()) / (1000 * 60);

  const top = (startMinutes / totalMinutes) * 100;
  const height = (durationMinutes / totalMinutes) * 100;

  return { top, height };
};

export const isTaskInDay = (task: Task, day: Date) => {
  const dayStart = startOfDay(day);
  const dayEnd = endOfDay(day);
  return (
    isWithinInterval(dayStart, { start: task.start, end: task.end }) ||
    isWithinInterval(dayEnd, { start: task.start, end: task.end }) ||
    isWithinInterval(task.start, { start: dayStart, end: dayEnd })
  );
};
