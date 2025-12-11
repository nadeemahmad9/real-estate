import { Helmet } from "react-helmet"
import Hero from "../components/Hero"
import PopularCities from "../components/PopularCities"
import TrendingProjects from "../components/TrendingProjects"
import Testimonials from "../components/Testimonials"
import Footer from "../components/Footer"
import Assistant from "../components/Assistant"
import Links from "../components/Links"
import Blog from "./Blog"

const Home = () => {
  return (
    <>
      <Helmet>
        <title>InvestoXpert - Find Your Dream Property in India</title>
        <meta
          name="description"
          content="Discover thousands of verified properties for sale and rent across major Indian cities. Get expert assistance, loan support, and more at InvestoXpert."
        />
        <meta
          name="keywords"
          content="real estate, property buy, property rent, homes for sale, apartments, villas, residential property, commercial property, India"
        />
        <meta property="og:title" content="InvestoXpert - Find Your Dream Property in India" />
        <meta property="og:description" content="Discover your dream property across major Indian cities" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://investoxpert.netlify.app/" />
      </Helmet>
      <Hero />
      <PopularCities />
      <TrendingProjects />
      <Assistant />
      <Testimonials />
      <Blog />
      <Links />
      <Footer />
    </>
  )
}

export default Home
