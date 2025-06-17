"use client";
import { useState, useEffect, useMemo } from 'react';
import NavBar from '../components/NavBar';
import Card from '../components/Card';
import Analytics from '../components/Analytics';
import Conclusion from '../components/Conclusion';
import PizzaTicker from '../components/PizzaTicker';
import { useAppStore } from './store';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export default function Home() {
  const initialPizzaPlaces = [
    { name: 'Extreme Pizza', address: '1419 S Fern St, Arlington, VA 22202', distance: 0.8, status: 'very good', link: 'https://maps.app.goo.gl/7mjHJ9iroEAhEFEr8', lat: 38.860253, lng: -77.056076 },
    { name: 'California Pizza', address: '1201 S Hayes St Suite F, Arlington, VA 22202', distance: 0.8, status: 'good', link: 'https://maps.app.goo.gl/19Fcz4a78xd6DGLP8', lat: 38.861914, lng: -77.058810 },
    { name: 'District Pizza Palace', address: '2325 S Eads St, Arlington, VA 22202', distance: 1.8, status: 'moderate', link: 'https://maps.app.goo.gl/6u6fyBCtf7AQ1okx9', lat: 38.852702, lng: -77.053210 },
    { name: 'We, The Pizza', address: '2100 Crystal Dr, Arlington, VA 22202', distance: 1.8, status: 'bad', link: 'https://maps.app.goo.gl/68R7tp3sTS6rTHtr9', lat: 38.855389, lng: -77.049797 },
    { name: 'Domino\'s Pizza', address: '2617 Columbia Pike, Arlington, VA 22204', distance: 2.4, status: 'very bad', link: 'https://maps.app.goo.gl/ziknKBA15kxJSHTPA', lat: 38.863134, lng: -77.085914 },
    { name: 'Papa John\'s Pizza', address: '2413 Columbia Pike, Arlington, VA 22204', distance: 6.5, status: 'moderate', link: 'https://maps.app.goo.gl/C3iKnudENYdjWhkB8', lat: 38.8635196, lng: -77.0840069 }
  ];

  const [pizzaData, setPizzaData] = useState(initialPizzaPlaces);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const setTickerData = useAppStore((state) => state.setTickerData);

  useEffect(() => {
    const fetchWithRetry = async (pizza: typeof initialPizzaPlaces[0], retries = 1) => {
      try {
        const res = await fetch('/api/busy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: `${pizza.name} ${pizza.address}` }),
        });

        if (!res.ok) {
          // if we get a rate limited, try it again
          if (res.status === 429 && retries > 0) {
            console.warn(`Rate limit hit for ${pizza.name}. Retrying...`);
            throw new Error('Rate Limited');
          }
          // for other errors, just fail
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return { ...pizza, status: data.busyText };
      } catch (err: any) {
        if (err.message === 'Rate Limited' && retries > 0) {
          await delay(2000); 
          return fetchWithRetry(pizza, retries - 1); // recursive call with one less retry
        }
        // if out of retries or it's another error, fail permanently for this pizza
        console.error(`Failed to fetch status for ${pizza.name} after retries.`);
        return { ...pizza, status: 'Error' };
      }
    };

    const fetchAllStatuses = async () => {
      setIsLoading(true);
      setError('');
      setPizzaData(initialPizzaPlaces.map(p => ({ ...p, status: 'Loading...' })));
      const promises = initialPizzaPlaces.map(pizza => fetchWithRetry(pizza));
      const results = await Promise.allSettled(promises);
      const finalData = results.map((result, index) => {
        if (result.status === 'fulfilled') {
          return result.value; // The successful result from fetchWithRetry
        }

        console.error(`Unexpected error for ${initialPizzaPlaces[index].name}:`, result.reason);
        return { ...initialPizzaPlaces[index], status: 'Error' };
      });

      setPizzaData(finalData);
      setIsLoading(false);
    };

    fetchAllStatuses();
  }, []);

  const interpretStatus = (status: string | undefined) => {
    if (status === undefined)
      return 'good';

    // will default start with usually if not extremely busy which is good, but will also sometimes throw in a usually if it's super busy
    status = status.toLowerCase().split('usually')[0];

    switch (status.toLowerCase()) {
      case 'as busy as it gets':
        return 'very bad';
      case 'busier than usual':
        return 'bad';
      case 'a little busy':
        return 'moderate';
      case 'less busy than usual':
        return 'good';
      case 'not busy':
        return 'very good';
    }

    return 'good';
  }

  const statusCounts = useMemo(() => { // used for donut chart
    const counts = {
      'very good': 0,
      'good': 0,
      'moderate': 0,
      'bad': 0,
      'very bad': 0,
    };
    pizzaData.forEach(pizza => {
      const interpretedStatus = interpretStatus(pizza.status);

      if (interpretedStatus in counts) {
        counts[interpretedStatus as keyof typeof counts]++;
      }
    });
    return counts;
  }, [pizzaData]); 

  const threatLevel: number = useMemo(() => { // used for threat level
    const counts = {
      'very good': 0,
      'good': 0,
      'moderate': 0,
      'bad': 0,
      'very bad': 0,
    };
    pizzaData.forEach(pizza => {
      const interpretedStatus = interpretStatus(pizza.status);

      if (interpretedStatus in counts) {
        counts[interpretedStatus as keyof typeof counts]++;
      }
    });
    const value = (counts['very good'] * -1) + (counts['good'] * 0) + (counts['moderate'] * 1) + (counts['bad'] * 2) + (counts['very bad'] * 3); // just simple calculation that weights the counts, min=-6, max=18
    return value;
  }, [pizzaData]); 

  const tickerPizzaData = useMemo(() => {
    return pizzaData.map(pizza => ({
      ...pizza,
      status: interpretStatus(pizza.status),
    }));
    
  }, [pizzaData]);

  useEffect(() => {
  const interpreted = pizzaData.map(pizza => ({
    ...pizza,
    status: interpretStatus(pizza.status),
  }));
  setTickerData(interpreted);
}, [pizzaData]);

  return (
    <main className='font-ibm flex flex-col h-screen w-screen items-center justify-center bg-background'>
      <PizzaTicker data={tickerPizzaData} />
      <NavBar />
      <div className='grid grid-cols-2 lg:grid-cols-3 p-6 gap-3'>
        {isLoading && <p>Loading pizza statuses...</p>}
        {error && <p>Error: {error}</p>}
        {pizzaData.map((pizza, index) => (
          <Card key={index} name={pizza.name} distance={pizza.distance} status={interpretStatus(pizza.status)} link={pizza.link} />
        ))}

        <div className='md:col-span-2 z-6'>
          <Analytics statusCounts={statusCounts} locations={pizzaData.map(pizza => { return { ...pizza, status: interpretStatus(pizza.status) } })} />
        </div>

        <div className='md:col-span-2 lg:col-span-1'>
          <Conclusion value={threatLevel}/>
        </div>

      </div>

    </main>
  );
}