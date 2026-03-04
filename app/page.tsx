'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  category: string;
  images: string[];
  colors: string[];
  sizes: string[];
  price: string;
}

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

const products: Product[] = [
  { id: 1, name: 'Lining printed', category: 'tshirt', images: ['/sh1.jpeg', '/sh2.jpeg', '/sh3.jpeg'], colors: ['Green', 'Black', 'White'], sizes: ['S','M','L','XL'], price: '1200' },
  { id: 2, name: 'Tracksuit', category: 'fulldress', images: ['/full1.jpeg', '/full2.jpeg'], colors: ['Black', 'Brown', 'Maroon'], sizes: ['M','L','XL'], price: '1750' },
  { id: 3, name: 'Tracksuit', category: 'fulldress', images: ['/full3.jpeg'], colors: ['Black', 'Brown', 'Maroon'], sizes: ['M','L','XL'], price: '1800' },
  { id: 4, name: 'Premium Trouser', category: 'Trouser', images: ['/trouser1.jpeg', '/trouser2.jpeg', '/trouser3.jpeg'], colors: ['Black', 'Grey', 'Green'], sizes: ['M','L','XL'], price: '1100' },
  { id: 5, name: 'Stripe Zip printed', category: 'tshirt', images: ['/h1.jpeg', '/h2.jpeg'], colors: ['Green', 'Black'], sizes: ['M','L','XL'], price: '1300' },
  { id: 6, name: 'Polo Series', category: 'tshirt', images: ['/p1.jpeg', '/p2.jpeg', '/p3.jpeg', '/p4.jpeg'], colors: ['Brown', 'Green', 'Black', 'Grey'], sizes: ['S','M','L','XL'], price: '1200' },
  { id: 7, name: 'Multi Printed ', category: 'tshirt', images: ['/simp1.jpeg'], colors: ['White'], sizes: ['M','L'], price: '1200' },
  { id: 8, name: 'Multi Printed ', category: 'tshirt', images: ['/simp2.jpeg'], colors: ['White'], sizes: ['M','L'], price: '1200' },
  { id: 9, name: 'Simple Shirt ', category: 'tshirt', images: ['/simp3.jpeg'], colors: ['White'], sizes: ['M','L'], price: '1200' },
  { id: 10, name: 'Multi Printed ', category: 'tshirt', images: ['/simp4.jpeg'], colors: ['White'], sizes: ['M','L'], price: '1200' },
  { id: 11, name: 'Simple Shirt ', category: 'tshirt', images: ['/simp5.jpeg'], colors: ['White'], sizes: ['M','L'], price: '1200' },
  { id: 12, name: 'Simple Shirt ', category: 'tshirt', images: ['/simp6.jpeg'], colors: ['White'], sizes: ['M','L'], price: '1200' },
  { id: 13, name: 'Stripe Printed ', category: 'tshirt', images: ['/stripe.jpeg', '/stripe2.jpeg', '/stripe3.jpeg' , '/stripe4.jpeg'], colors: ['Green', 'Black', 'White'], sizes: ['S','M','L','XL'], price: '1200' },
  { id: 14, name: 'Johnny collar Drop Shoulder polo', category: 'tshirt', images: ['/johnny.jpeg','/johnny2.jpeg'], colors: ['Green', 'Black', 'White'], sizes: ['S','M','L','XL'], price: '1200' },
  { id: 15, name: 'Stripe Printed Shirt', category: 'tshirt', images: ['/stripeshirt.jpeg','/stripeshirt2.jpeg' ,'/stripeshirt3.jpeg'], colors: ['Green', 'Black', 'White'], sizes: ['S','M','L','XL'], price: '1200' },
  { id: 16, name: 'Down shoulder', category: 'tshirt', images: ['/Downshoulder.jpeg','/Downshoulder2.jpeg' ,'/Downshoulder3.jpeg'], colors: ['Green', 'Black', 'White'], sizes: ['S','M','L','XL'], price: '900' },
  { id: 17, name: 'Double pocket', category: 'tshirt', images: ['/Doublepocket.jpeg','/Doublepocket2.jpeg' ,'/Doublepocket3.jpeg'], colors: ['Brown', 'Black', 'White'], sizes: ['S','M','L','XL'], price: '1299' },
  { id: 18, name: '3 Pes Tracksuits ', category: 'fulldress', images: ['/trac3p.jpeg'], colors: ['Black', 'Brown'], sizes: ['M','L','XL'], price: '1999' },
  { id: 19, name: 'multi printed', category: 'tshirt', images: ['/multi.jpeg','/multi2.jpeg' ,'/multi3.jpeg'], colors: ['Brown', 'Black', 'White'], sizes: ['S','M','L','XL'], price: '1109' },
  { id:20, name: 'Lining drop shoulder ', category: 'tshirt', images: ['/liningdrop.jpeg','/liningdrop2.jpeg' ,'/liningdrop3.jpeg'], colors: ['Brown', 'Black', 'White'], sizes: ['S','M','L','XL'], price: '1200' },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  const [filterChanging, setFilterChanging] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [devWidgetOpen, setDevWidgetOpen] = useState(false);

  // Cart States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('shean_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to load cart', e);
      }
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem('shean_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const handleScroll = () => setIsNavbarSticky(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu, modal or cart is open
  useEffect(() => {
    if (mobileMenuOpen || selectedProduct || cartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen, selectedProduct, cartOpen]);

  // Close dev widget when modal or cart opens
  useEffect(() => {
    if (selectedProduct || cartOpen) {
      setDevWidgetOpen(false);
    }
  }, [selectedProduct, cartOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleCategoryChange = (cat: string) => {
    setFilterChanging(true);
    setTimeout(() => { setActiveCategory(cat); setFilterChanging(false); }, 220);
  };

  const filteredProducts = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);

  const addToCart = () => {
    if (!selectedProduct) return;

    // Make color and size optional, use 'Standard' if not selected
    const color = selectedColor || 'Standard';
    const size = selectedSize || 'Standard';

    const cartId = `${selectedProduct.id}-${color}-${size}`;
    const existingItem = cart.find(item => `${item.id}-${item.color}-${item.size}` === cartId);

    if (existingItem) {
      setCart(cart.map(item =>
        `${item.id}-${item.color}-${item.size}` === cartId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        image: selectedProduct.images[0],
        color: color,
        size: size,
        quantity: 1
      }]);
    }
    setSelectedProduct(null);
    setSelectedColor('');
    setSelectedSize('');
    setCartOpen(true);
  };

  const removeFromCart = (id: number, color: string, size: string) => {
    setCart(cart.filter(item => !(item.id === id && item.color === color && item.size === size)));
  };

  const updateQuantity = (id: number, color: string, size: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id && item.color === color && item.size === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const whatsappCartMsg = () => {
    const total = cart.reduce((acc, item) => acc + (parseInt(item.price) * item.quantity), 0);
    let message = "Hi SHEAN, I'd like to place an order:\n\n";

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   - Color: ${item.color}\n`;
      message += `   - Size: ${item.size}\n`;
      message += `   - Qty: ${item.quantity}\n`;
      message += `   - Price: PKR ${item.price}\n`;
      message += `   - Image: ${window.location.origin}${item.image}\n\n`;
    });

    message += `*Total Amount: PKR ${total}*\n\n`;
    message += "Please confirm availability and sharing shipping details.";

    return `https://wa.me/923190371458?text=${encodeURIComponent(message)}`;
  };

  const handleWhatsAppOrder = () => {
    const url = whatsappCartMsg();
    setCart([]);
    setCartOpen(false);
    window.open(url, '_blank');
  };

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'products', label: 'PRODUCTS' },
    { id: 'how', label: 'HOW IT WORKS' },
  ];

  return (
    <main className="bg-black text-white">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@200;300;400;500;600&display=swap');

        /* ══════════════════════════════════
           NAVBAR
        ══════════════════════════════════ */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease;
          border-bottom: 1px solid transparent;
        }
        .navbar.scrolled {
          background: rgba(0,0,0,0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom-color: #1a1a1a;
        }
        .navbar-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 40px; height: 72px;
        }
        .navbar-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px; font-weight: 600;
          letter-spacing: 8px; color: #fff;
          cursor: pointer; user-select: none;
          transition: opacity 0.3s;
        }
        .navbar-logo:hover { opacity: 0.7; }

        /* Desktop nav links */
        .navbar-links {
          display: flex; align-items: center; gap: 40px;
        }
        .navbar-link {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; letter-spacing: 4px; font-weight: 400;
          color: #888; background: none; border: none;
          cursor: pointer; padding: 0; position: relative;
          transition: color 0.3s;
        }
        .navbar-link::after {
          content: ''; position: absolute;
          bottom: -4px; left: 0; right: 0;
          height: 1px; background: #fff;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s cubic-bezier(.25,.46,.45,.94);
        }
        .navbar-link:hover { color: #fff; }
        .navbar-link:hover::after { transform: scaleX(1); }

        /* Hamburger */
        .hamburger {
          display: none;
          flex-direction: column; justify-content: center; gap: 5px;
          width: 40px; height: 40px; background: none;
          border: 1px solid #222; cursor: pointer;
          padding: 10px; transition: border-color 0.3s;
        }
        .hamburger:hover { border-color: #555; }
        .hamburger span {
          display: block; height: 1px; background: #fff;
          transition: all 0.35s cubic-bezier(.25,.46,.45,.94);
          transform-origin: center;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

        /* Mobile menu overlay */
        .mobile-menu {
          position: fixed; inset: 0; z-index: 999;
          background: #000;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 8px;
          padding: 80px 40px 40px;
          animation: mobileMenuIn 0.38s cubic-bezier(.25,.46,.45,.94);
        }
        @keyframes mobileMenuIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 600; letter-spacing: 8px;
          color: #333; position: absolute; top: 24px; left: 40px;
        }
        .mobile-menu-link {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 8vw, 56px); font-weight: 300;
          color: #fff; background: none; border: none;
          cursor: pointer; letter-spacing: 4px; line-height: 1.3;
          transition: color 0.3s; font-style: italic;
        }
        .mobile-menu-link:hover { color: #666; }
        .mobile-menu-footer {
          position: absolute; bottom: 32px;
          font-family: 'Montserrat', sans-serif;
          font-size: 8px; letter-spacing: 4px; color: #333;
        }

        /* ══════════════════════════════════
           HERO
        ══════════════════════════════════ */
        .hero-section {
          position: relative; height: 100vh;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .hero-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover;
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background:
            linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.75) 100%);
        }
        .hero-grain {
          position: absolute; inset: 0; opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px;
        }
        .hero-content {
          position: relative; z-index: 2;
          text-align: center; padding: 0 24px;
          max-width: 900px; margin: 0 auto;
        }
        .hero-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; letter-spacing: 8px; color: rgba(255,255,255,0.5);
          margin-bottom: 28px; display: flex;
          align-items: center; justify-content: center; gap: 16px;
        }
        .hero-eyebrow::before, .hero-eyebrow::after {
          content: ''; display: block;
          width: 40px; height: 1px; background: rgba(255,255,255,0.25);
        }
        .hero-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(44px, 7vw, 92px);
          font-weight: 300; line-height: 1.08;
          color: #fff; letter-spacing: 2px;
          margin-bottom: 12px;
        }
        .hero-headline em {
          font-style: italic; color: rgba(255,255,255,0.8);
        }
        .hero-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px; letter-spacing: 3px; font-weight: 300;
          color: rgba(255,255,255,0.45); margin-bottom: 52px;
        }
        .hero-cta {
          display: inline-block;
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; letter-spacing: 5px; font-weight: 500;
          color: #000; background: #fff;
          padding: 18px 44px; border: 1px solid #fff;
          cursor: pointer;
          transition: background 0.35s, color 0.35s;
          position: relative; overflow: hidden;
        }
        .hero-cta:hover { background: transparent; color: #fff; }

        .hero-scroll {
          position: absolute; bottom: 36px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          z-index: 2;
        }
        .hero-scroll-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 7px; letter-spacing: 4px; color: rgba(255,255,255,0.3);
        }
        .hero-scroll-line {
          width: 1px; height: 48px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.4), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.1); }
        }

        /* ══════════════════════════════════
           ABOUT
        ══════════════════════════════════ */
        .sec-about {
          padding: 120px 60px;
          background: #050505;
          border-top: 1px solid #111;
          overflow: hidden;
        }
        .about-inner {
          max-width: 1280px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 100px; align-items: center;
        }
        .about-left { position: relative; }
        .about-big-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(80px, 12vw, 160px);
          font-weight: 300; line-height: 0.85;
          color: #0f0f0f; user-select: none;
          position: absolute; top: -20px; left: -30px;
          white-space: nowrap; pointer-events: none;
          letter-spacing: -4px;
        }
        .about-mosaic {
          position: relative;
          width: 100%;
        }
        .about-mosaic-item {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: #0d0d0d;
          border: 1px solid #1e1e1e;
        }
        .about-mosaic-item::before {
          content: ''; position: absolute;
          inset: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          z-index: 2; pointer-events: none;
        }
        .about-mosaic-item::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%);
          z-index: 1; pointer-events: none;
        }
        .about-mosaic-img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          filter: grayscale(15%);
          transition: filter 0.6s ease, transform 0.8s cubic-bezier(.25,.46,.45,.94);
        }
        .about-mosaic-item:hover .about-mosaic-img {
          filter: grayscale(0%);
          transform: scale(1.04);
        }
        .about-frame-tl {
          position: absolute; top: -1px; left: -1px;
          width: 28px; height: 28px;
          border-top: 2px solid #fff; border-left: 2px solid #fff;
          z-index: 3; pointer-events: none;
        }
        .about-frame-tr {
          position: absolute; top: -1px; right: -1px;
          width: 28px; height: 28px;
          border-top: 2px solid #fff; border-right: 2px solid #fff;
          z-index: 3; pointer-events: none;
        }
        .about-frame-bl {
          position: absolute; bottom: -1px; left: -1px;
          width: 28px; height: 28px;
          border-bottom: 2px solid #fff; border-left: 2px solid #fff;
          z-index: 3; pointer-events: none;
        }
        .about-frame-br {
          position: absolute; bottom: -1px; right: -1px;
          width: 28px; height: 28px;
          border-bottom: 2px solid #fff; border-right: 2px solid #fff;
          z-index: 3; pointer-events: none;
        }
        .about-accent {
          position: absolute; bottom: -24px; right: -24px;
          width: 80px; height: 80px;
          border-bottom: 1px solid #333; border-right: 1px solid #333;
        }

        .about-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; letter-spacing: 6px; color: #555;
          margin-bottom: 16px;
          display: flex; align-items: center; gap: 14px;
        }
        .about-label::before {
          content: ''; display: block;
          width: 36px; height: 1px; background: #fff;
        }
        .about-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(38px, 4.5vw, 58px);
          font-weight: 300; line-height: 1.1; color: #fff;
          margin-bottom: 32px;
        }
        .about-heading em { font-style: italic; }
        .about-body {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px; line-height: 2.1; color: #555;
          font-weight: 300; margin-bottom: 20px;
        }
        .about-divider {
          width: 40px; height: 1px;
          background: #222; margin: 32px 0;
        }
        .about-stats {
          display: flex; gap: 48px; margin-bottom: 44px;
        }
        .about-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px; color: #fff; font-weight: 300; line-height: 1;
        }
        .about-stat-lbl {
          font-family: 'Montserrat', sans-serif;
          font-size: 8px; letter-spacing: 3px; color: #444;
          margin-top: 6px;
        }
        .about-cta {
          display: inline-block;
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; letter-spacing: 4px; font-weight: 400;
          color: #fff; border: 1px solid #222;
          padding: 14px 28px; cursor: pointer;
          transition: all 0.3s; background: none;
        }
        .about-cta:hover { border-color: #fff; background: #fff; color: #000; }

        /* ══════════════════════════════════
           PRODUCTS
        ══════════════════════════════════ */
        .sec-products {
          padding: 100px 60px;
          background: #000;
        }
        .sec-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(38px, 5.5vw, 68px);
          font-weight: 300;
          color: #fff;
          line-height: 1;
          margin-bottom: 8px;
        }
        .sec-title em { font-style: italic; color: #fff; }
        .sec-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; letter-spacing: 6px;
          color: #555; margin-bottom: 14px;
          display: flex; align-items: center; gap: 14px;
        }
        .sec-label::before {
          content: ''; display: block;
          width: 36px; height: 1px; background: #fff;
        }

        .filter-row {
          display: flex; gap: 0; margin: 44px 0 48px;
          border: 1px solid #222; width: fit-content;
        }
        .filter-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; letter-spacing: 4px;
          padding: 13px 28px;
          background: transparent; border: none;
          color: #444; cursor: pointer;
          transition: all 0.25s;
          border-right: 1px solid #222;
          position: relative; overflow: hidden;
        }
        .filter-btn:last-child { border-right: none; }
        .filter-btn.active { background: #fff; color: #000; }
        .filter-btn:not(.active):hover { color: #fff; background: #111; }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1px;
          background: #111;
          transition: opacity 0.22s;
        }
        .products-grid.fading { opacity: 0; }

        .product-card {
          background: #000; cursor: pointer;
          overflow: hidden; position: relative;
          transition: background 0.3s;
        }
        .product-card:hover { background: #0a0a0a; }

        .product-img-wrap {
          aspect-ratio: 3/4; overflow: hidden; position: relative;
        }
        .product-img-wrap img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.7s cubic-bezier(.25,.46,.45,.94);
          filter: grayscale(15%);
        }
        .product-card:hover .product-img-wrap img {
          transform: scale(1.06);
          filter: grayscale(0%);
        }
        .product-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 50%, transparent 100%);
          opacity: 0; transition: opacity 0.35s;
          display: flex; align-items: flex-end; padding: 22px;
        }
        .product-card:hover .product-img-overlay { opacity: 1; }

        .quick-view {
          font-family: 'Montserrat', sans-serif;
          font-size: 8px; letter-spacing: 3px;
          color: #fff; border: 1px solid #fff;
          padding: 9px 18px;
          transform: translateY(8px); transition: transform 0.3s;
        }
        .product-card:hover .quick-view { transform: translateY(0); }

        .product-info {
          padding: 18px 20px;
          border-top: 1px solid #111;
          display: flex; justify-content: space-between; align-items: center;
          background: #000;
        }
        .product-name {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px; letter-spacing: 1.5px; color: #fff; font-weight: 300;
        }
        .product-colors {
          font-size: 9px; letter-spacing: 2px; color: #444; margin-top: 3px;
          font-family: 'Montserrat', sans-serif;
        }
        .product-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px; color: #fff; font-weight: 300;
        }
        .product-price small {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; color: #555;
        }

        /* ══════════════════════════════════
           WHY CHOOSE
        ══════════════════════════════════ */
        .sec-why {
          padding: 100px 60px;
          background: #050505;
          border-top: 1px solid #111;
        }
        .why-grid {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 1px; background: #111;
          margin-top: 60px;
        }
        .why-card {
          background: #000; padding: 52px 36px;
          position: relative; overflow: hidden;
          transition: background 0.35s;
        }
        .why-card:hover { background: #0d0d0d; }
        .why-card::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0; height: 2px; background: #fff;
          transition: width 0.55s cubic-bezier(.25,.46,.45,.94);
        }
        .why-card:hover::after { width: 100%; }
        .why-big-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 72px; color: #111;
          position: absolute; top: 14px; right: 24px;
          line-height: 1; transition: color 0.35s;
          user-select: none;
        }
        .why-card:hover .why-big-num { color: #1c1c1c; }
        .why-icon { font-size: 28px; margin-bottom: 20px; }
        .why-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px; color: #fff; font-weight: 300; margin-bottom: 14px;
        }
        .why-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px; line-height: 1.9; color: #555; font-weight: 300;
        }

        /* ══════════════════════════════════
           HOW IT WORKS
        ══════════════════════════════════ */
        .sec-how {
          padding: 100px 60px;
          background: #000;
          border-top: 1px solid #111;
        }
        .how-steps {
          display: grid; grid-template-columns: repeat(3,1fr);
          margin-top: 60px; position: relative;
        }
        .how-steps::before {
          content: ''; position: absolute;
          top: 48px; left: 16.67%; right: 16.67%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #fff, transparent);
          opacity: 0.1;
        }
        .step { padding: 44px 36px; text-align: center; }
        .step-num {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; color: #444; letter-spacing: 5px;
          margin-bottom: 20px; display: block;
        }
        .step-circle {
          width: 96px; height: 96px;
          border: 1px solid #222; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 28px; font-size: 30px;
          transition: all 0.35s;
        }
        .step:hover .step-circle {
          border-color: #fff;
          background: #0d0d0d;
          transform: scale(1.06);
          box-shadow: 0 0 24px rgba(255,255,255,0.05);
        }
        .step-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px; color: #fff; font-weight: 300; margin-bottom: 12px;
        }
        .step-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px; line-height: 1.9; color: #555; font-weight: 300;
        }

        /* ══════════════════════════════════
           MODAL
        ══════════════════════════════════ */
        .modal-overlay {
          position: fixed; inset: 0; z-index: 2000;
          background: rgba(0,0,0,0.94);
          backdrop-filter: blur(14px);
          display: flex; align-items: center; justify-content: center; padding: 40px;
          animation: fadeIn 0.28s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .modal-box {
          background: #0a0a0a; max-width: 880px; width: 100%;
          display: grid; grid-template-columns: 1fr 1fr;
          border: 1px solid #1a1a1a;
          position: relative; max-height: 90vh; overflow-y: auto;
          animation: slideUp 0.36s cubic-bezier(.25,.46,.45,.94);
        }
        @keyframes slideUp { from { opacity:0; transform:translateY(36px); } to { opacity:1; transform:translateY(0); } }
        .modal-close {
          position: absolute; top: 18px; right: 18px;
          background: none; border: 1px solid #222;
          color: #fff; width: 40px; height: 40px;
          cursor: pointer; font-size: 14px; z-index: 10;
          transition: all 0.3s;
        }
        .modal-close:hover { background: #fff; color: #000; }
        .modal-img-side { position: relative; }
        .modal-main-img { width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block; }
        .modal-thumbs {
          position: absolute; bottom: 12px; left: 12px;
          display: flex; gap: 6px; flex-wrap: wrap;
        }
        .modal-thumb {
          width: 50px; height: 50px; object-fit: cover; cursor: pointer;
          border: 2px solid transparent; opacity: 0.5;
          transition: opacity 0.25s, border-color 0.25s;
        }
        .modal-thumb.active { border-color: #fff; opacity: 1; }
        .modal-info {
          padding: 52px 34px;
          display: flex; flex-direction: column; justify-content: center;
        }
        .modal-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; letter-spacing: 5px; color: #444; margin-bottom: 12px;
        }
        .modal-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px; font-weight: 300; color: #fff; line-height: 1.1; margin-bottom: 8px;
        }
        .modal-price-row {
          display: flex; align-items: baseline; gap: 6px;
          margin-bottom: 32px; padding-bottom: 26px;
          border-bottom: 1px solid #111;
        }
        .modal-cur { font-family: 'Montserrat', sans-serif; font-size: 11px; color: #444; }
        .modal-price { font-family: 'Cormorant Garamond', serif; font-size: 34px; color: #fff; }
        .modal-lbl {
          font-family: 'Montserrat', sans-serif;
          font-size: 8px; letter-spacing: 4px; color: #444;
          margin-top: 18px; margin-bottom: 10px;
        }
        .tags { display: flex; gap: 6px; flex-wrap: wrap; }
        .tag {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; letter-spacing: 2px;
          padding: 6px 14px;
          border: 1px solid #1e1e1e; color: #555;
          transition: all 0.25s; cursor: pointer;
        }
        .tag:hover { border-color: #fff; color: #fff; }
        .tag.active { border-color: #fff; color: #fff; background: #fff; color: #000; }

        .btn-add-cart {
          display: block; text-align: center;
          padding: 16px 24px; background: #fff;
          color: #000; font-family: 'Montserrat', sans-serif;
          font-size: 10px; letter-spacing: 4px; font-weight: 500;
          text-decoration: none; transition: all 0.3s;
          border: 1px solid #fff; margin-top: 32px;
          cursor: pointer; width: 100%;
        }
        .btn-add-cart:hover { background: transparent; color: #fff; }
        .btn-add-cart:disabled { background: #333; border-color: #333; color: #888; cursor: not-allowed; }

        /* ══════════════════════════════════
           CART SIDEBAR
        ══════════════════════════════════ */
        .cart-overlay {
          position: fixed; inset: 0; z-index: 10000;
          background: rgba(0,0,0,0.8); backdrop-filter: blur(8px);
          display: flex; justify-content: flex-end;
        }
        .cart-sidebar {
          width: 100%; max-width: 420px;
          background: #0a0a0a; height: 100%;
          display: flex; flex-direction: column;
          border-left: 1px solid #1a1a1a;
          box-shadow: -10px 0 30px rgba(0,0,0,0.5);
        }
        .cart-header {
          padding: 24px 30px; border-bottom: 1px solid #111;
          display: flex; align-items: center; justify-content: space-between;
        }
        .cart-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px; letter-spacing: 2px;
        }
        .cart-close {
          background: none; border: none; color: #fff; font-size: 20px; cursor: pointer;
        }
        .cart-items {
          flex: 1; overflow-y: auto; padding: 30px;
          display: flex; flex-direction: column; gap: 24px;
        }
        .cart-item {
          display: grid; grid-template-columns: 80px 1fr; gap: 20px;
          align-items: center;
        }
        .cart-item-img {
          width: 80px; aspect-ratio: 3/4; object-fit: cover; border: 1px solid #1a1a1a;
        }
        .cart-item-info { display: flex; flex-direction: column; gap: 4px; }
        .cart-item-name {
          font-family: 'Montserrat', sans-serif; font-size: 11px; letter-spacing: 1.5px;
        }
        .cart-item-meta {
          font-family: 'Montserrat', sans-serif; font-size: 9px; color: #555; letter-spacing: 1px;
        }
        .cart-item-price {
          font-family: 'Cormorant Garamond', serif; font-size: 18px; color: #fff; margin-top: 4px;
        }
        .cart-item-qty {
          display: flex; align-items: center; gap: 12px; margin-top: 8px;
        }
        .qty-btn {
          background: none; border: 1px solid #222; color: #fff;
          width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 14px;
        }
        .qty-num { font-family: 'Montserrat', sans-serif; font-size: 10px; }
        .cart-footer {
          padding: 30px; border-top: 1px solid #111; background: #080808;
        }
        .cart-total-row {
          display: flex; justify-content: space-between; margin-bottom: 24px;
        }
        .cart-total-lbl { font-family: 'Montserrat', sans-serif; font-size: 10px; letter-spacing: 2px; color: #555; }
        .cart-total-val { font-family: 'Cormorant Garamond', serif; font-size: 26px; }
        .cart-empty {
          height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; color: #333;
        }
        .navbar-cart {
          position: relative; background: none; border: none; color: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
        }
        .navbar-cart-mobile {
          display: none;
        }
        .cart-badge {
          position: absolute; top: -6px; right: -8px;
          background: #fff; color: #000; font-size: 8px; font-weight: 600;
          width: 14px; height: 14px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        
        @media (max-width: 768px) {
          .navbar-cart { display: none; }
          .navbar-cart-mobile { 
            display: flex; position: relative; background: none; border: none; color: #fff; cursor: pointer;
            align-items: center; justify-content: center;
          }
        }

        /* ══════════════════════════════════
           FOOTER
        ══════════════════════════════════ */
        .site-footer {
          background: #000;
          border-top: 1px solid #111;
        }
        .footer-top {
          max-width: 1280px; margin: 0 auto;
          display: grid; grid-template-columns: 1.4fr 1fr 1fr;
          gap: 80px; padding: 80px 60px 60px;
        }
        .footer-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px; font-weight: 600; letter-spacing: 8px;
          color: #fff; margin-bottom: 18px;
        }
        .footer-brand-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px; line-height: 1.9; color: #444;
          font-weight: 300; margin-bottom: 32px;
          max-width: 280px;
        }
        .footer-social-row {
          display: flex; gap: 12px;
        }
        .footer-social-link {
          width: 40px; height: 40px;
          border: 1px solid #1e1e1e;
          display: flex; align-items: center; justify-content: center;
          color: #555; text-decoration: none;
          transition: all 0.3s; font-size: 15px;
        }
        .footer-social-link:hover { border-color: #fff; color: #fff; background: #fff; color: #000; }
        .footer-col-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; letter-spacing: 5px; color: #fff;
          margin-bottom: 28px; font-weight: 500;
        }
        .footer-col-link {
          display: block;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px; letter-spacing: 1px; color: #444;
          font-weight: 300; margin-bottom: 14px;
          background: none; border: none; cursor: pointer;
          text-align: left; padding: 0; text-decoration: none;
          transition: color 0.3s;
        }
        .footer-col-link:hover { color: #fff; }
        .footer-contact-item {
          display: flex; align-items: flex-start; gap: 12px;
          margin-bottom: 16px;
        }
        .footer-contact-icon {
          font-size: 13px; color: #333; margin-top: 2px; flex-shrink: 0;
        }
        .footer-contact-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px; line-height: 1.7; color: #444; font-weight: 300;
        }
        .footer-bottom {
          border-top: 1px solid #0d0d0d;
          padding: 24px 60px;
          display: flex; align-items: center; justify-content: space-between;
          max-width: 1280px; margin: 0 auto;
        }
        .footer-copy {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px; letter-spacing: 3px; color: #2a2a2a;
        }
        .footer-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px; color: #2a2a2a; font-style: italic;
        }

        /* ══════════════════════════════════
           FOOTER DEV CREDIT BAR
        ══════════════════════════════════ */
        .footer-dev-bar {
          border-top: 1px solid #0d0d0d;
          background: #000;
          padding: 18px 60px;
          display: flex; align-items: center; justify-content: center;
        }
        .footer-dev-link {
          display: inline-flex; align-items: center; gap: 10px;
          text-decoration: none;
          padding: 10px 24px;
          border: 1px solid #1a1a1a;
          transition: all 0.35s ease;
          position: relative; overflow: hidden;
        }
        .footer-dev-link::before {
          content: ''; position: absolute; inset: 0;
          background: #fff; transform: translateX(-101%);
          transition: transform 0.35s cubic-bezier(.25,.46,.45,.94);
          z-index: 0;
        }
        .footer-dev-link:hover::before { transform: translateX(0); }
        .footer-dev-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 8px; letter-spacing: 4px; color: #333;
          position: relative; z-index: 1;
          transition: color 0.35s;
        }
        .footer-dev-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px; font-weight: 400; color: #fff;
          position: relative; z-index: 1;
          transition: color 0.35s; letter-spacing: 1px;
        }
        .footer-dev-arrow {
          font-size: 12px; color: #444;
          position: relative; z-index: 1;
          transition: color 0.35s, transform 0.35s;
        }
        .footer-dev-link:hover .footer-dev-label { color: #999; }
        .footer-dev-link:hover .footer-dev-name { color: #000; }
        .footer-dev-link:hover .footer-dev-arrow { color: #000; transform: translateX(4px); }

        /* ══════════════════════════════════
           FLOATING DEV WIDGET
        ══════════════════════════════════ */
        .dev-widget {
          position: fixed;
          bottom: 28px; right: 28px;
          z-index: 500;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 12px;
        }

        .dev-card {
          background: #0a0a0a;
          border: 1px solid #222;
          padding: 18px 20px;
          display: flex; align-items: center; gap: 14px;
          text-decoration: none;
          min-width: 220px;
          transform: translateY(10px) scale(0.95);
          opacity: 0;
          pointer-events: none;
          transition: all 0.35s cubic-bezier(.25,.46,.45,.94);
          position: relative; overflow: hidden;
        }
        .dev-card::before {
          content: ''; position: absolute; inset: 0;
          background: #fff; transform: translateX(-101%);
          transition: transform 0.38s cubic-bezier(.25,.46,.45,.94);
          z-index: 0;
        }
        .dev-card:hover::before { transform: translateX(0); }
        .dev-widget.open .dev-card {
          transform: translateY(0) scale(1);
          opacity: 1;
          pointer-events: auto;
        }
        .dev-card-avatar {
          width: 38px; height: 38px;
          border-radius: 50%;
          border: 1px solid #2a2a2a;
          background: #111;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px; color: #fff;
          flex-shrink: 0; position: relative; z-index: 1;
          transition: color 0.35s, border-color 0.35s;
        }
        .dev-card:hover .dev-card-avatar { color: #000; border-color: #000; }
        .dev-card-text { position: relative; z-index: 1; }
        .dev-card-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 7px; letter-spacing: 3px; color: #444;
          margin-bottom: 3px;
          transition: color 0.35s;
        }
        .dev-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px; font-weight: 400; color: #fff;
          letter-spacing: 1px; line-height: 1;
          transition: color 0.35s;
        }
        .dev-card-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 7px; letter-spacing: 2px; color: #333;
          margin-top: 3px;
          transition: color 0.35s;
        }
        .dev-card:hover .dev-card-label { color: #888; }
        .dev-card:hover .dev-card-name,
        .dev-card:hover .dev-card-sub { color: #000; }

        .dev-btn {
          width: 52px; height: 52px;
          background: #000;
          border: 1px solid #2a2a2a;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          position: relative;
          transition: border-color 0.3s, transform 0.3s;
          flex-shrink: 0;
        }
        .dev-btn:hover { border-color: #fff; transform: scale(1.08); }

        .dev-btn::before, .dev-btn::after {
          content: '';
          position: absolute; inset: -1px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          animation: devPulse 2.4s ease-out infinite;
        }
        .dev-btn::after { animation-delay: 1.2s; }
        @keyframes devPulse {
          0%   { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.9); opacity: 0; }
        }

        .dev-btn-icon {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px; letter-spacing: 1px; color: #fff;
          position: relative; z-index: 1;
          transition: transform 0.3s;
          user-select: none;
        }
        .dev-btn.active .dev-btn-icon { transform: rotate(45deg); }

        @media (max-width: 480px) {
          .dev-widget { bottom: 20px; right: 20px; }
          .dev-card { min-width: 190px; }
        }

        /* ══════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════ */
        @media (max-width: 1024px) {
          .about-inner { gap: 60px; }
          .footer-top { grid-template-columns: 1fr 1fr; gap: 48px; }
        }

        @media (max-width: 768px) {
          .navbar-inner { padding: 0 20px; }
          .navbar-links { display: none; }
          .hamburger { display: flex; }

          .hero-eyebrow { font-size: 7px; letter-spacing: 5px; }

          .sec-products, .sec-why, .sec-how { padding: 72px 20px; }
          .sec-about { padding: 72px 20px; }

          .about-inner { grid-template-columns: 1fr; gap: 48px; }
          .about-left { order: 2; }
          .about-right { order: 1; }
          .about-big-text { font-size: 80px; top: -10px; left: -10px; }
          .about-stats { gap: 32px; }

          .filter-row { width: 100%; overflow-x: auto; }
          .why-grid, .how-steps { grid-template-columns: 1fr; }
          .how-steps::before { display: none; }
          .modal-box { grid-template-columns: 1fr; }
          .products-grid { grid-template-columns: repeat(2,1fr); }

          .footer-top { grid-template-columns: 1fr; padding: 60px 24px 40px; gap: 40px; }
          .footer-bottom { padding: 20px 24px; flex-direction: column; gap: 10px; text-align: center; }
        }

        @media (max-width: 480px) {
          .hero-headline { font-size: 38px; }
          .modal-box { margin: 16px; }
          .modal-overlay { padding: 0; align-items: flex-end; }
          .modal-box { max-height: 95vh; border-bottom: none; }
        }
      `}</style>

      {/* ═══════════════════════════════════════
          NAVBAR
      ═══════════════════════════════════════ */}
      <nav className={`navbar ${isNavbarSticky ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <div className="navbar-logo" onClick={() => scrollToSection('home')}>
            SHEAN
          </div>

          {/* Desktop links */}
          <div className="navbar-links">
            {navLinks.map(link => (
              <button key={link.id} className="navbar-link" onClick={() => scrollToSection(link.id)}>
                {link.label}
              </button>
            ))}
            
            <button className="navbar-cart" onClick={() => setCartOpen(true)} aria-label="Open cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cart.length > 0 && <span className="cart-badge">{cart.reduce((acc, i) => acc + i.quantity, 0)}</span>}
            </button>
          </div>

          {/* Hamburger area */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button className="navbar-cart-mobile" onClick={() => setCartOpen(true)} aria-label="Open cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cart.length > 0 && <span className="cart-badge">{cart.reduce((acc, i) => acc + i.quantity, 0)}</span>}
            </button>
            
            <button
              className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="mobile-menu-logo">SHEAN</span>
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                className="mobile-menu-link"
                onClick={() => scrollToSection(link.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * (i + 1) }}
              >
                {link.label}
              </motion.button>
            ))}
            <span className="mobile-menu-footer">© {new Date().getFullYear()} SHEAN</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section id="home" className="hero-section">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-grain" />

        <div className="hero-content">
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            PREMIUM FASHION BRAND
          </motion.div>

          <motion.h1
            className="hero-headline"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Wear Confidence.<br /><em>Express Your Identity.</em>
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
          >
            CURATED PIECES FOR THE DISCERNING INDIVIDUAL
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95 }}
          >
            <button className="hero-cta" onClick={() => scrollToSection('products')}>
              VIEW COLLECTION
            </button>
          </motion.div>
        </div>

        <div className="hero-scroll">
          <span className="hero-scroll-label">SCROLL</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ABOUT
      ═══════════════════════════════════════ */}
      <section id="about" className="sec-about">
        <div className="about-inner">
          <div className="about-left">
            <div className="about-big-text">S</div>
            <div className="about-mosaic">
              <div className="about-mosaic-item">
                <img src="/Shean.png" alt="SHEAN" className="about-mosaic-img" />
                <div className="about-frame-tl" />
                <div className="about-frame-tr" />
                <div className="about-frame-bl" />
                <div className="about-frame-br" />
              </div>
            </div>
            <div className="about-accent" />
          </div>

          <div className="about-right">
            <div className="about-label">OUR STORY</div>
            <h2 className="about-heading">About<br /><em>SHEAN</em></h2>

            <p className="about-body">
              SHEAN was born from a singular belief — that clothing should be more than fabric. It should be a statement, a feeling, a second skin that moves with you through every chapter of your day.
            </p>
            <p className="about-body">
              We design for the modern individual who values simplicity without compromise. Every piece is crafted with precision, using premium materials that stand the test of time and trend.
            </p>

            <div className="about-divider" />

            <div className="about-stats">
              <div>
                <div className="about-stat-num">12+</div>
                <div className="about-stat-lbl">CURATED PIECES</div>
              </div>
              <div>
                <div className="about-stat-num">3</div>
                <div className="about-stat-lbl">COLLECTIONS</div>
              </div>
              <div>
                <div className="about-stat-num">∞</div>
                <div className="about-stat-lbl">IDENTITY</div>
              </div>
            </div>

            <button className="about-cta" onClick={() => scrollToSection('products')}>
              EXPLORE THE COLLECTION
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PRODUCTS
      ═══════════════════════════════════════ */}
      <section id="products" className="sec-products">
        <div className="sec-label">CURATED COLLECTION</div>
        <h2 className="sec-title">Our <em>Pieces</em></h2>

        <div className="filter-row">
          {[['all','ALL'],['tshirt','SHIRTS & TOPS'],['Trouser','TROUSERS'],['fulldress','FULL OUTFITS']].map(([val, label]) => (
            <button
              key={val}
              className={`filter-btn ${activeCategory === val ? 'active' : ''}`}
              onClick={() => handleCategoryChange(val)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className={`products-grid ${filterChanging ? 'fading' : ''}`}>
          {filteredProducts.map((product, idx) => (
            <div
              key={`${product.id}-${idx}`}
              className="product-card"
              onClick={() => { setSelectedProduct(product); setSelectedImage(0); }}
            >
              <div className="product-img-wrap">
                <img src={product.images[0]} alt={product.name} />
                <div className="product-img-overlay">
                  <div className="quick-view">QUICK VIEW</div>
                </div>
              </div>
              <div className="product-info">
                <div>
                  <div className="product-name">{product.name}</div>
                  <div className="product-colors">{product.colors.length} COLORS</div>
                </div>
                <div className="product-price"><small>PKR </small>{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHY CHOOSE SHEAN
      ═══════════════════════════════════════ */}
      <section className="sec-why">
        <div className="sec-label">THE SHEAN DIFFERENCE</div>
        <h2 className="sec-title">Why Choose <em>SHEAN</em></h2>

        <div className="why-grid">
          {[
            ['✦', 'Premium Quality', 'We source only the finest fabrics ensuring superior comfort, durability, and a finish that elevates every wear.'],
            ['◈', 'Minimal Design', 'Timeless silhouettes and restrained aesthetics that transcend seasons and speak to every personality.'],
            ['⟡', 'Direct Ordering', 'Add items to your bag and order instantly via WhatsApp with no friction. Your SHEAN piece arrives with care.'],
          ].map(([icon, title, desc], i) => (
            <div key={title as string} className="why-card">
              <div className="why-big-num">0{i + 1}</div>
              <div className="why-icon">{icon}</div>
              <div className="why-title">{title}</div>
              <div className="why-desc">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HOW IT WORKS
      ═══════════════════════════════════════ */}
      <section id="how" className="sec-how">
        <div className="sec-label">THE PROCESS</div>
        <h2 className="sec-title">How It <em>Works</em></h2>

        <div className="how-steps">
          {[
            ['01', '👁', 'Browse', 'Explore our curated collection and discover pieces that match your personal style.'],
            ['02', '◈', 'Select', 'Choose your preferred colors and sizes and add them to your shopping bag.'],
            ['03', '✉', 'Order', 'Connect with us directly on WhatsApp and place your order instantly from your bag.'],
          ].map(([num, icon, title, desc]) => (
            <div key={num as string} className="step">
              <span className="step-num">— STEP {num} —</span>
              <div className="step-circle">{icon}</div>
              <div className="step-title">{title}</div>
              <div className="step-desc">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MODAL
      ═══════════════════════════════════════ */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => { setSelectedProduct(null); setSelectedColor(''); setSelectedSize(''); }}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => { setSelectedProduct(null); setSelectedColor(''); setSelectedSize(''); }}>✕</button>

            <div className="modal-img-side">
              <img className="modal-main-img" src={selectedProduct.images[selectedImage]} alt={selectedProduct.name} />
              {selectedProduct.images.length > 1 && (
                <div className="modal-thumbs">
                  {selectedProduct.images.map((img, idx) => (
                    <img
                      key={idx} src={img} alt=""
                      className={`modal-thumb ${selectedImage === idx ? 'active' : ''}`}
                      onClick={() => setSelectedImage(idx)}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="modal-info">
              <div className="modal-eyebrow">SHEAN COLLECTION</div>
              <div className="modal-name">{selectedProduct.name}</div>
              <div className="modal-price-row">
                <span className="modal-cur">PKR</span>
                <span className="modal-price">{selectedProduct.price}</span>
              </div>

              <div className="modal-lbl">CHOOSE COLOR</div>
              <div className="tags">
                {selectedProduct.colors.map(c => (
                  <button 
                    key={c} 
                    className={`tag ${selectedColor === c ? 'active' : ''}`}
                    onClick={() => setSelectedColor(c)}
                  >
                    {c.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="modal-lbl">CHOOSE SIZE</div>
              <div className="tags">
                {selectedProduct.sizes.map(s => (
                  <button 
                    key={s} 
                    className={`tag ${selectedSize === s ? 'active' : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <button 
                onClick={addToCart} 
                className="btn-add-cart"
              >
                <span>⊕</span> ADD TO CART
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════
          CART SIDEBAR
      ═══════════════════════════════════════ */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div 
            className="cart-overlay" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
          >
            <motion.div 
              className="cart-sidebar"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="cart-header">
                <h2 className="cart-title">YOUR BAG</h2>
                <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
              </div>

              <div className="cart-items">
                {cart.length === 0 ? (
                  <div className="cart-empty">
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '11px', letterSpacing: '2px' }}>
                      YOUR BAG IS EMPTY
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={`${item.id}-${item.color}-${item.size}`} className="cart-item">
                      <img src={item.image} alt={item.name} className="cart-item-img" />
                      <div className="cart-item-info">
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-meta">{item.color} / {item.size}</div>
                        <div className="cart-item-price">PKR {item.price}</div>
                        
                        <div className="cart-item-qty">
                          <button className="qty-btn" onClick={() => updateQuantity(item.id, item.color, item.size, -1)}>-</button>
                          <span className="qty-num">{item.quantity}</span>
                          <button className="qty-btn" onClick={() => updateQuantity(item.id, item.color, item.size, 1)}>+</button>
                          
                          <button 
                            style={{ background: 'none', border: 'none', color: '#800', fontSize: '9px', marginLeft: 'auto', cursor: 'pointer', fontFamily: "'Montserrat', sans-serif", letterSpacing: '1px' }}
                            onClick={() => removeFromCart(item.id, item.color, item.size)}
                          >
                            REMOVE
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="cart-footer">
                  <div className="cart-total-row">
                    <span className="cart-total-lbl">SUBTOTAL</span>
                    <span className="cart-total-val">PKR {cart.reduce((acc, item) => acc + (parseInt(item.price) * item.quantity), 0)}</span>
                  </div>
                  
                  <button 
                    onClick={handleWhatsAppOrder}
                    className="btn-add-cart"
                    style={{ textAlign: 'center' }}
                  >
                    ORDER VIA WHATSAPP
                  </button>
                  <p style={{ textAlign: 'center', fontFamily: "'Montserrat', sans-serif", fontSize: '8px', color: '#444', marginTop: '16px', letterSpacing: '1px' }}>
                    FREE SHIPPING ON ALL ORDERS
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════ */}
      <footer className="site-footer">
        <div className="footer-top">
          <div>
            <div className="footer-brand-name">SHEAN</div>
            <p className="footer-brand-desc">
              A modern fashion brand focused on simplicity, confidence, and identity. Premium clothing designed for comfort and everyday expression.
            </p>
            <div className="footer-social-row">
              <a href="https://instagram.com/shean.pk" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="https://wa.me/923190371458" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </a>
              <a href="https://facebook.com/shean.pk" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://tiktok.com/@shean.pk" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="TikTok">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <div className="footer-col-title">NAVIGATE</div>
            {navLinks.map(link => (
              <button key={link.id} className="footer-col-link" onClick={() => scrollToSection(link.id)}>
                {link.label}
              </button>
            ))}
          </div>

          <div>
            <div className="footer-col-title">GET IN TOUCH</div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">◈</span>
              <div className="footer-contact-text">Available via WhatsApp<br />for orders & inquiries</div>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">✦</span>
              <div className="footer-contact-text">+92 319 0371458</div>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">⟡</span>
              <div className="footer-contact-text">Pakistan</div>
            </div>
            <a
              href="https://wa.me/923190371458"
              target="_blank" rel="noreferrer"
              style={{
                display: 'inline-block', marginTop: '20px',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '9px', letterSpacing: '4px',
                color: '#000', background: '#fff',
                padding: '12px 24px', textDecoration: 'none',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; (e.currentTarget as HTMLAnchorElement).style.border = '1px solid #fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#fff'; (e.currentTarget as HTMLAnchorElement).style.color = '#000'; (e.currentTarget as HTMLAnchorElement).style.border = '1px solid #fff'; }}
            >
              ORDER NOW
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© {new Date().getFullYear()} SHEAN. ALL RIGHTS RESERVED.</span>
          <span className="footer-tagline">Wear Confidence. Express Your Identity.</span>
        </div>

        <div className="footer-dev-bar">
          <a
            href="https://hassan-nadeem.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="footer-dev-link"
            title="View Developer Portfolio"
          >
            <span className="footer-dev-label">DESIGNED & DEVELOPED BY</span>
            <span className="footer-dev-name">Hassan Nadeem</span>
            <span className="footer-dev-arrow">→</span>
          </a>
        </div>
      </footer>

      {/* ═══════════════════════════════════════
          FLOATING DEV WIDGET
          — hidden whenever modal or cart is open
      ═══════════════════════════════════════ */}
      <div
        className={`dev-widget ${devWidgetOpen ? 'open' : ''}`}
        style={{ display: (selectedProduct || cartOpen) ? 'none' : 'flex' }}
      >
        <a
          href="https://hassan-nadeem.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="dev-card"
        >
          <div className="dev-card-avatar">H</div>
          <div className="dev-card-text">
            <div className="dev-card-label">DESIGNED & DEVELOPED BY</div>
            <div className="dev-card-name">Hassan Nadeem</div>
            <div className="dev-card-sub">VIEW PORTFOLIO →</div>
          </div>
        </a>

        <button
          className={`dev-btn ${devWidgetOpen ? 'active' : ''}`}
          onClick={() => setDevWidgetOpen(v => !v)}
          aria-label="Developer info"
        >
          <span className="dev-btn-icon">{devWidgetOpen ? '✕' : '<>'}</span>
        </button>
      </div>

    </main>
  );
}