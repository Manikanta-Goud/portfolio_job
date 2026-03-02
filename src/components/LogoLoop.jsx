import { useEffect, useRef } from 'react';
import './LogoLoop.css';

const LogoLoop = ({
    items = [],
    speed = 40,
    fadeEdges = true,
    fadeColor = '#000',
    logoHeight = 28,
    gap = 32,
    scaleOnHover = false,
}) => {
    const trackRef = useRef(null);
    const animRef = useRef(null);
    const posRef = useRef(0);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        let last = null;

        const animate = (ts) => {
            if (last !== null) {
                posRef.current -= (speed * (ts - last)) / 1000;
                const listWidth = track.children[0]?.offsetWidth || 1;
                if (Math.abs(posRef.current) >= listWidth) {
                    posRef.current += listWidth;
                }
                track.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
            }
            last = ts;
            animRef.current = requestAnimationFrame(animate);
        };

        animRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animRef.current);
    }, [speed]);

    const list = [...items, ...items];

    return (
        <div
            className={`logoloop${fadeEdges ? ' logoloop--fade' : ''}${scaleOnHover ? ' logoloop--scale-hover' : ''}`}
            style={{ '--logoloop-gap': `${gap}px`, '--logoloop-logoHeight': `${logoHeight}px`, '--logoloop-fadeColor': fadeColor }}
        >
            <div className="logoloop__track" ref={trackRef}>
                {[0, 1].map((copy) => (
                    <ul className="logoloop__list" key={copy} aria-hidden={copy === 1}>
                        {list.map((item, i) => (
                            <li className="logoloop__item" key={i}>
                                {item.href ? (
                                    <a className="logoloop__link" href={item.href} target="_blank" rel="noopener noreferrer">
                                        <span className="logoloop__node">{item.content}</span>
                                    </a>
                                ) : (
                                    <span className="logoloop__node">{item.content}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    );
};

export default LogoLoop;
