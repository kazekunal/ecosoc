import { Contact } from 'lucide-react'
import React from 'react'
import ContactUs from '../components/contact'
import Footer from '../components/footer'
import Navbar from '../components/navbar'

function page() {
  return (
    <div>
        <Navbar/>
        <ContactUs/>
        <Footer/>
    </div>
  )
}

export default page