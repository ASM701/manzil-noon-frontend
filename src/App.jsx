import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import StoryBanner from './components/StoryBanner'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import ProductDetailPage from './pages/ProductDetailPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import WishlistPage from './pages/WishlistPage'

function HomePage() {
  return (
    <>
      <Hero />
      <ProductGrid />
      <StoryBanner />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <WishlistProvider>
        <CartProvider>
          <Navbar />
          <CartSidebar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
          <Footer />
        </CartProvider>
      </WishlistProvider>
    </BrowserRouter>
  )
}