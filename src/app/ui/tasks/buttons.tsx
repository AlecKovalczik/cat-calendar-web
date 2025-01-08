'use client';

import { useActionState } from "react";
import { deleteTask } from "@/app/lib/actions";

export function DeleteTaskButton({taskId}: {taskId: string}) {
    const deleteTaskWithId = deleteTask.bind(null, taskId, { message: null });
    const [state, formAction] = useActionState(deleteTaskWithId, null);

    return (
        <form action={formAction}>
            <button type="submit" className="h-[35px] w-[90px] bg-red-600 text-white font-bold border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-violet-1000">Delete</button>
        </form>
    )
}