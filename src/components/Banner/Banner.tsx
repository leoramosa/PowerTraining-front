import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <div className="relative w-full h-[200px] sm:h-[400px] md:h-[500px] lg:h-[500px] overflow-hidden">
      <div className="bg-[#000000a9] absolute w-full h-full z-10 top-0 bottom-0">
        <div className="flex items-center justify-center h-full flex-col">
          <p className="text-white text-4xl sm:text-7xl font-bold">
            Train at your <span className="text-primary">pace</span>
          </p>
          <Link href="/login">
            <button className="text-black text-bold mt-10 text-2xl bg-primary px-8 py-2 rounded-full">
              Get Started
            </button>
          </Link>
        </div>
      </div>
      <Image
        className=""
        layout="fill"
        src="/images/banner.jpg"
        objectFit="cover" // Hace que la imagen se ajuste al tamaño del contenedor
        quality={100} // Opcional: establece la calidad de la imagen
        priority // Opcional: carga prioritaria
        alt="banner"
      />
    </div>
  );
};

export default Banner;
