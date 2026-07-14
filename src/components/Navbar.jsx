import { useState, useEffect } from 'react'

export default function Navbar() {
  const [atHero, setAtHero] = useState(() => window.innerWidth > 760 && window.scrollY < 1)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleScroll = () => {
      const mobile = window.innerWidth <= 760
      if (mobile) { setAtHero(false); return }
      setAtHero(window.scrollY < 1)
    }
    const handleResize = () => {
      const w = window.innerWidth
      setScreenWidth(w)
      if (w > 760) setMobileMenu(false)
      if (w <= 760) setAtHero(false)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const isTablet = screenWidth <= 980
  const isMobile = screenWidth <= 760
  const isSmallMobile = screenWidth <= 520

  const phoneNumber = "917702102097"
  const displayNumber = "770-210-2097"

  const links = [
    { name: 'Our Cars', href: '#vehicles' },
    { name: 'How It Works', href: '#services' },
    { name: 'Locations', href: '#gallery' },
    { name: 'Offers', href: '#why-choose-us' },
    { name: 'About Us', href: '#contact' },
  ]

  const morphTransition = 'all 0.65s cubic-bezier(0.25, 1, 0.5, 1)'
  const textTransition = 'color 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease, letter-spacing 0.65s cubic-bezier(0.25, 1, 0.5, 1)'
  const maxWidth = isMobile ? '100%' : isTablet ? '1100px' : '1180px'

  const navStructureStyle = {
    position: 'fixed',
    top: atHero ? 0 : 10,
    left: atHero ? 0 : 16,
    right: atHero ? 0 : 16,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0 auto',
    width: atHero ? '100%' : `calc(100% - 32px)`,
    maxWidth: atHero ? '100%' : maxWidth,
    height: atHero ? (isSmallMobile ? 64 : 74) : (isSmallMobile ? 54 : 58),
    padding: atHero 
      ? (isSmallMobile ? '0 16px' : '0 clamp(24px, 4.5vw, 54px)') 
      : (isMobile ? '0 10px' : '0 14px'),
    borderRadius: atHero ? 0 : 999,
    background: atHero ? 'transparent' : 'rgba(255,255,255,0.95)',
    borderBottom: atHero ? '1px solid transparent' : '1px solid rgba(0,0,0,0.06)',
    borderLeft: atHero ? 'none' : '1px solid rgba(0,0,0,0.06)',
    borderRight: atHero ? 'none' : '1px solid rgba(0,0,0,0.06)',
    borderTop: atHero ? 'none' : '1px solid rgba(0,0,0,0.06)',
    boxShadow: atHero ? 'none' : '0 8px 32px rgba(0,0,0,0.05)',
    backdropFilter: atHero ? 'none' : 'blur(24px) saturate(160%)',
    WebkitBackdropFilter: atHero ? 'none' : 'blur(24px) saturate(160%)',
    transition: morphTransition,
    willChange: 'width, max-width, height, padding, background, border-radius, top',
  }

  return (
    <nav style={navStructureStyle}>

      {/* LEFT AREA: Logo Branding */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', transition: morphTransition }}>
        <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: isTablet ? 8 : 12, textDecoration: 'none', background: 'transparent', border: 'none' }}>
          <div style={{
            width: isSmallMobile ? 32 : 38,
            height: isSmallMobile ? 32 : 38,
            borderRadius: '50%',
            border: '1.5px solid #1F2937',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: morphTransition
          }}>
            <span style={{ 
              fontWeight: 600, 
              fontSize: isSmallMobile ? 14 : 15, 
              color: '#1F2937', 
              fontFamily: 'var(--font-display), sans-serif',
              transition: textTransition 
            }}>T</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{
              fontWeight: 700,
              fontSize: isSmallMobile ? 12 : (isTablet ? 13 : 14),
              letterSpacing: atHero ? '0.22em' : '0.15em',
              color: '#1F2937',
              fontFamily: 'var(--font-display), sans-serif',
              whiteSpace: 'nowrap',
              transition: textTransition
            }}>
              TRSELDFRIVECARS
            </span>
            <span style={{
              fontSize: isSmallMobile ? 8 : 9,
              fontWeight: 500,
              letterSpacing: '0.3em',
              color: '#94A3B8',
              whiteSpace: 'nowrap',
              transition: textTransition
            }}>
              SELF DRIVE
            </span>
          </div>
        </a>
      </div>

      {/* CENTER AREA: Desktop Navigation */}
      {!isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto', transition: morphTransition }}>
          {links.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              style={{
                textDecoration: 'none',
                background: 'transparent',
                margin: atHero ? (isTablet ? '0 10px' : '0 16px') : '0 1px',
                padding: atHero ? '6px 0' : (isTablet ? '8px 12px' : '8px 16px'), 
                borderRadius: 999,
                fontFamily: 'Inter, sans-serif', 
                fontSize: isTablet ? 12.5 : 13.5, 
                fontWeight: 500,
                color: '#374151', 
                transition: 'all .3s ease', 
                whiteSpace: 'nowrap', 
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                e.target.style.background = 'rgba(0,0,0,0.04)';
                e.target.style.color = '#1E3A8A';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#374151';
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}

      {/* RIGHT AREA: Desktop Call Action / Mobile Trigger */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexShrink: 0 }}>
        {!isMobile && (
          <a 
            href={`tel:+${phoneNumber}`}
            style={{
              textDecoration: 'none',
              height: atHero ? 36 : 40,
              padding: atHero ? (isTablet ? '0 14px' : '0 18px') : (isTablet ? '0 16px' : '0 20px'),
              borderRadius: 999,
              border: '1px solid rgba(0,0,0,0.08)',
              background: '#fff',
              color: '#1F2937',
              fontFamily: 'Inter, sans-serif', 
              fontSize: isTablet ? 12.5 : 13.5, 
              fontWeight: 600, 
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer', 
              whiteSpace: 'nowrap', 
              flexShrink: 0,
              boxShadow: '0 4px 16px rgba(15,23,42,0.08)',
              transition: morphTransition,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(15,23,42,0.14)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(15,23,42,0.08)';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Call Us
          </a>
        )}

        {/* Mobile Hamburger Menu Toggle Trigger */}
        {isMobile && (
          <button
            style={{ 
              width: 38, height: 38, borderRadius: '50%', 
              border: '1px solid rgba(0,0,0,0.1)', 
              background: 'rgba(0,0,0,0.04)', 
              color: '#1F2937', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
              transition: morphTransition
            }}
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        )}
      </div>

      {/* Mobile Dropdown Menu Container */}
      {isMobile && (
        <div style={{
          position: 'absolute', top: atHero ? 78 : 72, left: 0, right: 0,
          background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(30px)',
          border: '1px solid rgba(0,0,0,0.06)', borderRadius: 24, padding: '16px',
          display: 'flex', flexDirection: 'column', gap: 4,
          boxShadow: '0 20px 55px rgba(0,0,0,0.1)',
          transform: mobileMenu ? 'translateY(0px) scale(1)' : 'translateY(-10px) scale(.96)',
          opacity: mobileMenu ? 1 : 0, pointerEvents: mobileMenu ? 'auto' : 'none',
          transition: 'opacity .35s cubic-bezier(0.2, 1, 0.2, 1), transform .35s cubic-bezier(0.2, 1, 0.2, 1), top 0.6s cubic-bezier(0.2, 1, 0.2, 1)',
        }}>
          {links.map((link) => (
            <a key={link.name} href={link.href} style={{ textDecoration: 'none', width: '100%', textAlign: 'left', background: 'transparent', border: 'none', color: '#0F172A', padding: '12px 10px', fontSize: 14.5, fontWeight: 500, fontFamily: 'Inter,sans-serif', cursor: 'pointer', borderRadius: 12, transition: 'all .2s ease', display: 'block', borderBottom: '1px solid rgba(0,0,0,0.03)' }}
              onClick={() => setMobileMenu(false)}
              onMouseEnter={e => e.target.style.background = 'rgba(0,0,0,0.03)'}
              onMouseLeave={e => e.target.style.background = 'transparent'}>
              {link.name}
            </a>
          ))}
          <div style={{ height: '8px' }} />
          <a href={`tel:+${phoneNumber}`} style={{ textDecoration: 'none', width: '100%', height: 46, borderRadius: 999, border: 'none', background: '#1F2937', color: '#fff', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Call Us · {displayNumber}
          </a>
        </div>
      )}
    </nav>
  )
}