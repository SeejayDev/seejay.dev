import SolidPointerIcon from "@/icons/SolidPointerIcon";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="">
        <div className="text-lg flex items-center mb-8">
          <p className="mr-2 font-semibold">Hey there!</p>
        </div>
        <Link href="/groop" className="">
          <div className="border-purple-600 border-4 rounded-xl p-4">
            <p className="font-bold text-5xl text-purple-600 text-center ">
              GROOP
            </p>
          </div>
        </Link>
        <div className="flex items-center mt-2">
          <SolidPointerIcon className="text-yellow-400" />
          <p className="ml-2 text-sm font-medium">yer probably here for this</p>
        </div>
      </div>
    </div>
  );
}
