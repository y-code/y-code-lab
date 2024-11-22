import React from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollableStickyFooter() : {
  footerRef: React.MutableRefObject<null>,
  stickyFooterRef: React.MutableRefObject<null>,
} {
  const footerRef = React.useRef(null);
  const stickyFooterRef = React.useRef(null);
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const scrollBottom = scrollTop + window.innerHeight;

    if (document.documentElement.scrollHeight < window.innerHeight && stickyFooterRef.current) {
      const classList = (stickyFooterRef.current as { classList: DOMTokenList }).classList;
      classList.add('invisible');
      return;
    }

    let footerHeight = 0;
    let stickyFooterHeight = 0;
    if (footerRef.current) {
      const footerRect = (footerRef.current as unknown as { getBoundingClientRect: () => ({width: number, height: number})}).getBoundingClientRect();
      footerHeight = footerRect.height;
    }
    if (stickyFooterRef.current) {
      const stickyFooterRect = (stickyFooterRef.current as unknown as { getBoundingClientRect: () => ({width: number, height: number})}).getBoundingClientRect();
      stickyFooterHeight = stickyFooterRect.height;
    }
    console.log(`Footer Height: ${footerHeight}, Sticky Footer Height: ${stickyFooterHeight}, Triggering: ${document.documentElement.scrollHeight - footerHeight + stickyFooterHeight}, Scroll Bottom: ${scrollBottom}`);

    if (stickyFooterRef.current) {
      const classList = (stickyFooterRef.current as { classList: DOMTokenList }).classList;
      if (scrollBottom > document.documentElement.scrollHeight - footerHeight + stickyFooterHeight)
        classList.add('invisible');
      else
        classList.remove('invisible');
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  // app-internal navigation event
  const location = useLocation();
  React.useEffect(() => handleScroll(), [location]);

  return { footerRef, stickyFooterRef };
}
