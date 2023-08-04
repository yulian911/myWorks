'use client';
import React from 'react';
import CountUp from 'react-countup';

type Props = {
  start: number;
  end: number;
  duration: number;
};

const Counter = ({ start, end, duration }: Props) => {
  return (
    <div className="mb-2 text-sm font-extrabold xl:text-md text-red-600">
      <CountUp start={0} end={10214} duration={5} />
    </div>
  );
};

export default Counter;
