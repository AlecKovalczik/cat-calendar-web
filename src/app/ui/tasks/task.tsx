'use client';

import { Task } from "@/app/lib/definitions"
import { useState } from "react";
import EditForm from "./edit-form";

export default function TaskItem({ task }: { task: Task }) {
    const [show, setShow] = useState(false);

    function toggleShow() {
        setShow(!show);
    }

    return (
        <div>
            <div onClick={toggleShow} className="flex grow flex-row bg-white p-2 border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-stone-400">
                <div>
                    <h1><b>Title: {task.title}</b></h1>
                    <p>Description: {task.description}</p>
                    <p>Status: {task.status}</p>
                </div>
                {/* <div className="grow"></div>
                <div className="h-full my-auto ">
                    <DeleteTaskButton taskId={task.id} />
                    I'll probably replace this with a checkbox for marking tasks complete or incomplete
                </div> */}
            </div>

            {/* Edit Modal */}
            {show && <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center ">
                <div className="p-8 border w-3/4 md:w-1/2 shadow-lg rounded-md bg-white">
                    <div className="text-center">
                        <div className="mt-2 px-7 py-3">
                            <EditForm task={task} close={toggleShow} />
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}