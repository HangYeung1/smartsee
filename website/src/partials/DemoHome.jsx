import React, { useState } from 'react';
import Modal from '../utils/Modal';

import HeroImage from '../images/demo-image.png';

function HeroHome() {

  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="relative">

      

      {/* Illustration behind hero content */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none" aria-hidden="true">
        <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

     
          
      

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
       

        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-16 md:pb-20">

           {/* Section header */}
        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-10 pt-20" >
                <h1 className="h1">Just take a picture of a logo using your webcam!</h1>
                </div>
          {/* Hero image */}
          <div>
            <div className="relative flex justify-center mb-8" data-aos="zoom-y-out" data-aos-delay="450">
              <div className="flex flex-col justify-center">
                <img className="mx-auto" src={HeroImage} width="768" height="432" alt="Hero" />
              </div>
              <button className="absolute top-full flex items-center transform -translate-y-1/2 bg-white rounded-full font-medium group p-4 shadow-lg" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVideoModalOpen(true); }} aria-controls="modal">

                <span className="ml-3 mr-3">Take picture</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default HeroHome;