import AboutContent1 from "../assets/images/AboutContent1.png"
import AboutContent2 from "../assets/images/AbountContent2.png"
import AboutContent3 from "../assets/images/AboutContent3.png"
import HowWeWork from "../assets/images/how-we-work.png"
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
          <p>Swara Foundation was established with a mission to give back to society, focusing on areas where dreams are often shattered by poverty and the lack of access to education and healthcare. The foundation aims to nurture these dreams, empowering individuals to rise above their circumstances by harnessing their own skills and potential.</p>
          <p>Through our efforts, we aspire to create opportunities for growth and development, helping people build a better future for themselves and their communities.</p>
        </div>
        <Navbar />
        <ContentSection 
          id="our-story" 
          title="Our Story" 
          text="When a group of friends came together in the year of 2018, Swara Foundation was born, with the intention to giving back to the society especially in that areas where most of the dreams are destroyed due to poverty and lack of education facilities and health facilities, etc. Swara Foundation wants to give shapes to their dreams and help them to rise in the society with their own abilities and efficiencies." 
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
          imgSrc={HowWeWork}
          reverse
        />
      </div>
    </div>
  );
}
