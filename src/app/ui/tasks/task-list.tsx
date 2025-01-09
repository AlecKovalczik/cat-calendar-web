import { fetchUsersTasks } from "@/app/lib/data";
import TaskItem from "./task";

export default async function TaskList() {
    const tasks = await fetchUsersTasks();

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