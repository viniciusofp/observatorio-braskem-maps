'use client';
import Compare from '@/components/compare';
import a1 from '@/public/satellite/2018-03-28.jpg';
import a2 from '@/public/satellite/2021-02-24.jpg';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeftRight,
  PanelRightOpen
} from 'lucide-react';
import { useRef, useState } from 'react';

export type CompareRemocaoProps = {};

export default function CompareRemocao(props: CompareRemocaoProps) {
  return (
    <Compare
      items={[
        { label: 'Março de 2018', img: a1 },
        { label: 'Fevereiro de 2021', img: a2 }
      ]}
    />
  );
}
