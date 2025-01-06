import TaskList from "@/app/ui/tasks/task-list"

export default function TasksPage() {
    return (
        <div className="bg-gray-100">
            <h1 className="text-3xl uppercase"><b>Tasks</b></h1>
            <TaskList />
        </div>
    )
}