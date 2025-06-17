"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // formspree definitely was NOT the correct choice but i'm too lasy to find another solution, 
      // so instead we still use it but just connect it to discord with webhooks and use a discord bot 
      // to collect emails and then we still have to manually alert the emails but it's better than nothing.
      // also this is a joke of a website nothing even matters
      const response = await fetch("https://formspree.io/f/mnnvvkza", { 
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <>
      <nav className='w-full fixed top-2 left-0 right-0 z-[60] mt-11 bg-transparent text-foreground items-center justify-center'>
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center font-bold text-xl">
                <img src="/images/logo.png" alt="Pentagon Pizza Logo" className="w-14 h-14 mr-2 drop-shadow-[0px_0px_10px_#006F72]" />
              </Link>
            </div>

            <div>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-foreground"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 w-full h-2/5 bg-background z-[50] transition-transform duration-500 ease-in-out
                   flex justify-center items-center
                   ${isOpen ? 'transform translate-y-0 shadow-md shadow-background' : 'transform -translate-y-full'}`}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="w-full flex justify-around items-center">
            <Link href="/" className="sprite-wrapper-bubble mt-40">
              <div className="sprite-player sprite-player-bubble sprite-home"></div>
            </Link>

            <Link href="/about" className="sprite-wrapper-bubble -mt-10">
              <div className="sprite-player sprite-player-bubble sprite-about"></div>
            </Link>

            <div className="sprite-wrapper-bubble mt-40">
              <button onClick={() => setShowModal(true)}>
                <div className="sprite-player sprite-player-bubble sprite-notify"></div>
              </button>
            </div>
          </div>

          <div className="sprite-wrapper-character -mt-40">
            <div className="sprite-player sprite-player-character"></div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center backdrop-blur-md bg-foreground/10">
          <div className="bg-foreground text-background p-8 rounded-md shadow-2xl shadow-light-foreground/60 max-w-sm w-full relative animate-fadeIn">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-red hover:font-semibold hover:cursor-pointer"
            >
              ✕
            </button>

            {!submitted ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Get Notified</h2>
                <p className="mb-4 text-sm text-light-background">
                  Enter your email and we'll let you know when the storm is rolling in.
                </p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-2 border rounded-md mb-4"
                  />
                  <button
                    type="submit"
                    className="w-full bg-background text-foreground py-2 rounded-md hover:bg-light-background hover:cursor-pointer"
                  >
                    Notify Me
                  </button>
                </form>
                {/* #GDPRcompliant */}
                <p className='text-light-background text-xs mt-2'>By submitting, you agree to recieve email alerts from us.</p>
              </>
            ) : (
              <div className="flex flex-col text-center animate-fadeIn items-center justify-center">
                <img src="/images/logo.png" alt="Pentagon Pizza Logo" className="center w-14 h-14 mb-7 mt-5 drop-shadow-[0px_0px_10px_#006F72]" />
                <h2 className="text-xl font-semibold mb-2">You're Prepared!</h2>
                <p className="text-sm text-gray-700 mx-5 mb-4">We hope you won't have to hear from us, but if you do, at least you're ready.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
