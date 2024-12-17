import { db } from "@/utils/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UserProfie({ params }) {
  const profileId = (await params).user_id;

  const userResponse = await db.query(
    `SELECT id, username, bio, TO_CHAR(date_joined, 'YYYY-MM-DD') AS date, clerk_id FROM users WHERE users.id = $1`,
    [profileId]
  );

  const userData = userResponse.rows;

  if (userData.length === 0) {
    notFound();
  }

  const clerk_id = userData[0].clerk_id;

  const postsResponse = await db.query(
    `SELECT posts.id, posts.title, posts.content, TO_CHAR(posts.post_date, 'YYYY-MM-DD') AS date, posts.likes, posts.image, users.username, users.id as user_id
    FROM posts
    JOIN users ON posts.clerk_id = users.clerk_id
    WHERE posts.clerk_id = $1
    ORDER BY posts.id DESC`,
    [clerk_id]
  );

  const posts = postsResponse.rows;

  return (
    <>
      <SignedIn>
        <div className="flex justify-center items-center flex-col ">
          {/* <h1>Profile: </h1> */}

          {userData.map((user) => (
            <div className="flex flex-col gap-3" key={user.id}>
              <div className="flex flex-row gap-3">
                <img
                  className="rounded-full"
                  width={50}
                  src={
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                />
                <h2 className="pt-3">{user.username}</h2>
              </div>

              <p>Bio: {user.bio}</p>
              <h4>Date Joined: {user.date}</h4>
            </div>
          ))}

          <h2 className="pt-5">Posts:</h2>
          <div className="flex flex-col sm:grid sm:grid-cols-2 sm:grid-rows-1 md:grid-cols-2 md:grid-rows-2  sm:grid-rows-2 lg:gap-1 lg:grid-cols-3 lg:grid-rows-3 ">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex  border bg-neutral-200 p-5 flex-col m-1 my-3 w-96 rounded-2xl"
              >
                <div className="flex flex-row justify-between">
                  <h3 className="text-xl">
                    <Link href={`/users/${post.user_id}`}>{post.username}</Link>
                  </h3>
                  <p className="pt-1 flex justify-end">{post.date}</p>
                </div>
                <h3 className="font-semibold ">{post.title}</h3>
                <p className="pb-2">{post.content}</p>
                <img src={post.image} />
                {/* <h4>{post.date}</h4> */}
                <div className="flex flex-row justify-around">
                  <p className="pt-2">{post.likes} likes</p>

                  <Link href={`/posts/${post.id}`} className="pt-2">
                    <img
                      width={18}
                      height={10}
                      src={"../../images/comment.png"}
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <Link href={"/sign-in"}>Please Sign-in</Link>
      </SignedOut>
    </>
  );
}
