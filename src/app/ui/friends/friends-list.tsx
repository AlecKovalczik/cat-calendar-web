import { searchFriends } from "@/app/actions/friends"
import FriendItem from "./friend";
import { User } from "@/app/lib/definitions"

export default async function TaskList(props: {
    searchParams?: Promise<{
        query?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    const friends = await searchFriends(query);

    return (
        <div className="space-y-2 ">
            {
                friends.map((friend) => {
                    return (
                        <FriendItem key={friend.friend_id} username={friend.username} />
                    )
                })
            }
        </div>
    )
}