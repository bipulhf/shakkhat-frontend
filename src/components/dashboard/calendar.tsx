"use client";

import React, { useState } from "react";
import {
  addDays,
  format,
  startOfWeek,
  eachDayOfInterval,
  setHours,
  setMinutes,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Task,
  getTaskPositionAndHeight,
  isTaskInDay,
} from "@/lib/calendarUtils";
import TaskAssignModal from "./task-assign-modal";

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Team Meeting",
    start: setMinutes(setHours(new Date(), 10), 0),
    end: setMinutes(setHours(new Date(), 11), 0),
    free: false,
  },
  {
    id: "2",
    title: "Project Deadline",
    start: setMinutes(setHours(addDays(new Date(), 1), 15), 0),
    end: setMinutes(setHours(addDays(new Date(), 1), 16), 0),
    free: false,
  },
  {
    id: "3",
    title: "Lunch with Client",
    start: setMinutes(setHours(addDays(new Date(), 2), 12), 30),
    end: setMinutes(setHours(addDays(new Date(), 2), 13), 30),
    free: false,
  },
  {
    id: "4",
    title: "Slot 1",
    start: setMinutes(setHours(addDays(new Date(), 3), 12), 30),
    end: setMinutes(setHours(addDays(new Date(), 3), 13), 30),
    free: true,
  },
];

const colors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-fuchsia-500",
  "bg-pink-500",
  "bg-rose-500",
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"day" | "week">("week");
  const [openModal, setOpenModal] = useState(false);
  const [taskId, setTaskId] = useState<string | null | number>(null);

  const weekDays = eachDayOfInterval({
    start: startOfWeek(currentDate, { weekStartsOn: 0 }),
    end: addDays(startOfWeek(currentDate, { weekStartsOn: 0 }), 6),
  });

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const navigateCalendar = (direction: "prev" | "next") => {
    setCurrentDate((prevDate) => {
      if (view === "day") {
        return direction === "prev"
          ? addDays(prevDate, -1)
          : addDays(prevDate, 1);
      } else {
        return direction === "prev"
          ? addDays(prevDate, -7)
          : addDays(prevDate, 7);
      }
    });
  };

  const renderTask = (task: Task, dayDate: Date) => {
    if (isTaskInDay(task, dayDate)) {
      const { top, height } = getTaskPositionAndHeight(task, dayDate);
      return (
        <div
          key={task.id}
          className={`absolute left-1 right-1 ${
            task.free
              ? "bg-gray-500 cursor-pointer"
              : colors[parseInt(task.id) % colors.length]
          } text-white text-xs p-1 overflow-hidden rounded-sm`}
          style={{
            top: `${top}%`,
            height: `${height}%`,
            minHeight: "20px",
          }}
          onClick={() => {
            if (task.free) {
              setOpenModal(true);
              setTaskId(task.id);
            }
          }}
        >
          <div className='font-semibold'>{task.title}</div>
          <div>
            {format(task.start, "HH:mm")} - {format(task.end, "HH:mm")}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='flex h-screen bg-white'>
      <div className='flex-1 p-4'>
        <div className='flex justify-between items-center mb-4 sticky top-0 bg-white z-10'>
          <div className='flex items-center'>
            <Button
              variant='outline'
              className='mr-2'
              onClick={() => navigateCalendar("prev")}
            >
              <ChevronLeft className='w-4 h-4' />
            </Button>
            <Button variant='outline' onClick={() => navigateCalendar("next")}>
              <ChevronRight className='w-4 h-4' />
            </Button>
            <h2 className='text-2xl font-bold ml-4'>
              {view === "day"
                ? format(currentDate, "MMMM d, yyyy")
                : `${format(weekDays[0], "MMM d")} - ${format(
                    weekDays[6],
                    "MMM d, yyyy"
                  )}`}
            </h2>
          </div>
          <Tabs
            value={view}
            onValueChange={(value) => setView(value as "day" | "week")}
          >
            <TabsList>
              <TabsTrigger value='day'>Day</TabsTrigger>
              <TabsTrigger value='week'>Week</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className='border rounded-lg overflow-hidden relative'>
          <div className='grid grid-cols-8 border-b'>
            <div className='p-2 border-r'></div>
            {view === "week" ? (
              weekDays.map((day, index) => (
                <div
                  key={index}
                  className='p-2 text-center border-r last:border-r-0'
                >
                  <div className='font-bold'>{format(day, "EEE")}</div>
                  <div>{format(day, "d")}</div>
                </div>
              ))
            ) : (
              <div className='col-span-7 p-2 text-center'>
                <div className='font-bold'>{format(currentDate, "EEEE")}</div>
                <div>{format(currentDate, "MMMM d, yyyy")}</div>
              </div>
            )}
          </div>
          <div className='grid grid-cols-8' style={{ height: "100%" }}>
            <div className='border-r'>
              {hours.map((hour) => (
                <div
                  key={hour}
                  className='h-12 border-b text-xs p-1 text-gray-500'
                >
                  {format(setHours(new Date(), hour), "h a")}
                </div>
              ))}
            </div>
            {view === "week" ? (
              weekDays.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className='relative border-r last:border-r-0'
                >
                  {hours.map((hour) => (
                    <div key={hour} className='h-12 border-b'></div>
                  ))}
                  {initialTasks.map((task) => renderTask(task, day))}
                </div>
              ))
            ) : (
              <div className='col-span-7 relative'>
                {hours.map((hour) => (
                  <div key={hour} className='h-12 border-b'></div>
                ))}
                {initialTasks.map((task) => renderTask(task, currentDate))}
              </div>
            )}
          </div>
        </div>
      </div>
      <TaskAssignModal
        open={openModal}
        setOpen={setOpenModal}
        taskId={taskId}
      />
    </div>
  );
};

export default Calendar;
