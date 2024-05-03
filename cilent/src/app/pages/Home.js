import React from 'react'
import Hero from '../components/Hero';
import RestroCard from '../components/RestroCard';
import FoodCard from '../components/FoodCard';
import TopBrand from '../components/TopBrandSlider';
import Footer from './Footer';
import FoodCardHover from '../components/FoodCardHover';
import BottomLead from '../components/BottomLead';
export default function Home() {
  const data = {
    hero: {
      appType: 'Food Delivery',
      tagLine: 'Why stay hungry when you can order from DeliveryPoint.',
      description: 'Download the DeliveryPoint food app now on',
      mainActionText: 'Playstore',
      extraActionText: 'App Store',
    },
    bottomLead: {
      actionText: 'Download the app now.',
      description: 'Available on your favourite Food. Start your premium experience now.',
      mainActionText: 'Playstore',
      extraActionText: 'App Store',
    },
  }

  return (
    <>
      <Hero
        appType={data.hero.appType}
        tagLine={data.hero.tagLine}
        description={data.hero.description}
        mainActionText={data.hero.mainActionText}
        extraActionText={data.hero.extraActionText}
      />
      <div className='bg-gray-200'>
        <TopBrand />
      </div>
      <div className='bg-gray-100'>
        <FoodCard />
      </div>
      <div className="bg-gray-200">
        <FoodCardHover />
      </div>
      <div className="bg-gray-100">
        <RestroCard />
      </div>
      <BottomLead
        actionText={data.bottomLead.actionText}
        description={data.bottomLead.description}
        mainActionText={data.bottomLead.mainActionText}
        extraActionText={data.bottomLead.extraActionText}
      />
    </>
  )
}
