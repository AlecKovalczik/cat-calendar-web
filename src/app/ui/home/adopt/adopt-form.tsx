'use client';


import Link from "next/link";
import { useActionState } from "react";

export default function AdoptForm() {
    const [state, action, pending] = useActionState(adopt, undefined)

    return (
        <form action={action} className="flex grow flex-col w-full px-4 pb-4 text-xl">
            <div className="px-8">
                <label htmlFor="username">Username:</label><br></br>
                <input id="username" name="username" placeholder="Enter a username" className="w-full px-1 border border-black rounded-md bg-gray-100" />
            </div>
            <div className="px-8">
                <label htmlFor="password">Password:</label><br></br>
                <input id="password" name="password" type="password" placeholder="Enter a password" className="w-full px-1 border border-black rounded-md bg-gray-100" />
            </div>
            <div className="px-8">
                {state?.error && <p className="text-red-600 text-sm">{state.error}</p>}
            </div>
            <div className="grow"></div>
            <div className="flex flex-row"></div>
            <Link href="/signup" className="text-black hover:text-violet-600">Create an account</Link>
            <button disabled={pending} type="submit" className="h-12 border border-dashed border-black rounded-md bg-gray-100 hover:border-solid hover:border-violet-600 hover:bg-violet-100 hover:text-violet-800">
                Log in
            </button>
        </form>
    )
}