import React from 'react';
import DonutChart from './DonutChart';
import dynamic from 'next/dynamic'; 

interface Location {
  name: string;
  lat: number;
  lng: number;
  status: string;
}

interface AnalyticsProps {
  statusCounts: {
    'very good': number;
    'good': number;
    'moderate': number;
    'bad': number;
    'very bad': number;
  };
  locations: Location[];
}

// honestly not too sure how this part works, kept running into issues and eventually asked AI and this is what it came up with
// Create a dynamically imported version of your MapComponent with SSR turned off.
// We also add a loading fallback for a better user experience.
const MapWithNoSSR = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <p className="text-center">A map is loading...</p>,
});

export default function Analytics({ statusCounts, locations }: AnalyticsProps) {
  return (
    <div className='flex flex-col border-2 border-dashed border-outline rounded-md bg-light-background p-6 text-foreground h-full'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
        <div className="flex flex-col">
            <h3 className="text-2xl text-start font-semibold mb-3">Status Distribution</h3>
            <DonutChart
                veryGood={statusCounts['very good']}
                good={statusCounts['good']}
                moderate={statusCounts['moderate']}
                bad={statusCounts['bad']}
                veryBad={statusCounts['very bad']}
            />
        </div>
        <div className="flex flex-col ml-4">
            <h3 className="text-2xl text-start font-semibold mb-3">Locations</h3>
            <div className="flex-grow z-10">
                <MapWithNoSSR locations={locations} />
            </div>
        </div>
      </div>
    </div>
  );
};