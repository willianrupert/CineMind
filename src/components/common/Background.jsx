import React from 'react';

// A more detailed, tileable SVG for a realistic film strip with sprocket holes.
// It includes a subtle gradient for depth and cutouts that match the page background.
const filmStripSVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='200'%3E%3Cdefs%3E%3ClinearGradient id='filmStripGradient' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0%25' stop-color='%23381127' /%3E%3Cstop offset='50%25' stop-color='%234a1833' /%3E%3Cstop offset='100%25' stop-color='%23381127' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='150' height='200' fill='url(%23filmStripGradient)'/%3E%3Crect x='25' y='15' width='100' height='170' rx='8' fill='%23100812' stroke='%23552244' stroke-width='1'/%3E%3Crect x='6' y='20' width='10' height='10' rx='2' fill='%23100812'/%3E%3Crect x='6' y='45' width='10' height='10' rx='2' fill='%23100812'/%3E%3Crect x='6' y='70' width='10' height='10' rx='2' fill='%23100812'/%3E%3Crect x='6' y='95' width='10' height='10' rx='2' fill='%23100812'/%3E%3Crect x='6' y='120' width='10' height='10' rx='2' fill='%23100812'/%3E%3Crect x='6' y='145' width='10' height='10' rx='2' fill='%23100812'/%3E%3Crect x='6' y='170' width='10' height='10' rx='2' fill='%23100812'/%3E%3Crect x='134' y='20' width='10' height='10' rx='2' fill='%23100812'/%3E%3Crect x='134' y='45' width='10' height='10' rx='2' fill='%23100812'/%3E%3Crect x='134' y='70' width='10' height='10' rx='2' fill='%23100812'/%3E%3Crect x='134' y='95' width='10' height='10' rx='2' fill='%23100812'/%3E%3Crect x='134' y='120' width='10' height='10' rx='2' fill='%23100812'/%3E%3Crect x='134' y='145' width='10' height='10' rx='2' fill='%23100812'/%3E%3Crect x='134' y='170' width='10' height='10' rx='2' fill='%23100812'/%3E%3C/svg%3E`;

// An elegant, tileable SVG for a neural network pattern with a hexagonal base and glowing nodes.
const elegantNeuralNetworkSVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cdefs%3E%3Cfilter id='glow' x='-50%25' y='-50%25' width='200%25' height='200%25'%3E%3CfeGaussianBlur stdDeviation='1' result='blur'/%3E%3C/filter%3E%3C/defs%3E%3Cg stroke='%23D93F6E' stroke-width='0.25'%3E%3Cpath d='M60 0 L120 30 L120 90 L60 120 L0 90 L0 30 Z'/%3E%3Cpath d='M60 0 L60 40'/%3E%3Cpath d='M0 30 L60 40'/%3E%3Cpath d='M0 90 L60 80'/%3E%3Cpath d='M60 120 L60 80'/%3E%3Cpath d='M120 90 L60 80'/%3E%3Cpath d='M120 30 L60 40'/%3E%3C/g%3E%3Cg fill='%23D93F6E'%3E%3Ccircle cx='60' cy='0' r='1.5' filter='url(%23glow)'/%3E%3Ccircle cx='0' cy='30' r='1.5' filter='url(%23glow)'/%3E%3Ccircle cx='0' cy='90' r='1.5' filter='url(%23glow)'/%3E%3Ccircle cx='60' cy='120' r='1.5' filter='url(%23glow)'/%3E%3Ccircle cx='120' cy='90' r='1.5' filter='url(%23glow)'/%3E%3Ccircle cx='120' cy='30' r='1.5' filter='url(%23glow)'/%3E%3Ccircle cx='60' cy='40' r='1' filter='url(%23glow)'/%3E%3Ccircle cx='60' cy='80' r='1' filter='url(%23glow)'/%3E%3C/g%3E%3C/svg%3E`;


const Background = () => {
  return (
    <>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#100812] via-[#100812]/90 to-black"></div>
      <div 
        className="absolute inset-0 z-0 opacity-25 animate-neural-net"
        style={{
          backgroundImage: `url("${elegantNeuralNetworkSVG}")`,
          backgroundSize: '240px 240px',
        }}
      ></div>
      
      {/* Left Filmstrip */}
      <div 
        className="absolute left-0 top-0 h-full w-40 md:w-56 z-0 opacity-95" 
        style={{ 
          backgroundImage: `url("${filmStripSVG}")`,
          backgroundSize: '100% auto'
        }}
      ></div>

      {/* Right Filmstrip */}
      <div 
        className="absolute right-0 top-0 h-full w-40 md:w-56 z-0 opacity-95" 
        style={{ 
          backgroundImage: `url("${filmStripSVG}")`,
          backgroundSize: '100% auto',
          transform: 'scaleX(-1)' // Flip for symmetry
        }}
      ></div>
    </>
  );
};

export default Background;
