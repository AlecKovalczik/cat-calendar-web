'use client';

import Link from "next/link";
import AddModal from "./add-modal";

export function AddButton() {
    return (
        <Link 
            href="/home/tasks/add"
            className="h-[35px] w-[90px] bg-white text-black text-center content-center border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-violet-1000"
        >
            <b>Add</b>
        </Link>
            
    )
}