import { CarouselImage } from "@/models/carouselImage";
import { useEffect, useRef, useState } from "react";
import "@/app/globals.css";

interface CarouselProps {
  images: CarouselImage[],
  timeout?: number,
  autoScroll?: boolean
}


/**
 * Carousel Slider component
 */
const CarouselSlider: React.FC<CarouselProps> = ({images, timeout=5000, autoScroll=true}) => {
  const [currentIndex, setCurrentIndex] = useState(0); // create state to keep track of images index, set the default index to 0

  const slideRight = () => {
    setCurrentIndex((currentIndex + 1) % images.length); // increases index by 1
  };

  const slideLeft = () => {
    const nextIndex = currentIndex - 1;
    if (nextIndex < 0) {
      setCurrentIndex(images.length - 1); // returns last index of images array if index is less than 0
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  useEffect(()=>{
    if(autoScroll) {
      const interval = setInterval(()=>{
        slideLeft();
      },timeout);
      return () => clearInterval(interval);
    }
  },[currentIndex, images.length]);

  return (
    images.length > 0 && (
      <div className="flex flex-row w-full justify-center custom-h-carousel items-center mb-16 relative">
        <button title="slide left" className="p-1 absolute z-10 left-0 text-3xl bg-orange-500 md:hover:bg-orange-400 max-md:active:bg-orange-400 text-white" onClick={slideLeft}>{"<"}</button>
        {images.map((image,index)=>{
          return <img key={index} style={{maxHeight:'450px'}} className={` dark:brightness-75 transition-opacity object-contain duration-1000 ${index === currentIndex ? 'opacity-100 w-4/5 max-sm:w-full custom-h-carousel' : 'opacity-0 max-h-0 max-w-0 '}`} src={image.source} alt={image.label} />
        })}
        <button title="slide right" className="p-1 absolute right-0 text-3xl bg-orange-500 md:hover:bg-orange-400 max-md:active:bg-orange-400 text-white" onClick={slideRight}>{">"}</button>
        <div className="flex flex-row absolute -bottom-6">
          {images.map((image,index)=>{
            return <div key={index} className={`h-1 w-8 mx-1 ${index === currentIndex ? 'bg-orange-400' : 'dark:bg-zinc-500 bg-gray-400'}`}></div>
          })}
        </div>
        <button className="absolute z-10 top-3/4 bg-orange-500 w-24 md:w-40 text-ellipsis overflow-hidden whitespace-nowrap md:hover:bg-orange-400 max-md:active:bg-orange-400 py-1 px-2 rounded-md text-white">{images[currentIndex].label}</button>
      </div>
    )
  );
};

export default CarouselSlider;