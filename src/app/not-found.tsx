import Link from "next/link";

export function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-[45vh] md:h-full px-5 text-center">
      :( Not found
      <Link href="/">
        <button className="bg-primary text-black px-4 py-2 rounded-lg hover:bg-[#e49a45] hover:text-white mt-5">
          Return to home
        </button>
      </Link>
    </div>
  );
}

export default NotFound;
