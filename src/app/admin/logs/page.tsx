import { getAllLogs } from "@/actions/logs.action";
import HistoryLogList from "@/components/admin/history/log-list";

export default async function LogsPage() {
  const logs = await getAllLogs();
  return <HistoryLogList logs={logs} />;
}
