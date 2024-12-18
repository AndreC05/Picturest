import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function NewUserForm() {
    
    const { userId } = await auth()
    console.log(userId)
    async function handleSubmit(formData) {
        "use server";
        const username = formData.get("username")
        const bio = formData.get("bio")
        await db.query(`INSERT INTO users(username, bio, clerk_id) VALUES($1, $2, $3)`, [username, bio, userId])
        
        revalidatePath("/posts")
        redirect("/posts")
    } 
    return (
        <form className="flex flex-col gap-5  bg-neutral-200 p-5 " action={handleSubmit}>
            <div className="flex flex-row gap-1">
                <label>Username:</label>
                <input className="bg-neutral-200 border border-dotted border-black p-2 rounded mx-3 lg:w-full" 
                required name="username" placeholder="Username" minLength={5} maxLength={50} type="text" />
            </div>
            
            <div  className="flex flex-row">
                <label>Bio: </label>
                <textarea className="bg-neutral-200 border border-dotted border-black p-2 rounded mx-3 lg:w-full"  
                required name="bio" placeholder="bio" minLength={15} maxLength={500} type="text"></textarea>
            </div>
            
            <div className="flex justify-center">
                <button className="flex justify-center bg-blue-400 rounded-lg p-2 w-[70px] hover:bg-blue-600"
                 type="submit" >Submit</button>
            </div>
            
        </form>

    )
}