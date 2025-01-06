export default function Task({ title, description, status}: {title: string, description: string, status: string}) {
    return (
        <div className="bg-white p-2 border border-black rounded-md shadow-[4px_4px_0_0_rgb(0,0,0,.3)] shadow-stone-400">
            <h1><b>Title: {title}</b></h1>
            <p>Description: {description}</p>
            <p>Status: {status}</p>
        </div>
    )
}