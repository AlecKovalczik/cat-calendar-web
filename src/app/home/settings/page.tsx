

export default function SettingsPage() {


    return (
        <div className="h-screen">
            <header className="w-full pt-4 pb-2 px-12 mb-2 z-10 border-b border-dashed border-black"> {/*sticky top-0 pt-4 pb-2 px-12 mb-2 backdrop-blur border border-b-black border-dashed */}
                <div className="w-full flex grow flex-row items-center px-4 py-4 mb-2 text-white bg-violet-600 border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-stone-400 z-50">
                    <h1 className="text-3xl uppercase"><b>Settings</b></h1>
                    <div className="hidden w-auto h-full grow rounded-md md:block"></div>
                </div>
            </header>
            <main className="flex flex-col space-y-2 h-4/5 mx-12 mt-4 p-4 bg-white border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-stone-400">
                <div className="flex flex-row grow space-x-2">
                    <div className="flex flex-col space-y-2 w-1/3 py-2 px-8">
                        <h2 className="text-center text-xl">Profile</h2>
                        <div>
                            <label htmlFor="username">Username:</label><br></br>
                            <input id="username" name="username" placeholder="Enter a username" className="w-full px-1 border border-black rounded-md bg-gray-100" />
                        </div>
                    </div>
                    <div className="h-full border-l border-dashed border-black "></div>
                    <div className="flex flex-col space-y-2 w-1/3 py-2 px-8">
                        <h2 className="text-center text-xl">Graphics</h2>
                        <div>
                            <p>Theme:</p>
                            <input type="radio" id="device" name="theme" value="device"></input><label htmlFor="device"> Device</label><br></br>
                            <input type="radio" id="light" name="theme" value="light"></input><label htmlFor="light"> Light</label><br></br>
                            <input type="radio" id="dark" name="theme" value="dark"></input><label htmlFor="dark"> Dark</label><br></br>
                        </div>
                        <div className="flex flex-row justify-between">
                            <span>Favoite Color:</span>
                            
                            <input type="color" />
                        </div>
                    </div>
                    <div className="h-full border-r border-dashed border-black"></div>
                    <div className="flex flex-col space-y-2 w-1/3 py-2 px-8">
                        <h2 className="text-center text-xl">Privacy</h2>
                    </div>
                </div>
                <div className="flex flex-row space-x-2">
                    <div className="grow"></div>
                    <button type="button" className="h-[35px] w-[90px] bg-white text-black border border-black rounded-md">
                        Cancel
                    </button>
                    <button type="submit" className="h-[35px] w-[90px] bg-violet-500 text-white border border-black rounded-md">
                        Save
                    </button>
                </div>
            </main>
        </div>
    )
}