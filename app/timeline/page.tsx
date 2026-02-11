'use client';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import a1 from '@/public/satellite/2023-03-15.jpg';
import a2 from '@/public/satellite/2024-05-09.jpg';
import a3 from '@/public/satellite/2025-04-24.jpg';
import { AnimatePresence, motion } from 'motion/react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Fade, { FadeType } from 'embla-carousel-fade';
import WheelGesturesPlugin from 'embla-carousel-wheel-gestures';

export type pageProps = {};

const images: [string, StaticImageData][] = [
  ['2023-03-15', a1],
  ['2024-05-09', a2],
  ['2025-04-24', a3]
];

export default function page(props: pageProps) {
  const [curr, setCurr] = useState<number>(0);
  const [api, setApi] = useState<CarouselApi>();
  //   const currYear = useMemo(() => {
  //     const date = new Date(images[curr][0]);
  //     return date;
  //   }, [curr]);
  useEffect(() => {
    if (!api) {
      return;
    }
    api.on('select', () => setCurr(api.selectedScrollSnap()));
    api.on('scroll', (e) => {
      console.log(e);
    });
  }, [api]);

  const scrollPrev = useCallback(() => {
    if (api) {
      api.scrollPrev();
    }
  }, [api]);

  const scrollNext = useCallback(() => {
    if (api) {
      api.scrollNext();
    }
  }, [api]);
  return (
    <>
      <div className="h-96 bg-stone-300 m-8 rounded-xl aspect-square"></div>
      <div className="relative h-svh w-full bg-black overflow-hidden">
        <div className="absolute top-4 left-4 text-white  z-5">
          <h1 className="text-shadow-lg md:text-xl tracking-wider leading-relaxed mb-1 text-balance">
            Selecione uma data para ver o impacto <br />
            da Braskem sobre a região:
          </h1>
          <div className="flex gap-5 flex-wrap ">
            {images.map((imgArr: [string, StaticImageData], index) => {
              const date = new Date(imgArr[0]);
              return (
                <button
                  key={imgArr[0]}
                  className={cn(
                    'opacity-100 cursor-pointer duration-150 text-left leading-none! text-3xl md:text-4xl font-black text-shadow-lg border-b-2 pb-1 text-[#29abe2] border-transparent',
                    curr === index &&
                      'opacity-100 border-b-2 border-white text-white'
                  )}
                  onClick={() => {
                    setCurr(index);
                    api?.scrollTo(index);
                  }}
                  onMouseEnter={() => {
                    setCurr(index);
                    api?.scrollTo(index);
                  }}
                >
                  <span className="text-sm uppercase font-medium">
                    {date.toLocaleDateString('pt-BR', {
                      month: 'long'
                    })}{' '}
                    DE
                  </span>
                  <br />
                  {date.toLocaleDateString('pt-BR', {
                    year: 'numeric'
                  })}
                </button>
              );
            })}
          </div>
          {/* 
        <p className="text-xs mt-8 font-medium text-white text-shadow">
          Fonte das Imagens:{' '}
          <Link
            className="hover:underline"
            target="_blank"
            href="https://livingatlas.arcgis.com/wayback/#mapCenter=-35.74615%2C-9.63341%2C15&mode=explore&active=27982"
          >
            Esri World Imagery Wayback
          </Link>
        </p> */}
        </div>
        <div className="absolute z-3 left-0 top-0 w-full h-full bg-linear-to-br from-black/80 via-transparent via-60% to-transparent mix-blend-hardlight pointer-events-none"></div>

        <Carousel
          setApi={setApi}
          plugins={[Fade()]}
          opts={{ loop: true }}
          className="w-full h-svh"
        >
          <CarouselContent className="w-full h-full ml-0">
            {images.map((imgArr: [string, StaticImageData], index) => {
              return (
                <CarouselItem
                  key={imgArr[0]}
                  className="relative left-0 top-0 w-full h-svh pl-0"
                >
                  <img
                    className="object-center object-cover w-full h-full "
                    src={imgArr[1].src}
                    alt={imgArr[0]}
                    width={1980}
                    height={1303}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
      </div>
      <div className="h-96 bg-stone-300 m-8 rounded-xl aspect-square"></div>
    </>
  );
}
