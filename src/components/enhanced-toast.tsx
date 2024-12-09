"use client";
import toast from "react-hot-toast";
import { X, Bell } from "lucide-react";

interface ToastProps {
  title: string;
  body: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}

function EnhancedToast({ title, body, t }: ToastProps) {
  return (
    <div
      className={`
        flex items-start p-4 bg-white dark:bg-gray-800 
        rounded-lg shadow-lg border border-gray-200 dark:border-gray-700
        max-w-md w-full space-x-4
        transition-all duration-300 ease-in-out
        ${
          t.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
        }
      `}
    >
      {/* Notification Icon */}
      <div className='bg-red-100 dark:bg-red-900 p-2 rounded-full'>
        <Bell className='text-red-600 dark:text-red-300' size={24} />
      </div>

      {/* Content */}
      <div className='flex-grow'>
        <div className='flex justify-between items-center mb-1'>
          <strong className='text-gray-800 dark:text-gray-200 font-semibold'>
            {title}
          </strong>
          <button
            onClick={() => toast.dismiss(t.id)}
            className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors ml-5'
          >
            <X size={16} />
          </button>
        </div>
        <p className='text-gray-600 dark:text-gray-400 text-sm'>{body}</p>
      </div>
    </div>
  );
}

// Enhanced toast function
export function showEnhancedToast(title: string, body: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toast((t: any) => <EnhancedToast title={title} body={body} t={t} />, {
    duration: 10000,
    position: "bottom-right",
    // Custom enter/exit animations
    className: "transition-all duration-300 ease-in-out",
    style: {
      padding: 0,
      margin: 0,
      background: "transparent",
      boxShadow: "none",
    },
  });
}
