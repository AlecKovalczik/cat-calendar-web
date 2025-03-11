import { fetchSearchedTasks } from "@/app/lib/data";
import UserItem from "./user";

export default async function TaskList(props: {
    searchParams?: Promise<{
        query?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    const users = await fetchSearchedTasks(query);

    return (
        <div className="space-y-2 ">
            {
                users.map((user) => {
                    return (
                        <UserItem key={user.id} user={user} />
                    )
                })
            }
        </div>
    )
}