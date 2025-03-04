import Link from "next/link";
import LoginForm from "../ui/login-form";

export default function Login() {
    return (
        <div className="bg-gray-100 overflow-y-auto w-screen h-screen flex items-center justify-center">
            <div className="flex flex-col items-center h-3/4 w-1/3 bg-white border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-stone-400">
                <div className="flex items-center w-full px-4 py-3 mb-2 border-b border-b-black border-dashed">
                    <Link 
                        href="/"
                        className="w-[100px] text-xl text-red-500 hover:text-red-900"
                    >
                        {"<"} Back
                    </Link>
                    <div className="grow"></div>
                    <h1 className="text-3xl text-center"> 
                        Log in
                    </h1>
                    <div className="grow"></div>
                    <div className="w-[100px]"></div>

                </div>
                <LoginForm />
            </div>
        </div>
    )
}