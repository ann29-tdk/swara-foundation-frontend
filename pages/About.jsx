import AboutContent1 from "../assets/images/AboutContent1.png"
import AboutContent2 from "../assets/images/AbountContent2.png"
import AboutContent3 from "../assets/images/AboutContent3.png"

import React from 'react';
import OverlaySection from '../components/About-Us/OverlaySection';
import Navbar from '../components/About-Us/Navbar';
import ContentSection from '../components/About-Us/ContentSection';

export default function About() {
  return (
    <div>
      <OverlaySection />
      <div className="container mt-5">
        <div className="mb-5 text-center">
          <p>Smile Foundation was initiated in 2002 when a group of friends came together with the intention of giving back to the society. They were inspired by the thought and philosophy of Peter Senge, the founder of the Society for Organizational Learning who has propagated that “sustainability, social equality and the environment are now business problems…” and corporate leaders can’t expect governments to solve them alone.</p>
          <p>What triggered these thoughts was the liberalisation of the Indian economy in the 1990’s which brought with it immense opportunities. Business revived, and India became not just a market, but also an investment prospect for the developed world. Disposable incomes and early settlements became a living reality for the working middle-class. For the first time in India, professionals could think beyond making a living, and contribute towards the society.</p>
        </div>
        <Navbar />
        <ContentSection 
          id="our-story" 
          title="Our Story" 
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum." 
          imgSrc={AboutContent1}
        />
        <ContentSection 
          id="vision" 
          title="Vision" 
          text="To create a sustainable and inclusive society where every individual, especially children, has access to essential resources, education, and a safe environment, enabling them to lead fulfilling lives and contribute positively to their communities." 
          imgSrc={AboutContent2}
          reverse
        />
        <ContentSection 
          id="mission" 
          title="Mission" 
          text="Swara Foundation is dedicated to empowering underprivileged communities through various initiatives, including providing educational supplies, organizing tree-planting events (Vriksharopan) to promote environmental sustainability, and conducting programs to support and uplift community members. By focusing on these areas, we aim to make a meaningful impact and build a stronger, more resilient community." 
          imgSrc={AboutContent3}
        />
        <ContentSection 
          id="how-we-work" 
          title="How We Work" 
          text="Donating to the Swara Foundation is simple. You can participate in our donation camps or use the Donation section on our website. List your items and choose a convenient pick-up time, and our partner will collect them from your location. Your support helps us significantly impact the lives of underprivileged children, providing them with essential resources for a brighter future." 
          imgSrc="https://via.placeholder.com/500" 
          reverse
        />
      </div>
    </div>
  );
}
