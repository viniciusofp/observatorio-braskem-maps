'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import a1 from '@/public/satellite/2023-03-15.jpg';
import a2 from '@/public/satellite/2024-05-09.jpg';
import a3 from '@/public/satellite/2025-04-24.jpg';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export type pageProps = {};

const images: [string, StaticImageData][] = [
  ['2023-03-15', a1],
  ['2024-05-09', a2],
  ['2025-04-24', a3]
];

export default function page(props: pageProps) {
  const [curr, setCurr] = useState<number>(0);
  return (
    <div className="relative h-svh w-full">
      <div className="absolute bottom-3 left-3 text-xs  font-medium text-white shadow">
        Fonte das Imagens:{' '}
        <Link
          className="hover:underline"
          href="https://livingatlas.arcgis.com/wayback/#mapCenter=-35.74615%2C-9.63341%2C15&mode=explore&active=27982"
        >
          Esri World Imagery Wayback
        </Link>
      </div>
      <div className="absolute w-full left-0 top-0 grid justify-center bg-black/50 p-4 gap-3 0 z-2">
        <h1 className="text-white shadow-xl lg:text-lg font-medium text-balance">
          Selecione uma data para ver o impacto da Braskem sobre a região:
        </h1>
        <div className="flex gap-3 justify-center">
          {images.map((imgArr: [string, StaticImageData], index) => {
            const date = new Date(imgArr[0]);
            return (
              <div key={imgArr[0]}>
                <Button
                  size={'lg'}
                  variant={'secondary'}
                  onClick={() => setCurr(index)}
                  onMouseEnter={() => setCurr(index)}
                  className={cn(
                    'uppercase font-medium',
                    curr === index && 'bg-amber-400!'
                  )}
                >
                  {date.toLocaleDateString('pt-BR', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
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
