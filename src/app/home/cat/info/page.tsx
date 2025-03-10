import { getCat } from "@/app/actions/cat";
import { redirect } from "next/navigation";
import { Cat } from "@/app/lib/definitions"
import CatInfoForm from "@/app/ui/cat/info/cat-info-form";

export default async function CatInfoPage() {
    const cat = await getCat();

    // If the user doesn't have a cat, redirect them to the adoption page
    if (cat === null) redirect("/home/cat/adopt");
    const parsedCat: Cat = {
        id: cat.id,
        userId: cat.userId,
        name: cat.name,
        coat_length: cat.coat_length,
        coat_type: cat.coat_type,
        coat_color: cat.coat_color
    }

    return (
        <main>
            <div className="sticky top-0 w-fill pt-4 pb-2 px-12 mb-2 z-10 border-b border-dashed border-black"> {/*sticky top-0 pt-4 pb-2 px-12 mb-2 backdrop-blur border border-b-black border-dashed */}
                <div className="w-full flex grow flex-row items-center px-4 py-4 mb-2 text-white bg-violet-600 border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-stone-400 z-50">
                    <h1 className="text-3xl uppercase"><b>Cat Info</b></h1>
                    <div className="hidden w-auto h-full grow rounded-md md:block"></div>
                </div>
            </div>
            <CatInfoForm cat={parsedCat} />
        </main>
    )
}