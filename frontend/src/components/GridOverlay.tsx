
export default function GridOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {/* Ellipse Glow + Fade */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 95% 85% at center calc(50% - 40px)
,
              rgba(186,153,255,0.25) 0%,
              rgba(186,153,255,0.20) 25%,
              rgba(249,247,242,0.8) 60%,
              rgba(249,247,242,1) 100%
            )
          `,
          maskImage: `
            radial-gradient(
              ellipse 120% 110% at center calc(50% - 40px)
,
              black 40%,
              transparent 100%
            )
          `,
          WebkitMaskImage: `
            radial-gradient(
              ellipse 120% 110% at center calc(50% - 40px)
,
              black 40%,
              transparent 100%
            )
          `,
        }}
      />

      {/* Grid Lines */}
      
          <div
        className="absolute inset-0 hidden lg:block"
        style={{
          backgroundSize: "80px 126px",
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.04) 1.8px, transparent  1.8px),
            linear-gradient(to bottom, rgba(0,0,0,0.04)  1.8px, transparent  1.8px)
          `,
          maskImage: `
            linear-gradient(
              to bottom,
              black 0%,
              black 88%,
              transparent 100%
            )
          `,
          WebkitMaskImage: `
            linear-gradient(
              to bottom,
              black 0%,
              black 40%,
              transparent 100%
            )
          `,
        }}
      />

      {/* TABLET GRID (Medium Rectangles) */}
      <div
        className="absolute inset-0 hidden sm:block lg:hidden"
        style={{
          backgroundSize: "55px 95px",
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)
          `,
          maskImage: `
            linear-gradient(
              to bottom,
              black 0%,
              black 65%,
              transparent 100%
            )
          `,
          WebkitMaskImage: `
            linear-gradient(
              to bottom,
              black 0%,
              black 35%,
              transparent 100%
            )
          `,
        }}
      />

      {/* MOBILE GRID (Tighter Rectangles) */}
      <div
        className="absolute inset-0 sm:hidden"
        style={{
          backgroundSize: "40px 70px",
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.05) 1.4px, transparent 1.4px),
            linear-gradient(to bottom, rgba(0,0,0,0.05) 1.4px, transparent 1.4px)
          `,
          maskImage: `
            linear-gradient(
              to bottom,
              black 0%,
              black 70%,
              transparent 100%
            )
          `,
          WebkitMaskImage: `
            linear-gradient(
              to bottom,
              black 0%,
              black 30%,
              transparent 100%
            )
          `,
        }}
      />
    

    </div>
  );
}
