import { redirect } from "next/navigation";
import { getCat } from "../lib/dal"

export default async function CatPage() {
    const cat = await getCat();
    if (cat === null) redirect("/home/create");
    const name = cat.name


    return (
        <main>
            <h1>Cat Page</h1>
            <h2>{name}</h2>
            <p>If I change this here, does it cause vercel to try a new deployment when I push, or is that only for pushes to main?</p>

        </main>
    )
}