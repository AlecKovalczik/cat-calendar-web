'use client';

import { useActionState, useState } from "react";
import { deleteTask } from "@/app/actions/tasks";
import Image  from "next/image";

export function TaskStatusCheckbox({size}: {size: number}) {
    const [status, setStatus] = useState("incomplete");

    function toggleStatus(){
        if (status === "incomplete") {
            setStatus("complete");
        } else if (status === "complete") {
            setStatus("incomplete");
        }
    }

    return (
        <Image 
            onClick={toggleStatus} 
            src={status === "complete" ? "/checkbox-checked-2.svg" : "/checkbox-unchecked.svg"} 
            alt="checkbox" 
            width={size} 
            height={size}
        ></Image>
    )
}

export function DeleteTaskButton({taskId}: {taskId: string}) {
    const deleteTaskWithId = deleteTask.bind(null, { message: null }, taskId);
    const [, formAction] = useActionState(deleteTaskWithId, null);

    return (
        <button formAction={formAction} type="submit" className="h-[35px] w-[90px] bg-red-600 text-white font-bold border border-black rounded-md">Delete</button>
    )
}