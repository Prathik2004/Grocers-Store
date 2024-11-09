import React from 'react'
import { InstagramEmbed } from 'react-social-media-embed'
import '../Pages/AboutUs.css'
import Navbar from '../Components/Navbar'

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <InstagramEmbed url='https://www.instagram.com/themarketgrocery' width={323} />
    </div>
  )
}

export default AboutUs