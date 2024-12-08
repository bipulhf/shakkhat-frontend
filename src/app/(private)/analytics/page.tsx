import { UserAnalytics } from "@/components/analytics/user-analytics";

export default function AnalyticsPage() {
  return (
    <div>
      <UserAnalytics userId={1} />
    </div>
  );
}
