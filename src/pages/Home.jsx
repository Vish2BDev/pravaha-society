import Hero from '../components/Hero/Hero'
import AboutPreview from '../components/About/AboutPreview'
import Achievements from '../components/Achievements/Achievements'
import GalleryPreview from '../components/Gallery/GalleryPreview'
import Testimonials from '../components/Testimonials/Testimonials'


const Home = () => {
    return (
        <main className="home">
            <Hero />
            <AboutPreview />
            <Achievements />
            <GalleryPreview />
            <Testimonials />

        </main>
    )
}

export default Home
