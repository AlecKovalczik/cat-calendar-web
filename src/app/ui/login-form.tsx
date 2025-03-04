'use client';
 
import { login } from "@/app/actions/auth";
import { useActionState } from "react";
 
export default function SignupForm() {
  const [state, action, pending] = useActionState(login, undefined)
 
  return (
    <form action={action} className="flex grow flex-col w-full px-4 pb-4 text-xl">
      <div>
        <label htmlFor="username">Username:</label><br></br>
        <input id="username" name="username" placeholder="Username" className="border border-black rounded-md bg-gray-100" />
      </div>
      {state?.errors?.username && <p>{state.errors.username}</p>}
      <div>
        <label htmlFor="password">Password:</label><br></br>
        <input id="password" name="password" type="password" placeholder="Password" className="border border-black rounded-md bg-gray-100" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="grow"></div>
      <div className="flex flex-row"></div>
      <button disabled={pending} type="submit">
        Login
      </button>
    </form>
  )
}