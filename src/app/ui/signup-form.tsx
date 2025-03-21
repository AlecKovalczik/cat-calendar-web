'use client';
 
import { signup } from "@/app/actions/auth";
import Link from "next/link";
import { useActionState } from "react";
 
export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)
 
  return (
    <form action={action} className="flex grow flex-col w-full px-4 pb-4 text-xl">
      <div className="px-8">
        <label htmlFor="username">Username:</label><br></br>
        <input id="username" name="username" placeholder="Enter a username" className="w-full px-1 border border-black rounded-md bg-gray-100" />
        {state?.errors?.username && <p className="text-red-600 text-sm">{state.errors.username}</p>}
      </div>
      <div className="px-8">
        <label htmlFor="password">Password:</label><br></br>
        <input id="password" name="password" type="password" placeholder="Enter a password" className="w-full px-1 border border-black rounded-md bg-gray-100" />
        {state?.errors?.password && (
          <div className="text-red-600 text-sm">
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="grow"></div>
      <div className="flex flex-row"></div>
      <Link href="/login" className="text-black hover:text-violet-600">I already have an account</Link>
      <button disabled={pending} type="submit" className="h-12 border border-dashed border-black rounded-md bg-gray-100 hover:border-solid hover:border-violet-600 hover:bg-violet-100 hover:text-violet-800">
        Sign up
      </button>
    </form>
  )
}