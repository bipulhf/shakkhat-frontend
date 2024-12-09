"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { saveAs } from "file-saver";

interface DownloadButtonProps {
  data: any[] | Record<string, any>;
  filename?: string;
  label?: string;
  variant?: "default" | "outline" | "secondary";
  transformer?: (data: any) => any[];
}

export function DownloadButton({
  data,
  filename = "export.csv",
  label = "Download",
  variant = "outline",
  transformer,
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const exportToCSV = () => {
    setIsDownloading(true);
    try {
      // Determine the data to export
      const dataToExport = transformer
        ? transformer(data)
        : Array.isArray(data)
        ? data
        : [data];

      // Prepare CSV headers and rows
      const headers =
        dataToExport.length > 0 ? Object.keys(dataToExport[0]) : [];

      const csvContent = [
        // Add headers
        headers.join(","),
        // Add data rows
        ...dataToExport.map((item) =>
          headers
            .map((header) => {
              // Escape commas and quotes in cell values
              const value = item[header];
              const escapedValue =
                value !== null && value !== undefined
                  ? `"${String(value).replace(/"/g, '""')}"`
                  : '""';
              return escapedValue;
            })
            .join(",")
        ),
      ].join("\n");

      // Create and download the file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, filename);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export data");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      onClick={exportToCSV}
      disabled={isDownloading}
      variant={variant}
      className='flex items-center gap-2'
    >
      {isDownloading ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Downloading...
        </>
      ) : (
        <>
          <Download className='h-4 w-4' />
          {label}
        </>
      )}
    </Button>
  );
}

// Example transformer functions
export const transformers = {
  // Example transformer for meeting status distribution
  meetingStatusTransformer: (data: any[]) =>
    data.map((item) => ({
      Status: item.status,
      Count: item.count,
    })),

  // Example transformer for meeting trends
  meetingTrendsTransformer: (data: any[]) =>
    data.map((item) => ({
      Date: item.date,
      MeetingCount: item.count,
    })),

  // Example transformer for notifications
  notificationsTransformer: (data: any[]) =>
    data.map((item) => ({
      Title: item.title,
      Date: item.date,
    })),
};
