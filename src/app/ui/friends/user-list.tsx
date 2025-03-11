import { searchUsers } from "@/app/actions/users"
import UserItem from "./user";
import { User } from "@/app/lib/definitions"

export default async function TaskList(props: {
    searchParams?: Promise<{
        query?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    const users = await searchUsers(query);

    return (
        <div className="space-y-2 ">
            {
                users.map((user: User) => {
                    return (
                        <UserItem key={user.id} user={user} />
                    )
                })
            }
        </div>
    )
}