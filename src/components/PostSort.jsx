import Link from "next/link";

export default async function PostSort() {
  return (
    <div>
      <h4>Sort posts:</h4>
      <Link href={"/posts?sort=asc"}>Asc</Link>
      <Link href={"/posts?sort=desc"}>Desc</Link>
      <Link href={"/posts?sort=likes"}>Most Likes</Link>
    </div>
  );
}
