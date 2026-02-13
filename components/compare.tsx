'use client';

import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeftRight,
  PanelRightOpen
} from 'lucide-react';
import { StaticImageData } from 'next/image';
import { useRef, useState } from 'react';

export type CompareItem = {
  label: string;
  img: StaticImageData | null;
};

export type CompareProps = {
  items: [CompareItem, CompareItem];
  width?: string;
  ratio?: string;
};

export default function Compare({ items, width, ratio }: CompareProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [x, setX] = useState();
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(50);
  const updatePosition = (clientX: number) => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const percentage = ((clientX - rect.left) / rect.width) * 100;

    setProgress(Math.min(95, Math.max(5, percentage)));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    // if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };
  return (
    <div className="px-4">
      <div
        className={cn(
          ' mx-auto! w-full flex justify-between text-xs sm:text-sm lg:text-base m-3 uppercase font-medium',
          width
        )}
      >
        <p className="flex items-center gap-1">
          <ChevronLeft className="size-4 lg:size-5" />
          {items[0].label}
        </p>
        <p className="flex items-center gap-1">
          {items[1].label}
          <ChevronRight className="size-5" />
        </p>
      </div>
      <div
        ref={wrapperRef}
        className={cn(
          'touch-pan-y rounded-xl bg-slate-200 aspect-4/3 w-full max-w-4xl mx-auto relative cursor-grab',
          width,
          ratio
        )}
        onPointerMove={handlePointerMove}
        onMouseMove={(e) => handlePointerMove(e as any)}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div
          className="z-3 absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg border size-8 flex items-center justify-center"
          style={{ left: progress + '%' }}
          onPointerDown={handlePointerDown}
        >
          <ChevronsLeftRight className="size-5 text-muted-foreground" />
        </div>
        <div
          className="z-2 absolute top-0 -translate-x-1/2 h-full w-px bg-white/50"
          style={{ left: progress + '%' }}
        ></div>
        <div
          className="z-2 absolute top-0 left-0 h-full w-full bg-center bg-cover"
          style={{
            backgroundImage: `url(${items[0].img?.src})`,
            clipPath: `polygon(0 0, ${progress}% 0, ${progress}% 100%, 0 100%)`
          }}
        ></div>
        <div
          className="absolute top-0 right-0 h-full w-full bg-center bg-cover"
          style={{ backgroundImage: `url(${items[1].img?.src})` }}
        ></div>
      </div>
    </div>
  );
}
