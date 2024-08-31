import React from 'react';
import '../styles/output.css';
import '../styles/colors.css';

const TagLine = () => {
  return (
    <div className="w-full pt-2 pb-2">
      <h1 className="text-charcoal-gray text-3xl font-semibold">
        Type Driven Development with Yew
      </h1>
    </div>
  );
}

const SellingPoints = () => {
  return (
    <div className="flex">
      <ul className="text-white">
        <li>Open source</li>
        <li>Type safety++</li>
        <li>Cool new language :p</li>
      </ul>
    </div>
  );
}

const Board = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="relative w-[80%] h-fit">
        <div className="relative rounded-tl-lg rounded-tr-lg z-[10] bg-[rgba(131,175,141,1)]">
          <div className="pl-[15%]">
            <TagLine />
          </div>
        </div>
        <div className="pl-[15%] pt-2">
          <SellingPoints />
        </div>
        <div className="absolute aspect-[16/5] top-0 left-0 right-0 rounded-lg bg-[rgba(255,255,255,0.65)] z-0" />
      </div>
    </div>
  );
}

const Page = () => {
  return (
    <div>
      <Board />
    </div>
  );
}

export default Page;