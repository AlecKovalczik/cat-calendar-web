import { fetchSearchedTasks } from "@/app/lib/data";
import TaskItem from "./task";

export default async function TaskList(props: {
    searchParams?: Promise<{
        query?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    const tasks = await fetchSearchedTasks(query);

    return (
        <div className="space-y-2 ">
            {
                tasks.map((task) => {
                    return (
                        <TaskItem key={task.id} task={task} />
                    )
                })
            }
        </div>
    )
}