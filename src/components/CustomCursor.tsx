import React, { useEffect, useRef, useState } from 'react'


type CursorVariant = 'default' | 'drag' | 'view' | 'button' | 'hero'

export const CustomCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 })
  const [variant, setVariant] = useState<CursorVariant>('default')
  const [visible, setVisible] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  
  // Smooth ring position using RAF
  const ringPos = useRef({ x: -100, y: -100 })
  const animFrameRef = useRef<number>(0)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      if (!visible) setVisible(true)
    }
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    const detectVariant = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('[data-cursor="drag"]')) setVariant('drag')
      else if (el.closest('[data-cursor="view"]')) setVariant('view')
      else if (el.closest('[data-cursor="hero"]')) setVariant('hero')
      else if (el.closest('a') || el.closest('button') || el.closest('[data-cursor="button"]')) setVariant('button')
      else setVariant('default')
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousemove', detectVariant)
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)

    // Smooth ring follow via RAF
    const animateRing = () => {
      if (ringRef.current) {
        ringPos.current.x += (mousePos.x - ringPos.current.x) * 0.12
        ringPos.current.y += (mousePos.y - ringPos.current.y) * 0.12
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`
      }
      animFrameRef.current = requestAnimationFrame(animateRing)
    }
    animFrameRef.current = requestAnimationFrame(animateRing)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousemove', detectVariant)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [mousePos.x, mousePos.y, visible])

  const ringSize = {
    default: 0,
    drag: 72,
    view: 72,
    button: 48,
    hero: 30,
  }[variant]

  const ringOpacity = visible && variant !== 'default' ? 1 : 0
  const showLabel = variant === 'drag' || variant === 'view'
  const label = variant === 'drag' ? 'GESER' : 'LIHAT'

  return (
    <>
      {/* Trailing ring (only visible on interactions) */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: `1px solid rgba(6, 182, 212, ${variant === 'button' ? 0.9 : 0.5})`,
          background: showLabel ? 'rgba(6, 182, 212, 0.08)' : 'transparent',
          backdropFilter: showLabel ? 'blur(4px)' : 'none',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: ringOpacity,
          transition: 'width 250ms cubic-bezier(0.25,0.46,0.45,0.94), height 250ms cubic-bezier(0.25,0.46,0.45,0.94), opacity 200ms ease, border-color 200ms ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {showLabel && (
          <span style={{
            fontFamily: 'var(--font-family-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#06b6d4',
            userSelect: 'none',
          }}>
            {label}
          </span>
        )}
      </div>

      {/* Fast dot (Claude-style lightweight aesthetic cursor) */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: variant === 'default' ? 8 : 6,
          height: variant === 'default' ? 8 : 6,
          borderRadius: '50%',
          background: variant === 'default' ? '#ffffff' : '#06b6d4',
          transform: `translate(${mousePos.x - (variant === 'default' ? 4 : 3)}px, ${mousePos.y - (variant === 'default' ? 4 : 3)}px)`,
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 10000,
          opacity: visible ? 1 : 0,
          transition: 'opacity 200ms ease, width 200ms ease, height 200ms ease, background-color 200ms ease',
        }}
      />
    </>
  )
}
