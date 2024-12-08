import { getAllUsers } from "@/actions/users.action";
import SearchPage from "@/components/search/search-page";

export default async function Page() {
  const users = await getAllUsers();
  return <SearchPage users={users} />;
}
