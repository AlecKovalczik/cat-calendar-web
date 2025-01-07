import TaskList from "@/app/ui/tasks/task-list"
import { AddButton } from "@/app/ui/tasks/buttons"
import AddModal from "@/app/ui/tasks/add-modal"


export default function TasksPage() {
    return (
        <div>
            <div className="flex grow flex-row items-center px-4 py-4 mb-2 text-white bg-violet-600 border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-stone-400">
                <h1 className="text-3xl uppercase"><b>Tasks</b></h1>
                <div className="hidden w-auto h-full grow rounded-md md:block"></div>
                <AddModal />
            </div>
            <TaskList />
        </div>
    )
}