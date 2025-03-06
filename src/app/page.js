import Navbar from "./components/navbar";
import HeroSection from "./components/hero";
import Header from "./components/header";
import Hero from "./components/hero_3";
import Speakers from "./components/speaker";
import Experience from "./components/experience";
import Schedule from "./components/schedule";
import Tickets from "./components/tickets";
import Footer from "./components/footer";
// import Home from "./components/pag";

export default function Home() {
  return (
    <div>
      <Navbar/>
      {/* <Header/> */}
      <Hero/>
      <Speakers/>
      <Experience/>
      <Schedule/>
      <Tickets/>
      <Footer/>
    </div>
  );
}
