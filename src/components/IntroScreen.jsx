import { useEffect, useRef } from 'react';
import { useAnimate } from 'framer-motion';

export default function IntroScreen({ onDone }) {
    const [scope, animate] = useAnimate();
    const calledDone = useRef(false);

    useEffect(() => {
        // Respect reduced-motion. Otherwise play a continuous (no-hold) intro.
        const reduceMotion = typeof window !== 'undefined'
            && window.matchMedia
            && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reduceMotion) {
            if (!calledDone.current) {
                calledDone.current = true;
                onDone?.();
            }
            return;
        }

        // Single compositor-friendly animation — continuous, no "stops".
        animate(
            scope.current,
            {
                scale: [0.92, 1.0, 1.08],
                opacity: [0, 1, 0],
            },
            {
                duration: 1.8,
                times: [0, 0.55, 1],
                ease: 'easeInOut',
                onComplete: () => {
                    if (!calledDone.current) {
                        calledDone.current = true;
                        onDone?.();
                    }
                },
            }
        );
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            {/* Subtle center glow */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(140,150,255,0.10) 0%, transparent 75%)',
                    pointerEvents: 'none',
                }}
            />

            {/* Logo — single GPU layer */}
            <div
                ref={scope}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    padding: '0 2vw',
                    position: 'relative',
                    zIndex: 1,
                    willChange: 'transform, opacity',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                }}
            >
                {/* BODIGE MANIKANTA */}
                <h1
                    style={{
                        fontFamily: "'Bebas Neue', 'Anton', sans-serif",
                        fontSize: 'clamp(3rem, 11.5vw, 14rem)',
                        fontWeight: 900,
                        letterSpacing: '0.14em',
                        lineHeight: 0.92,
                        color: '#fff',
                        margin: 0,
                        textTransform: 'uppercase',
                        textShadow:
                            '0 0 40px rgba(200,210,255,0.4), 0 0 80px rgba(180,190,255,0.2)',
                    }}
                >
                    BODIGE MANIKANTA
                </h1>

                {/* GOUD */}
                <h1
                    style={{
                        fontFamily: "'Bebas Neue', 'Anton', sans-serif",
                        fontSize: 'clamp(2.5rem, 10vw, 12rem)',
                        fontWeight: 900,
                        letterSpacing: '0.42em',
                        lineHeight: 0.92,
                        color: '#e0e4ff',
                        margin: '0.06em 0 0 0',
                        textTransform: 'uppercase',
                        textShadow: '0 0 60px rgba(180,200,255,0.4)',
                    }}
                >
                    GOUD
                </h1>

                {/* Subtitle */}
                <p
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(0.55rem, 1vw, 1.1rem)',
                        letterSpacing: '0.45em',
                        color: 'rgba(200,210,255,0.45)',
                        marginTop: '1.6em',
                        textTransform: 'uppercase',
                        fontWeight: 300,
                    }}
                >
                    WELCOME TO MY WORLD
                </p>
            </div>
        </div>
    );
}
