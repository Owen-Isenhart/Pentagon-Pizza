
# Pentagon Pizza

*They track us, so we track their pizza*

---

## Website Demo

[![Watch the project demo](https://i.ytimg.com/vi/4N528p4Y6-c/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGEAgZShJMA8=&amp;rs=AOn4CLDU06cX0KASoe_nZRdi7fgXWzMS6g)](https://youtu.be/4N528p4Y6-c?si=98oDxe8Q_R9CAnlq)

## About The Project

Pentagon Pizza is based on a real-world theory: a spike in late-night pizza orders at the Pentagon often precedes a major global crisis. This application automates the monitoring process, providing an early warning system for significant geopolitical events.

By scraping data from pizza establishments in close proximity to the Pentagon, our system analyzes activity levels in real-time. When these levels cross a pre-defined threshold, a "High Threat Level" is triggered, and an alert is immediately sent out.

### Key Features

* **Real-Time Web Scraping:** Utilizes Scrapingdog's Google SERP API to grab the html of resturant's google business profile which is then parsed through to determine how busy they are.
* **Threat Level Analysis:** Compiles how busy the nearest pizza places are and determines the threat level using a weighted algorithm.
* **Email Notifications:** Users can enter their email to get notified of high threat levels. Their email is sent to formspree which triggers a webhook connected to a discord server, and then a discord bot can then email all users alerts. (the script is not in this repo)

## How to Run

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository and install dependencies:

```
git clone https://github.com/Owen-Isenhart/Pentagon-Pizza.git
cd Pentagon-Pizza
npm install
```

### Running Locally

```
npm run dev
```

### Building for Production

```
npm run build
npm start
```

---

## API & External Services

### Web Scraping API (Scrapingdog)

To enable the web scraping feature, you will need to:

1. Create an account at [ScrapingDog](https://www.scrapingdog.com/)
2. Get your API key
3. Replace the array of keys in the API route with your own key

---

## Notifications System (Optional)

The notifications feature **will not work by default**. To enable it, you will need to:

- Set up a [Formspree](https://formspree.io/) account and form and replace the current url with your own
- Create a webhook integration with your own Discord server
- Set up and host a custom Discord bot to forward notifications

(or just come up with your own way to do it)

These parts are completely separate from the main project so they were left out of the repo. sorry lol

---