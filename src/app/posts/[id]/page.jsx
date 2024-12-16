import EditPostBtn from "@/components/EditPostBtn"
import PostDeleteBtn from "@/components/postDeleteBtn"
import PostLikeBtn from "@/components/postLikeBtn"
import { handleEditPost } from "@/utils/actions"
import { db } from "@/utils/db"
import Comments from "@/components/comment"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import Link from "next/link"

//Page with a single post and comments //Also has form to create and another to edit comments
export default async function SinglePostPage({params}) {
    const postId = (await params).id
    const postResponse = (await db.query(`SELECT posts.id, posts.title, posts.clerk_id, posts.content, posts.image, users.username, users.id AS user_Id,
        TO_CHAR(posts.post_date, 'YYYY-MM-DD') AS date, posts.likes FROM posts JOIN users ON posts.clerk_id=users.clerk_id WHERE posts.id =$1 
        ORDER BY posts.id DESC`, [postId])) 
    const post = postResponse.rows
    
    return (<>
        <SignedIn>
            {post.map((p)=>(
                <div key={p.id}  className="flex  border bg-neutral-200 p-5 flex-col m-5 w-96 rounded-2xl"
                >
                    <h3 className="text-xl">
            <Link href={`/users/${p.user_Id}`}>{p.username}</Link>
          </h3>
          <h3 className="text-2xl">{p.title}</h3>
          <p>{p.content}</p>
          <img src={p.image} />
          <p>{p.date}</p>
          <p>{p.likes} likes</p>
          <PostLikeBtn />

          <EditPostBtn postId={p.id} handleEditPost={handleEditPost} />

          <PostDeleteBtn post={p.id} />
                </div>
                        ))} 
            <Comments/>
        </SignedIn>
        <SignedOut>
            <Link href={"/sign-in"}>Please Sign In</Link>
        </SignedOut>
        </>)
}