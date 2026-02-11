'use client';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import a1 from '@/public/satellite/2023-03-15.jpg';
import a2 from '@/public/satellite/2024-05-09.jpg';
import a3 from '@/public/satellite/2025-04-24.jpg';
import Fade from 'embla-carousel-fade';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export type pageProps = {};

const images: [string, StaticImageData][] = [
  ['2023-03-15', a1],
  ['2024-05-09', a2],
  ['2025-04-24', a3]
];

export default function page(props: pageProps) {
  const [curr, setCurr] = useState<number>(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }
    api.on('select', () => setCurr(api.selectedScrollSnap()));
    api.on('scroll', (e) => {
      console.log(e);
    });
  }, [api]);

  return (
    <div className="max-w-5xl w-full mx-auto px-4">
      <div className="pb-4">
        <div className="flex gap-5 flex-wrap ">
          {images.map((imgArr: [string, StaticImageData], index) => {
            const date = new Date(imgArr[0]);
            return (
              <button
                key={imgArr[0]}
                className={cn(
                  'opacity-100 cursor-pointer duration-150 text-left leading-none! text-3xl md:text-4xl font-black  text-black/30 border-transparent',
                  curr === index && 'opacity-100 text-black'
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
      </div>

      <div className="relative aspect-square max-h-[80svh] h-full w-full bg-black overflow-hidden">
        <Carousel
          setApi={setApi}
          plugins={[Fade()]}
          opts={{ loop: true }}
          className="w-full aspect-square"
        >
          <CarouselContent className="w-full h-full max-h-[80svh] ml-0">
            {images.map((imgArr: [string, StaticImageData], index) => {
              return (
                <CarouselItem
                  key={imgArr[0]}
                  className="relative left-0 top-0 w-full aspect-square max-h-[80svh] pl-0"
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

      <p className="text-xs py-2 font-medium">
        Fonte das Imagens:{' '}
        <Link
          className="hover:underline"
          target="_blank"
          href="https://livingatlas.arcgis.com/wayback/#mapCenter=-35.74615%2C-9.63341%2C15&mode=explore&active=27982"
        >
          Esri World Imagery Wayback
        </Link>
      </p>
    </div>
  );
}
