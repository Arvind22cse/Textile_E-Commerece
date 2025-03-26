import React from "react";
import Carousel from "./Carousel";
import AboutUs from "./AboutUs";
import Products from "./ProductGrid";
import Features from "./Features";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <section id="home">
        <Carousel />
      </section>
      <section id="products">
        <Products />
      </section>
      <section id="about">
        <AboutUs />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
};

export default Home;