import Link from "next/link";

export default async function PostSort() {
  return (
    <div className="flex m-5   ">
      <div className="flex flex-col bg-neutral-200 p-3 rounded-lg ">
        <h4 className="font-semibold">Sort posts:</h4>
        <Link href={"/posts?sort=asc"}>Asc</Link>
        <Link href={"/posts?sort=desc"}>Desc</Link>
        <Link href={"/posts?sort=likes"}>Most Likes</Link>
      </div>
      
    </div>
  );
}
