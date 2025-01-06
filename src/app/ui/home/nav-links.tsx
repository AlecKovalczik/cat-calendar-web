'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
    { name: "Cat", href: "/home" },
    { name: "Tasks", href: "/home/tasks" },
    { name: "Friends", href: "/home/friends" },
]

export default function NavLinks() {
    const pathname = usePathname()

    return (
        <>
            {links.map((link) => {
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            "flex h-[48px] grow items-center justify-center gap-2 rounded-md border p-3 text-sm font-medium hover:bg-violet-200 hover:text-violet-600 hover:border-violet-600 md:flex-none md:justify-start md:p-2 md:px-3",
                            {
                                "bg-violet-200 text-violet-600 border-violet-600": pathname === link.href,
                                "bg-gray-100 border-gray-600 border-dashed hover:border-solid" : pathname !== link.href,
                            }
                        )}
                    >
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                )
            })}
        </>
    )
}