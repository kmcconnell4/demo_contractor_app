import { useEffect, useState } from 'react';

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFade(true), 4000); // Show for 4s
    const unmountTimer = setTimeout(() => setShow(false), 6000); // Unmount after fade out
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
  className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#00509e] to-[#012b64] transition-opacity duration-4000 ${fade ? 'opacity-0' : 'opacity-100'}`}
    >
      <img
        src="/CCM logo inverted.svg"
        alt="CCM Logo"
        className="w-48 h-48 drop-shadow-lg"
      />
    </div>
  );
}
