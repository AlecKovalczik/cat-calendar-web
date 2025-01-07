'use client';

import { createTask, State } from "@/app/lib/actions"
import { useActionState } from "react";

export default function AddForm({ submit }: { submit: () => void}) {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(createTask, initialState);

    return (
        <form action={formAction} onSubmit={submit} className="flex grow flex-col text-black text-left gap-4">
            {/* Form Header */}
            <h3 className="text-2xl text-center content-center py-2 font-bold bg-violet-500 text-white w-full border border-black rounded-md">Add Task</h3>

            {/* Task Title */}
            <div>
                <label htmlFor="title block">Title:</label>
                <input name="title" type="text" className="bg-gray-200 border border-black rounded-md w-full"/>
            </div>

            {/* Task Description */}
            <div>
                <label htmlFor="description block">Description:</label>
                <input name="description" type="text" className="bg-gray-200 border border-black rounded-md w-full"/>
            </div>

            {/* Task Status */}
            <fieldset
                aria-describedby="status-error"
            >
                <legend className="mt-2 block text">
                    Set the task status:
                </legend>
                <div className="rounded-md border border-black bg-gray-200 px-[14px] py-3">
                    <div className="flex gap-4">
                        <div className="flex items-center">
                            <input
                                id="pending"
                                name="status"
                                type="radio"
                                value="incomplete"
                                className="h-4 w-4 cursor-pointer border border-black bg-white text-black focus:ring-2"
                            />
                            <label
                                htmlFor="incomplete"
                                className="ml-2 flex cursor-pointer items-center gap-1.5 border border-black rounded-full bg-white px-3 py-1.5 text-xs font-medium text-black"
                            >
                                Incomplete
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="paid"
                                name="status"
                                type="radio"
                                value="completed"
                                className="h-4 w-4 cursor-pointer border-black bg-white text-black focus:ring-2"
                            />
                            <label
                                htmlFor="completed"
                                className="ml-2 flex cursor-pointer items-center gap-1.5 border border-black rounded-full bg-violet-500 px-3 py-1.5 text-xs font-medium text-white"
                            >
                                Completed
                            </label>
                        </div>
                    </div>
                </div>
            </fieldset>

            {/* Submit Button */}
            <div className="flex grow flex-row">
                <button onClick={submit} type="button" className="h-[35px] w-[90px] bg-white text-black border border-black rounded-md">Cancel</button>
                <div className="grow"></div>
                <button type="submit" className="h-[35px] w-[90px] bg-violet-500 text-white border border-black rounded-md">Submit</button>
            </div>
        </form>
    );
}