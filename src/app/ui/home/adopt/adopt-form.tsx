'use client';

import { createCat, State } from "@/app/actions/cat";
import { useActionState } from "react";

export default function AdoptForm() {
    const initialState: State = { message: null, errors: {} };
    const [state, action] = useActionState(createCat, initialState)

    return (
        <form action={action} className="flex grow flex-col h-full mx-12 my-4 px-4 py-4 text-xl bg-white border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-stone-400">
            <div className="flex flex-row grow">
                <div className="flex flex-col w-2/5 space-y-2 pr-2 pb-4">
                    <div>
                        <label htmlFor="name">Name:</label><br></br>
                        <input id="name" name="name" placeholder="Give your cat a name" className="w-full px-1 border border-black rounded-md bg-stone-100 hover:bg-stone-200" />
                    </div>
                    <div>
                        <label htmlFor="coat_length">Coat Length:</label><br></br>
                        <select name="coat_length" id="coat_length" className="w-full bg-stone-100 hover:bg-stone-200 border border-black rounded-sm">
                            <option value="long">Long</option>
                            <option value="short">Short</option>
                            <option value="hairless">Hairless</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="coat_type">Coat Type:</label><br></br>
                        <select name="coat_type" id="coat_type" className="w-full bg-stone-100 hover:bg-stone-200 border border-black rounded-sm">
                            <option value="solid">Solid</option>
                            <option value="tabby">Tabby</option>
                            <option value="tuxedo">Tuxedo</option>
                            <option value="calico">Calico</option>
                            <option value="tortoiseshell">Tortoiseshell</option>
                            <option value="siamese">Siamese</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="coat_color">Coat Color:</label><br></br>
                        <select name="coat_color" id="coat_color" className="w-full bg-stone-100 hover:bg-stone-200 border border-black rounded-sm">
                            <option value="gray">Gray</option>
                            <option value="brown">Brown</option>
                            <option value="black">Black</option>
                            <option value="white">White</option>
                            <option value="orange">Orange</option>
                            <option value="silver">Silver</option>
                        </select>
                    </div>
                </div>
                <div className="grow"></div>
                <div className="w-2/5">
                    {/* Cat picture should be automatically changed based on user selection */}
                    <img src="/bad_cat.png" className="object-contain"></img>
                </div>
            </div>
            <div className="grow"></div>
            <button type="submit" className="h-12 border border-dashed border-black rounded-md bg-stone-100 hover:border-solid hover:border-violet-600 hover:bg-violet-100 hover:text-violet-800">
                Adopt
            </button>
        </form>
    )
}