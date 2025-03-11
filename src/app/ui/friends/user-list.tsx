import { searchNonFriends } from "@/app/actions/friends"
import UserItem from "./user";
import { User } from "@/app/lib/definitions"

export default async function TaskList(props: {
    searchParams?: Promise<{
        query?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    const users = await searchNonFriends(query);

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