import React from 'react';
import Header from '../partials/Header';
import DemoHome from '../partials/DemoHome';
import FeaturesBlocks from '../partials/FeaturesBlocks';


function SignIn() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
      <DemoHome />

      </main>


    </div>
  );
}

export default SignIn;