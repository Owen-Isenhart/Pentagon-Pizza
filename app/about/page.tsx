'use client';

import { useAppStore } from '../store';
import NavBar from '../../components/NavBar';
import PizzaTicker from '../../components/PizzaTicker';

export default function AboutPage() {
  const tickerData = useAppStore((state) => state.tickerData);
  console.log(tickerData);

  return (
    <main className="overflow-x-hidden font-ibm bg-background text-foreground min-h-screen w-full pt-28 px-6">
      <NavBar />
      <PizzaTicker data={tickerData} />

      <div className="max-w-4xl mx-auto space-y-16 py-10">

        <section className="text-center">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">About Pentagon Pizza</h1>
          <p className="text-xl text-light-foreground max-w-2xl mx-auto">
            They track us, so we track 
            <span className="relative"> them
              <span className="absolute inset-0 rotate-12 border-t-2 border-red translate-y-3"></span>
              <span className="absolute inset-0 -rotate-12 border-t-2 border-red translate-x-1 translate-y-3"></span>
            </span> their pizzas.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">What is Pentagon Pizza?</h2>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <p className="text-lg text-light-foreground">
              Pentagon Pizza tracks how busy the pizza places near the Pentagon are. There's a popular "Pizza Index Theory" which claims that during significant global events, officials often work late on urgent matters and resort to ordering convenient food like pizza, leading to an increase in activity at local pizza resturants. Therefore, by identifying these spikes in resturant activity, crises can be anticipated before the news drops.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">How does it work?</h2>
          <p className="text-lg text-light-foreground">
            Using webscraping, we are able to view the pizza place's Google Business profile which contains their popular hours, which includes a live feed of their activity level.
            Then, we parse and compile that data and perform a simple calculation to give an overall "Threat Level" to determine if the Pentagon is up to something.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Historical Accuracy</h2>
          <p className="text-lg text-light-foreground">
            According to <span className='italic'>The Economic Times</span>, the <a className='underline' href='https://economictimes.indiatimes.com/news/international/global-trends/world-war-iii-ahead-pentagons-pizza-meter-has-accurately-predicted-21-crises-is-wwiii-next/articleshow/121832050.cms?from=mdr' target='_blank'>Pentagon's Pizza Index has accurately predicted 21 crises</a>.
            As for this website's accuracy, I couldn't tell you. I made this in a couple days because I was bored and did not implement a backend to track past data, so you're just gonna have to take my word for it that it's probably pretty accurate.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-4">Meet the Team (Me)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <a href='https://www.linkedin.com/in/owenisenhart/' target='_blank' className="hover:cursor-pointer hover:scale-102 transition-transform bg-light-background border-2 border-dashed border-outline p-4 rounded-xl shadow-md flex items-center gap-4 mb-4">
              <img
                src="/images/oxef.jpg"
                className="w-16 h-16 rounded-full border border-gray-700"
              />
              <div>
                <h3 className="text-xl font-medium">Owen Isenhart</h3>
                <p className="text-gray-400 text-sm">Founder / Developer</p>
              </div>
            </a>
          </div>
          <p className='text-lg mb-5'>If you're interested in contributing to this project, click on my profile card and send me a message.</p>
        </section>

      </div>
    </main>
  );
}
