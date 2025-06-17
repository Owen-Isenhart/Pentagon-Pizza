import React from 'react';
import { Triangle, Minus } from 'lucide-react';
import Chart from './Chart';

interface CardProps {
  name: string;
  distance: number;
  status: string;
  link: string;
}

export default function Card(props: CardProps) {
  return (
    <a
      href={props.link}
      target='_blank'
      className='flex flex-row items-center justify-between border-2 border-dashed border-outline rounded-md bg-light-background p-4 text-foreground w-[40vw] lg:w-[30vw]'
    >
      <div className='flex flex-col gap-1'>
        <div className='flex flex-row space-x-4'>
          <h1 className='text-xl font-bold'>{props.name}</h1>
          {props.status === 'very good' && <Triangle className='text-green fill-green w-3 rotate-180' />}
          {props.status === 'good' && <Triangle className='text-green fill-green w-3 rotate-180' />}
          {props.status === 'moderate' && <Minus className='text-yellow stroke-6 w-3' />}
          {props.status === 'bad' && <Triangle className='text-red fill-red w-3' />}
          {props.status === 'very bad' && <Triangle className='text-red fill-red w-3' />}
        </div>
        
        <p className='text-light-foreground'>{props.distance} mi</p>
      </div>
      <div className='flex items-center gap-4'>
        <div className='w-24 h-14'>
           <Chart status={props.status} />
        </div>
      </div>
    </a>
  );
}