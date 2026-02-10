'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import a1 from '@/public/satellite/2023-03-15.jpg';
import a2 from '@/public/satellite/2024-05-09.jpg';
import a3 from '@/public/satellite/2025-04-24.jpg';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export type pageProps = {};

const images: [string, StaticImageData][] = [
  ['2023-03-15', a1],
  ['2024-05-09', a2],
  ['2025-04-24', a3]
];

export default function page(props: pageProps) {
  const [curr, setCurr] = useState<number>(0);
  const currYear = useMemo(() => {
    const date = new Date(images[curr][0]);
    return date;
  }, [curr]);
  return (
    <div className="relative h-svh w-full">
      <div className="absolute bottom-4 left-4 text-white  z-2">
        <h1 className="text-shadow-lg font-medium text-balance">
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
                  'opacity-40 cursor-pointer duration-150 text-left leading-none text-4xl font-black text-shadow-lg border-b-2 pb-1 text-amber-300 border-transparent',
                  curr === index && 'opacity-100 border-b-2 border-amber-300'
                )}
                onClick={() => setCurr(index)}
                onMouseEnter={() => setCurr(index)}
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

        <p className="text-xs mt-8 font-medium text-white text-shadow">
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
      <div className="absolute z-1 left-0 top-0 w-full h-full bg-linear-to-tr from-black/70 to-transparent mix-blend-hardlight"></div>

      <img
        className="object-center object-cover w-full h-full"
        src={images[curr][1].src}
        alt={images[curr][0]}
        width={1980}
        height={1303}
      />
    </div>
  );
}
