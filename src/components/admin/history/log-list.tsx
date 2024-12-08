"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Define the structure of a log entry
interface LogEntry {
  id: string;
  operation: "create" | "update" | "delete";
  tableName: string;
  timestamp: string;
  details: string;
}

// Sample data (replace this with your actual data fetching logic)
const sampleLogs: LogEntry[] = [
  {
    id: "1",
    operation: "create",
    tableName: "Users",
    timestamp: "2023-06-01T10:00:00Z",
    details: "Created user John Doe",
  },
  {
    id: "2",
    operation: "update",
    tableName: "Products",
    timestamp: "2023-06-02T11:30:00Z",
    details: "Updated product price",
  },
  {
    id: "3",
    operation: "delete",
    tableName: "Orders",
    timestamp: "2023-06-03T09:15:00Z",
    details: "Deleted order #12345",
  },
  {
    id: "4",
    operation: "create",
    tableName: "Users",
    timestamp: "2023-06-01T10:00:00Z",
    details: "Created user John Doe",
  },
  {
    id: "5",
    operation: "update",
    tableName: "Products",
    timestamp: "2023-06-02T11:30:00Z",
    details: "Updated product price",
  },
  {
    id: "6",
    operation: "delete",
    tableName: "Orders",
    timestamp: "2023-06-03T09:15:00Z",
    details: "Deleted order #12345",
  },
];

export default function HistoryLogList() {
  const [filter, setFilter] = useState<"all" | "create" | "update" | "delete">(
    "all"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 5;

  // Filter logs based on the selected operation type
  const filteredLogs = sampleLogs.filter(
    (log) => filter === "all" || log.operation === filter
  );

  // Calculate pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  const getOperationIcon = (operation: string) => {
    switch (operation) {
      case "create":
        return <Plus className='w-4 h-4 text-green-500' />;
      case "update":
        return <Pencil className='w-4 h-4 text-blue-500' />;
      case "delete":
        return <Trash2 className='w-4 h-4 text-red-500' />;
      default:
        return null;
    }
  };

  const getOperationColor = (operation: string) => {
    switch (operation) {
      case "create":
        return "bg-green-100 text-green-800";
      case "update":
        return "bg-blue-100 text-blue-800";
      case "delete":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className='container mx-auto max-w-2xl'>
      <h1 className='text-2xl font-bold mb-4'>History Logs</h1>
      <div className='mb-4 flex space-x-2'>
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "create" ? "default" : "outline"}
          onClick={() => setFilter("create")}
        >
          Create
        </Button>
        <Button
          variant={filter === "update" ? "default" : "outline"}
          onClick={() => setFilter("update")}
        >
          Update
        </Button>
        <Button
          variant={filter === "delete" ? "default" : "outline"}
          onClick={() => setFilter("delete")}
        >
          Delete
        </Button>
      </div>
      <div className='space-y-4'>
        {currentLogs.map((log) => (
          <Card key={log.id}>
            <CardContent className='flex items-center p-4'>
              <div className='mr-4'>{getOperationIcon(log.operation)}</div>
              <div className='flex-grow'>
                <div className='flex justify-between items-center mb-2'>
                  <Badge className={getOperationColor(log.operation)}>
                    {log.operation.charAt(0).toUpperCase() +
                      log.operation.slice(1)}
                  </Badge>
                  <span className='text-sm text-gray-500'>
                    {format(new Date(log.timestamp), "MMM d, yyyy HH:mm")}
                  </span>
                </div>
                <p className='text-sm font-medium'>{log.tableName}</p>
                <p className='text-sm text-gray-600'>{log.details}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className='mt-4 flex justify-between items-center'>
        <Button
          variant='outline'
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className='w-4 h-4 mr-2' /> Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant='outline'
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next <ChevronRight className='w-4 h-4 ml-2' />
        </Button>
      </div>
    </div>
  );
}
