'use client';
import Compare, { CompareItem } from '@/components/compare';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useState } from 'react';

import ibirapuera from '@/public/comparacao/ibirapuera.jpg';
import maceio from '@/public/comparacao/maceio.jpg';
import bh from '@/public/comparacao/bh.jpg';
import copacabana from '@/public/comparacao/copacabana.jpg';
import floripa from '@/public/comparacao/floripa.jpg';
import manaus from '@/public/comparacao/manaus.jpg';
import poa from '@/public/comparacao/poa.jpg';
import salvador from '@/public/comparacao/salvador.jpg';
import saoluis from '@/public/comparacao/saoluis.jpg';
import unb from '@/public/comparacao/unb.jpg';

export type ComparePageProps = {};

const options = [
  { label: 'Parque do Ibirapuera - São Paulo/SP', img: ibirapuera },
  { label: 'Centro - Manaus/MA', img: manaus },
  { label: 'Pelourinho - Salvador/BA', img: salvador },
  { label: 'UNB - Brasília/DF', img: unb },
  { label: 'Centro - Belo Horizonte/BH', img: bh },
  { label: 'Centro - São Luis/MA', img: saoluis },
  { label: 'Copacabana - Rio de Janeiro/RJ', img: copacabana },
  { label: 'Centro - Porto Alegre/RS', img: poa },
  { label: 'Centro - Florianópolis/SC', img: floripa }
];

export default function ComparePage(props: ComparePageProps) {
  const [curr, setCurr] = useState<number>(0);
  return (
    <div>
      <div className="max-w-3xl mx-auto grid gap-2 py-4">
        <p className="font-medium text-sm">Selecione um local para comparar:</p>
        <Select
          value={curr.toString()}
          onValueChange={(v) => setCurr(parseInt(v))}
        >
          <SelectTrigger className="w-full max-w-96">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map((opt, index) => {
                return (
                  <SelectItem key={opt.label + index} value={index.toString()}>
                    {opt.label}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Compare
        items={[
          options[curr],
          { label: 'Áreas afetadas (04/2025) - Maceió/AL', img: maceio }
        ]}
        ratio="aspect-5/3"
        width="max-w-3xl"
      />
    </div>
  );
}
