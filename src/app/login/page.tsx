import Link from "next/link";
import LoginForm from "../ui/login-form";

export default function Login() {
    return (
        <div className="flex flex-col items-center">
            <Link 
                href="/"
                className="flex items-center gap-5 self-start rounded-lg bg-red-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-400 md:text-base"
            >
                {"<"} Back
            </Link>
            Log in
            <LoginForm />
        </div>
    )
}