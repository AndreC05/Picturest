import { HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <p>Page could not be found. Please return to the Home page</p>
      <Link href={"/"}>
        Home <HomeIcon />
      </Link>
    </div>
  );
}
