import { redirect } from "next/navigation";
import { getCat } from "../../lib/dal"

export default async function CatPage() {
    const cat = await getCat();

    // If the user doesn't have a cat, redirect them to the adoption page
    if (cat === null) redirect("/home/cat/adopt");
    const name = cat.name

    return (
        <main className="bg-white">
            <div className="absolute top-0 left-64 right-0 w-fill pt-4 pb-2 px-12 mb-2 z-10"> {/*sticky top-0 pt-4 pb-2 px-12 mb-2 backdrop-blur border border-b-black border-dashed */}
                <div className="w-fill flex grow flex-row items-center px-4 py-4 mb-2 text-white bg-violet-600 border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-stone-400 z-50">
                    <h1 className="text-3xl uppercase"><b>{name}</b></h1>
                    <div className="hidden w-auto h-full grow rounded-md md:block"></div>
                </div>
            </div>
            <div className="flex flex-row h-screen w-full">
                <div className="grow"></div>
                <div className="w-1/2">
                    <img src="/bad_cat.png" className="object-contain"></img>
                </div>
                <div className="grow"></div>
            </div>
        </main>
    )
}