import Link from "next/link";
import NavLinks from "./nav-links";
import { logout } from "@/app/actions/auth";
import { getUser } from "@/app/lib/dal";
import { redirect } from "next/navigation";

export default async function SideNav() {
    const user = await getUser();
    if (user === null) redirect('/');

    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-white border-r border-black shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-stone-400">
            <Link
                className="mb-2 flex flex-col h-20 text-right justify-end rounded-md bg-violet-600 p-4 md:h-40 border border-black"
                href="/"
            >
                <div className="w-fill text-white">
                    <h1 className="text-3xl">Cat Calendar</h1>
                </div>
                <div className="w-fill text-white">
                    <h2 className="text-lg">Hello <b>{user.username}</b></h2>
                </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks></NavLinks>
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                <button onClick={logout} className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-100 border border-gray-600 border-dashed p-3 text-sm font-medium hover:bg-red-200 hover:text-red-600 hover:border-red-600 hover:border-solid md:flex-none md:justify-start md:p-2 md:px-3">Sign out</button>
            </div>
        </div>
    )
}