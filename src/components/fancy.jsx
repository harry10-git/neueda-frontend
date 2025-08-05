// NewTransactionButton.jsx
import React from "react";

const NewTransactionButton = () => {
  return (
    <div className="group relative flex h-[90px] w-[460px] rounded-md bg-white transition-all duration-300 ease-in-out hover:scale-105 hover:w-[180px]">
      <div className="relative flex h-[90px] w-[130px] flex-shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#5de2a3] transition-all duration-300 ease-in-out cursor-pointer group-hover:w-full">
        {/* Card */}
        <div className="absolute z-10 flex h-[46px] w-[70px] flex-col items-center rounded-md bg-[#c7ffbc] shadow-[9px_9px_9px_-2px_rgba(77,200,143,0.72)] group-hover:animate-slide-top">
          <div className="mt-2 h-[13px] w-[65px] rounded-sm bg-[#80ea69]" />
          <div className="mt-2 h-2 w-2 -ml-[30px] rotate-90 rounded-full bg-[#379e1f] shadow-[0_-10px_0_0_#26850e,0_10px_0_0_#56be3e]" />
        </div>

        {/* Post */}
        <div className="absolute bottom-2 top-[90px] z-10 h-[75px] w-[63px] overflow-hidden rounded-md bg-[#dddde0] group-hover:animate-slide-post">
          <div className="absolute right-2 top-2 h-[9px] w-[47px] rounded-b bg-[#545354] before:absolute before:top-[-8px] before:h-[9px] before:w-[47px] before:bg-[#757375]" />
          <div className="absolute right-2 top-[22px] h-[23px] w-[47px] rounded bg-white">
            <div className="absolute left-0 top-0 w-full text-center font-lexend text-sm text-[#4b953b] group-hover:animate-fade-in-fwd">
              $
            </div>
          </div>
          <div className="absolute left-[25px] top-[52px] h-[12px] w-[12px] rotate-90 rounded-sm bg-[#838183] shadow-[0_-18px_0_0_#838183,0_18px_0_0_#838183]" />
          <div className="absolute left-[25px] top-[68px] h-[12px] w-[12px] rotate-90 rounded-sm bg-[#aaa9ab] shadow-[0_-18px_0_0_#aaa9ab,0_18px_0_0_#aaa9ab]" />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-[calc(100%-130px)] items-center justify-between overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out hover:bg-[#f9f7f9] cursor-pointer">
        <div className="ml-5 text-[28px] font-lexend">Let's Dive In</div>
        <svg
          className="mr-5 h-5 w-5"
          viewBox="0 0 451.846 451.847"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#cfcfcf"
            d="M345.441 248.292L151.154 442.573c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744L278.318 225.92 106.409 54.017c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.287 194.284c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373z"
          />
        </svg>
      </div>
    </div>
  );
};

export default NewTransactionButton;
