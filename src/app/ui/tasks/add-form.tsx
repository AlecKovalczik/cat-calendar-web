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
                    <input id="title" name="title" type="text" placeholder="Enter a title" className="bg-gray-200 border border-black rounded-md w-full" />
                </div>

                {/* Task Description */}
                <div>
                    <label htmlFor="description" className="block">Description:</label>
                    <input id="description" name="description" placeholder="(optional) Enter a description" type="text" className="bg-gray-200 border border-black rounded-md w-full" />
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
                                    id="incomplete"
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
                                    id="completed"
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
                    <button onClick={close} type="button" className="h-[35px] w-[90px] bg-white text-black border border-black rounded-md">Cancel</button>
                    <div className="grow"></div>
                    <button type="submit" className="h-[35px] w-[90px] bg-violet-500 text-white border border-black rounded-md">Submit</button>
                </div>
            </form>
        </>
    );
}