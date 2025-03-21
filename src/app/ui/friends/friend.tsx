'use client';

import { useState } from "react";

export default function FriendItem({ username }: { username: string }) {
    const [show, setShow] = useState(false);

    function toggleShow() {
        setShow(!show);
    }

    return (
        <div>
            <div onClick={toggleShow} className="flex grow flex-row bg-white p-2 border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-stone-400">
                <div>
                    <h1><b>Username: {username}</b></h1>
                </div>
                {/* {/* <div className="grow"></div> */}
            </div>

            {/* User Info */}
            {show && <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-20">
                <div className="p-8 border w-3/4 md:w-1/2 shadow-lg rounded-md bg-white">
                    <div className="text-center">
                        <div className="mt-2 px-7 py-3">
                            <h1><b>Username: {username}</b></h1>
                            <button onClick={toggleShow}>Close</button>
                            <button onClick={toggleShow}>Remove</button>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}