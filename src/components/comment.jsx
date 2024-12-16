import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";

export default async function Comments() {

    const { userId } = await auth()

    async function handleComment(formData) {
        "use server";
        const comment = formData.get("content")
        await db.query(`INSERT INTO comments(clerk_id, content, post_id, likes) 
            VALUES($1, $2)`, [userId, comment, post_id, likes])
    }

    return (
        <form className="p-5" action={handleComment}>
            <input name="content" type="text" placeholder="comment" />
            <button type="submit" >Comment</button>
        </form>
    )

}