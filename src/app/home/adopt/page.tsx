export default async function AdoptCat() {
    return (
        <main>
            <div className="sticky top-0 w-fill pt-4 pb-2 px-12 mb-2 z-10 border-b border-dashed border-black"> {/*sticky top-0 pt-4 pb-2 px-12 mb-2 backdrop-blur border border-b-black border-dashed */}
                <div className="w-fill flex grow flex-row items-center px-4 py-4 mb-2 text-white bg-violet-600 border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-stone-400 z-50">
                    <h1 className="text-3xl uppercase"><b>Adopt a Cat</b></h1>
                    <div className="hidden w-auto h-full grow rounded-md md:block"></div>
                </div>                
            </div>
            
        </main>
    )
}