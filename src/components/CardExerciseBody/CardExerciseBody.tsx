import Image from "next/image";
import React from "react";
import ContainerHome from "../containers/ContainerHome/ContainerHome";

const CardExerciseBody = () => {
  return (
    <ContainerHome>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative py-5 lg:pb-10 lg:pt-8">
        <div className="relative w-full h-[200px] sm:h-[400px] md:h-[500px] lg:h-[500px] overflow-hidden rounded-lg shadow-lg">
          <div className="absolute w-full h-[110px] bg-[#00000025] bottom-0 z-20 backdrop-blur-md px-10 py-8">
            <p className="text-white text-2xl font-bold">Exercise 1</p>
            <span className="text-gray-300">lorem lorem</span>
          </div>
          <Image
            className=""
            layout="fill"
            src="/images/b-1.jpg"
            objectFit="cover"
            quality={100}
            priority
            alt="exercise body 1"
          />
        </div>
        <div className="relative w-full h-[200px] sm:h-[400px] md:h-[500px] lg:h-[500px] overflow-hidden rounded-lg shadow-lg">
          <div className="absolute w-full h-[110px] bg-[#00000025] bottom-0 z-20 backdrop-blur-md px-10 py-8">
            <p className="text-white text-2xl font-bold">Exercise 2</p>
            <span className="text-gray-300">lorem lorem</span>
          </div>
          <Image
            className=""
            layout="fill"
            src="/images/b-2.jpg"
            objectFit="cover"
            quality={100}
            priority
            alt="exercise body 1"
          />
        </div>
        <div className="relative w-full h-[200px] sm:h-[400px] md:h-[500px] lg:h-[500px] overflow-hidden rounded-lg shadow-lg">
          <div className="absolute w-full h-[110px] bg-[#00000025] bottom-0 z-20 backdrop-blur-md px-10 py-8">
            <p className="text-white text-2xl font-bold">Exercise 3</p>
            <span className="text-gray-300">lorem lorem</span>
          </div>
          <Image
            className=""
            layout="fill"
            src="/images/b-3.jpg"
            objectFit="cover"
            quality={100}
            priority
            alt="exercise body 1"
          />
        </div>
        <div className="relative w-full h-[200px] sm:h-[400px] md:h-[500px] lg:h-[500px] overflow-hidden rounded-lg shadow-lg">
          <div className="absolute w-full h-[110px] bg-[#00000025] bottom-0 z-20 backdrop-blur-md px-10 py-8">
            <p className="text-white text-2xl font-bold">Exercise 4</p>
            <span className="text-gray-300">lorem lorem</span>
          </div>
          <Image
            className=""
            layout="fill"
            src="/images/b-4.jpg"
            objectFit="cover"
            quality={100}
            priority
            alt="exercise body 1"
          />
        </div>
      </div>
    </ContainerHome>
  );
};

export default CardExerciseBody;
