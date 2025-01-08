'use client';

import { createTask, State } from "@/app/lib/actions"
import { useActionState, useEffect } from "react";

export default function AddForm({ close }: { close: () => void }) {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(createTask, initialState);

    // UseEffect to automatically call close after a successful update
    useEffect(() => {
        if (state.message && state.errors === undefined) {
            // Call close if the state indicates success
            close();
        }
    }, [state, close]);

    return (
        <>
            <form action={formAction} className="flex grow flex-col text-black text-left gap-4">
                {/* Form Header */}
                <h3 className="text-2xl text-center content-center py-2 font-bold bg-violet-500 text-white w-full border border-black rounded-md">Add Task</h3>

                {/* Task Title */}
                <div>
                    <label htmlFor="title" className="block">Title:</label>
                    <input id="title" name="title" type="text" placeholder="Enter a title" className="bg-gray-200 border border-black rounded-sm w-full p-1" />
                </div>

                {/* Task Description */}
                <div>
                    <label htmlFor="description" className="block">Description:</label>
                    <input id="description" name="description" placeholder="(optional) Enter a description" type="text" className="bg-gray-200 border border-black rounded-sm w-full p-1" />
                </div>

                {/* Task Status */}
                <fieldset
                    aria-describedby="status-error"
                >
                    <legend className="mt-2 block text">
                        Set the task status:
                    </legend>
                    <div className="flex items-center">
                        <label
                            htmlFor="status"
                            className="pr-2 cursor-pointer items-center bg-white font-medium text-black"
                        >
                            Complete:
                        </label>
                        <input
                            id="status"
                            name="status"
                            type="checkbox"
                            value="complete"
                            className="h-4 w-4 cursor-pointer border border-black bg-gray-200 text-black focus:ring-2"
                        />
                    </div>
                </fieldset>

                {/* Submit Button */}
                <div className="flex grow flex-row items-end justify-end gap-2">
                    {/* <button onClick={close} type="button" className="h-[35px] w-[90px] bg-white text-black border border-black rounded-md">Cancel</button> */}
                    <div className="grow"></div>
                    <button onClick={close} type="button" className="h-[35px] w-[90px] bg-white text-black border border-black rounded-md">Cancel</button>
                    <button type="submit" className="h-[35px] w-[90px] bg-violet-500 text-white border border-black rounded-md">Save</button>
                    {/* <div className="flex grow flex-row gap-2">
                    </div> */}
                </div>
            </form>
        </>
    );
}