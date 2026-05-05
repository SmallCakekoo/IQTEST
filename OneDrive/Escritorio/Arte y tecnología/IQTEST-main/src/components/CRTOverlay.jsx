import React from 'react';

const CRTOverlay = ({ children }) => {
  return (
    <div className="crt-container">
      {/* Content that is affected by the physical screen glitch */}
      <div className="glitch-layer">
        {children}
      </div>

      {/* CRT screen effects (scanlines, flicker, vignette) rendered ON TOP of content */}
      <div className="crt-overlay" />
      <div className="crt-vignette" />
    </div>
  );
};

export default CRTOverlay;
