import TaskItem from "./task";
import { fetchTasks } from "@/app/lib/data";

export default async function TaskList() {
    const tasks = await fetchTasks();

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