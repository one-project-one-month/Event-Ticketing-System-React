import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function CarouselSlide() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    const updateCarouselState = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
      setTotalItems(carouselApi.scrollSnapList().length);
    };

    updateCarouselState();

    carouselApi.on("select", updateCarouselState);

    return () => {
      carouselApi.off("select", updateCarouselState); // Clean up on unmount
    };
  }, [carouselApi]);

  const scrollToIndex = (index: number) => {
    carouselApi?.scrollTo(index);
  };

  return (
    <div className="relative mx-auto mt-5 h-[80vh] w-full px-12 lg:mt-6">
      <Carousel
        setApi={setCarouselApi}
        opts={{ loop: true }}
        className="z-10 h-[80vh] w-full"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card className="bg-gray-400">
                <CardContent className="flex h-[80vh] items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation Arrows */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-between px-10">
        <Button
          onClick={() => scrollToIndex(currentIndex - 1)}
          className="pointer-events-auto h-32 w-32 cursor-pointer rounded-full bg-transparent p-0 shadow-none hover:bg-transparent"
        >
          <ChevronLeft
            className="size-20 cursor-pointer stroke-3 text-black"
            strokeWidth={0.5}
          />
        </Button>
        <Button
          onClick={() => scrollToIndex(currentIndex + 1)}
          className="pointer-events-auto h-32 w-32 cursor-pointer rounded-full bg-transparent p-0 shadow-none hover:bg-transparent"
        >
          <ChevronRight
            className="size-20 cursor-pointer stroke-3 text-black"
            strokeWidth={0.5}
          />
        </Button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute right-0 bottom-4 left-0 z-20 flex justify-center space-x-2">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`h-3 w-3 cursor-pointer rounded-full ${
              currentIndex === index ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
