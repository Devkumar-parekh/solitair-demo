import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div>
      <div className="block">
        <Link href={"/pages/cardboard"}>Card game</Link>
      </div>
      <div>
        <Link href={"/pages/solitaire"}>Solitaire</Link>
      </div>

      </div>
    </div>
  );
}
