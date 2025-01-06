import Task from "./task";
import { fetchTasks } from "@/app/lib/data";

export default async function TaskList() {
    const tasks = await fetchTasks();

    return (
        <div className="space-y-2">
            {
                tasks.map((task) => {
                    return (
                        <Task key={task.id} title={task.title} description={task.description} status={task.status} />
                    )
                })
            }
        </div>
    )
}