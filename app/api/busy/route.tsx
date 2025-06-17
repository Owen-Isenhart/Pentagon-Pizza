// currently load-balancing calls with api keys (kinda) and if they fail it cycles through to the next
// i have no clue how long these will last, probably like a day lmao
// they would last longer if I was going to make a backend but I will not be doing that

import { NextResponse } from 'next/server';
import axios from 'axios';
import { JSDOM } from 'jsdom';

/* 
  I DON'T CARE THAT I'M PUBLISHING THESE, THEY WERE ALL MADE FROM
  TEMPORARY EMAILS FROM GUERRILLAMAIL SO I COULD ABUSE THE FREE TRIAL

  THEY'RE ALSO PROBABLY ALL OUT OF CREDITS AT THIS POINT TOO
*/

const API_KEYS = [
  '684f55aaad02f24fa559eca9',
  '684f566cc0fc584c3eef0027',
  '684f56ff8068dc52ec0e6433',
  '684f576072cca5b13f7c1547',
  '684f5790c67411a9e8057da8',
  '684f57c048dc06342515628a',
  '684f58347dafd7b86af40533',
  '684f58a9404a9074a19c5720',
];

let keyIndex = 0;

export async function POST(request: Request) {
  const body = await request.json();
  const searchQuery = body.query;

  for (let i = 0; i < API_KEYS.length; i++) {
    const currentIndex = (keyIndex + i) % API_KEYS.length;
    const currentKey = API_KEYS[currentIndex];

    console.log(`Attempting request with key at index ${currentIndex}: ${currentKey}`);

    const params = {
      api_key: currentKey,
      query: searchQuery,
      results: '10',
      country: 'us',
      page: '0',
      advance_search: 'true',
      ai_overview: 'false',
      html: 'true',
    };

    try {
      const response = await axios.get('https://api.scrapingdog.com/google/', { params });
      keyIndex = (currentIndex + 1) % API_KEYS.length;
      console.log(`Success! Next request will start with key at index: ${keyIndex}`);
      
      const dom = new JSDOM(response.data);
      const document = dom.window.document;

      const busyText = document.querySelector('.i6w5N')?.textContent?.split(': ')[1];
      console.log(busyText);

      return NextResponse.json({ busyText: busyText });

    } catch (error: any) {
      const status = error.response?.status;
      const errorDetails = error.response?.data || error.message;

      if (status === 401 || status === 403) {
        console.warn(`Key at index ${currentIndex} failed with status ${status}. Trying next key.`);
        continue;
      }

      console.error(`A non-permission error occurred: ${status}`, errorDetails);
      return NextResponse.json(
        { error: 'ScrapingDog API error', details: errorDetails },
        { status: status || 500 }
      );
    }
  }

  console.error('All API keys failed.');
  return NextResponse.json(
    { error: 'All available API keys failed or have insufficient permissions.' },
    { status: 500 }
  );
}