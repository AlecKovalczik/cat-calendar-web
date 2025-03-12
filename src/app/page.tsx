import Link from "next/link";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="w-fill">
      <div className="mt-4 right-0 left-0 mx-4 flex flex-col gap-4 row-start-2 px-4 pb-4 bg-violet-600 border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-stone-400">
        <div className="mt-4 flex flex-row grow bg-violet-600 items-center row-start-2 gap-2 ">
          <h1 className="h-fill align-middle text-white text-3xl">Cat Calendar</h1>
          <div className="grow"></div>
          <Link
            href="/login"
            className="flex items-center gap-4 self-start bg-white text-black px-6 py-3 md:text-base font-bold border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-violet-1000"
          >
            <span>Log in</span>
          </Link>
          <Link
            href="/signup"
            className="flex items-center gap-4 self-start bg-white text-black px-6 py-3 md:text-base font-bold border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-violet-1000"
          >
            <span>Sign up</span>
          </Link>
        </div>
        <div className="static flex flex-col text-white items-center scroll-auto mb-4">
          <h1 className="text-4xl font-bold">🚀 Stay Productive. Save Your Cat.</h1>
          <p className="mt-4 text-lg">
            {"A task tracker that keeps you on schedule—because your cat's life depends on it!"}
          </p>
          <div className="mt-6">
            <Link href="/signup" className="bg-white text-black px-6 py-4 font-bold text-lg border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-violet-1000">
              Start Now
            </Link>
            {/* <button className="bg-white text-violet-600 px-6 py-3 rounded-md font-bold text-lg">
              Learn More
            </button> */}
          </div>
          {/* <Image
            src="/public/bad-cat.png"
            alt="Cat sitting next to a planner (not yet created, I need art...)"
            className="mx-auto mt-8 w-64"
            width="600"
            height="100"
          /> */}
        </div>
      </div>

      <main className="bg-gray-100 text-gray-900">
        {/* How It Works Section */}
        <section className="py-16 px-6 text-center">
          <h2 className="text-3xl font-bold text-violet-600">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            {[
              { title: "Add Your Tasks", icon: "📅", desc: "Track assignments and deadlines easily." },
              { title: "Keep Your Cat Healthy", icon: "🐱", desc: "Complete tasks to keep your cat happy." },
              { title: "Stay Accountable", icon: "🛎️", desc: "Friends and \"Cat Protective Services\" check in on you." },
              { title: "Earn & Customize", icon: "🎮", desc: "Get coins to buy accessories for your cat." },
            ].map((step, index) => (
              <div key={index} className="bg-white p-6 border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-stone-400">
                <div className="text-4xl">{step.icon}</div>
                <h3 className="text-xl font-semibold mt-4">{step.title}</h3>
                <p className="mt-2 text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why You'll Love It Section */}
        <section className="bg-gray-200 py-16 px-6">
          <h2 className="text-3xl font-bold text-violet-600 text-center">{"Why You'll Love It"}</h2>
          <div className="flex flex-col md:flex-row items-center justify-between mt-8">
            <div>{"Mockup Image Here (Still need art)"}</div>
            {/* <Image
              src="/images/app-mockup.png"
              alt="App Mockup (not yet created)"
              className="w-full md:w-1/2 border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-stone-400"
              width="600"
              height="200"
            /> */}
            <ul className="mt-6 md:mt-0 md:ml-12 space-y-4">
              {[
                "✅ Fun & Motivating – Procrastination is harder when your cat is on the line.",
                "✅ Social & Supportive – Stay accountable with friends.",
                "✅ Cross-Platform – Use it on web or mobile anytime, anywhere.",
                "✅ Customizable – Personalize your cat with shop items.",
              ].map((point, index) => (
                <li key={index} className="text-lg">{point}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Call to Action */}
        <section className="flex flex-col space-y-12 text-center py-16 bg-violet-600 text-white">
          <h2 className="text-3xl font-bold">Join thousands of students turning tasks into a game!</h2>
          <div>
            <Link href="/signup" className="bg-white text-black px-6 py-4 font-bold text-lg border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-violet-1000">
              Sign Up Now
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
