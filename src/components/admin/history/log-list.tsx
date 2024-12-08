"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Define the structure of a log entry
interface LogEntry {
  id: number;
  operation: "Login" | "Create" | "Update" | "Delete";
  tableName: string;
  createdAt: string;
  details: string;
}

export default function HistoryLogList({ logs }: { logs: LogEntry[] }) {
  console.log(logs);
  const [filter, setFilter] = useState<
    "all" | "Login" | "Create" | "Update" | "Delete"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 5;

  // Filter logs based on the selected operation type
  const filteredLogs = logs.filter(
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
      case "Create":
        return "bg-green-100 text-green-800";
      case "Update":
        return "bg-blue-100 text-blue-800";
      case "Delete":
        return "bg-red-100 text-red-800";
      case "Login":
        return "bg-orange-100 text-orange-800";
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
          variant={filter === "Create" ? "default" : "outline"}
          onClick={() => setFilter("Create")}
        >
          Create
        </Button>
        <Button
          variant={filter === "Update" ? "default" : "outline"}
          onClick={() => setFilter("Update")}
        >
          Update
        </Button>
        <Button
          variant={filter === "Delete" ? "default" : "outline"}
          onClick={() => setFilter("Delete")}
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
                  <Badge
                    className={`${getOperationColor(
                      log.operation
                    )} hover:${getOperationColor(log.operation)}`}
                  >
                    {log.operation.charAt(0).toUpperCase() +
                      log.operation.slice(1)}
                  </Badge>
                  <span className='text-sm text-gray-500'>
                    {format(new Date(log.createdAt), "MMM d, yyyy HH:mm")}
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
