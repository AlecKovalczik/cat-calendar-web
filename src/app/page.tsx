import Link from "next/link";

export default function Home() {
  return (
    <div className="w-fill mx-3 mt-3">
      <main className="flex flex-row grow text-center gap-4 row-start-2 items-center sm:items-start p-4 border border-black rounded-md bg-violet-600">
        <h1 className="h-fill text-center text-white text-3xl">Cat Calendar</h1>
        <div className="grow"></div>
        <Link
          href="/login"
          className="flex items-center gap-4 self-start rounded-lg bg-white text-black px-6 py-3 md:text-base"
        >
          <span>Log in</span>
        </Link>
        <Link
          href="/signup"
          className="flex items-center gap-4 self-start rounded-lg bg-white text-black px-6 py-3 md:text-base"
        >
          <span>Sign up</span>
        </Link>
      </main>
    </div>
  );
}
