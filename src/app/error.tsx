"use client";

import Link from "next/link";

export function GlobalError({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col justify-center items-center h-[45vh] md:h-full px-5 text-center">
      <p className="{styles.Error__message}">
        Apparently an error has occurred, but dont feel bad.
      </p>
      <Link href="/">
        <button
          className="bg-primary text-black px-4 py-2 rounded-lg hover:bg-[#e49a45] hover:text-white mt-5"
          onClick={reset}
        >
          Return to home
        </button>
      </Link>
    </div>
  );
}

export default GlobalError;
