import TaskList from "@/app/ui/tasks/task-list"
import AddModal from "@/app/ui/tasks/add-modal"
import Search from "@/app/ui/search"

export default function TasksPage(props: {
    searchParams?: Promise<{
        query?: string;
    }>;
}) {
    return (
        <div className="w-fill">
            <div className="sticky top-0 w-fill pt-4 pb-2 px-12 mb-2 bg-gray-100 border border-b-black border-dashed z-10"> {/*sticky top-0 pt-4 pb-2 px-12 mb-2 backdrop-blur border border-b-black border-dashed */}
                <div className="w-fill flex grow flex-row items-center px-4 py-4 mb-2 text-white bg-violet-600 border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-stone-400 z-50">
                    <h1 className="text-3xl uppercase"><b>Tasks</b></h1>
                    <div className="hidden w-auto h-full grow rounded-md md:block"></div>
                    <AddModal />
                </div>
                <div className="flex grow flex-row space-x-2">
                    <div className="grow">
                        <Search placeholder="Search Tasks"></Search>
                    </div>
                    {/* <button className="border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-stone-400"><b>Replace this with view options</b></button>  */}
                </div>
            </div>
            <div className="px-12">
                <TaskList searchParams={props.searchParams} />
            </div>
        </div>
    )
}