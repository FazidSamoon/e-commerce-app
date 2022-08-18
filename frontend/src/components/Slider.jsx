import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import { sliderItems } from "../data";

const Slider = () => {
  let [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => {
    setSlideIndex(slideIndex === sliderItems.length - 1 ? 0 : ++slideIndex)
  };

  const prevSlide = () => {
    setSlideIndex(slideIndex ===  0 ? sliderItems.length-1 : --slideIndex)
  };

  return (
    <div className="w-full h-screen flex relative items-center overflow-hidden">
      <div
        className="w-12 h-12 rounded-full bg-white flex items-center justify-center absolute left-0 ml-4 cursor-pointer z-30"
        onClick={prevSlide}
      >
        <ArrowBackIosIcon />
      </div>
      <div className="h-full flex -translate-x-[0vw] ">
        {sliderItems.map((item, index) => {
          return (
            <>
              {index === slideIndex && (       
                <div
                  key={index}
                  className='flex items-center w-screen h-screen transition-all ea duration-1000'
                  style={{ backgroundColor: `${item.bg}` }}
                >
                  <div className="flex flex-1 h-full items-center justify-center ">
                    <img src={item.img} alt="" className="h-[80%]" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <span className="text-[70px] font-medium tracking-wider font-KdamThmorPro">
                      {item.title}
                    </span>
                    <span className="text-[20px] max-w-md tracking-wider mt-8">
                      {item.desc}
                    </span>
                    <button className="p-3 w-44 rounded-lg text-xl bg-transparent cursor-pointer border-4 border-neutral-900 mt-8">
                      SHOP NOW
                    </button>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
      <div
        className="w-12 h-12 rounded-full bg-white flex items-center justify-center absolute right-0 mr-4 cursor-pointer z-30"
        onClick={nextSlide}
      >
        <ArrowForwardIosIcon />
      </div>
    </div>
  );
};

export default Slider;
