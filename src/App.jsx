import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import CustomCursor from './components/CustomCursor/CustomCursor'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import Team from './pages/Team'
import Gallery from './pages/Gallery'
import Stories from './pages/Stories'
import Sponsors from './pages/Sponsors'
import Contact from './pages/Contact'

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// Wrapper component for page transitions
const PageWrapper = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {children}
  </motion.div>
)

function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/events" element={<PageWrapper><Events /></PageWrapper>} />
            <Route path="/team" element={<PageWrapper><Team /></PageWrapper>} />
            <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
            <Route path="/stories" element={<PageWrapper><Stories /></PageWrapper>} />
            <Route path="/sponsors" element={<PageWrapper><Sponsors /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
      {/* Home has its own FooterCTA, other pages use standard Footer */}
      <Footer />
    </>
  )
}

export default App
