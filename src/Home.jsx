import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import WOW from 'wowjs';

import {
  About,
  Clients,
  Contact,
  Faq,
  Footer,
  Header,
  Hero,
  Pricing,
  Services,
  BlogC,
  Bootcamp,
} from "./components"; 


function Home() {  
  useEffect(() => {
    const wow = new WOW.WOW();
    wow.init(); 

    return () => {
      wow.sync();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>صفحه اصلی</title>
        <meta name="description" content="این صفحه اصلی وبسایت است." />
      </Helmet>

      <Header />
      <Hero />
      <Services />
      <About />
      <Bootcamp />
      <Pricing />
      <BlogC slice="3"/>
      <Faq />
      <Clients />
      <Contact />
      <Footer />

    </>
  );
  
}


export default Home;
