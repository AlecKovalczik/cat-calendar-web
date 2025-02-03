import Link from "next/link";

export default function Home() {
  return (
    <div className="w-fill">
      <header className="sticky top-0 w-fill pt-4 pb-2 px-4 mb-2 bg-gray-100 border border-b-black border-dashed z-10">
        <div className="flex flex-row grow items-center gap-4 row-start-2 p-4 border border-black rounded-md bg-violet-600 shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-stone-400">
          <h1 className="h-fill align-middle text-white text-3xl">Cat Calendar</h1>
          <div className="grow"></div>
          <Link
            href="/login"
            className="flex items-center gap-4 self-start rounded-lg bg-white text-black px-6 py-3 md:text-base font-bold border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-violet-1000"
          >
            <span>Log in</span>
          </Link>
          <Link
            href="/signup"
            className="flex items-center gap-4 self-start rounded-lg bg-white text-black px-6 py-3 md:text-base font-bold border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-violet-1000"
          >
            <span>Sign up</span>
          </Link>
        </div>
      </header>
      <main className="mx-4">
        <h1>What is Cat Calendar?</h1>
        <p>Add content here</p>
      </main>
    </div>
  );
}
