'use client';
import Link from "next/link";
import AddForm from "./add-form";
import { useState } from "react";

export default function AddModal() {
    const [show, setShow] = useState(false);

    function toggleShow() {
        setShow(!show);
    }

    return (
        <div>
            <button onClick={toggleShow} className="h-[35px] w-[90px] bg-white text-black border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-violet-1000"><b>Add</b></button>

            {show && <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center ">
                <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
                    <div className="text-center">
                        <div className="mt-2 px-7 py-3">
                            <AddForm submit={toggleShow} />
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}