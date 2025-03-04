import { redirect } from "next/navigation";
import { getCat } from "../lib/dal"

export default async function CatPage() {
    const cat = await getCat();
    if (cat === null) redirect("/home/create");
    const name = cat.name


    return (
        <main className="bg-white">
            <div className="sticky top-0 w-fill pt-4 pb-2 px-12 mb-2 z-10"> {/*sticky top-0 pt-4 pb-2 px-12 mb-2 backdrop-blur border border-b-black border-dashed */}
                <div className="w-fill flex grow flex-row items-center px-4 py-4 mb-2 text-white bg-violet-600 border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-stone-400 z-50">
                    <h1 className="text-3xl uppercase"><b>{name}</b></h1>
                    <div className="hidden w-auto h-full grow rounded-md md:block"></div>
                </div>                
            </div>
            <img src="bad_cat.png" className="relative top-0 w-screen h-screen object-contain"></img>
        </main>
    )
}