import { useEffect, useState } from 'react';

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFade(true), 3000);
    const hideTimer = setTimeout(() => setShow(false), 4500);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#00509e] to-[#012b64] transition-opacity duration-1500 ${fade ? 'opacity-0' : 'opacity-100'}`}
    >
      <img
        src="/CCM logo inverted.svg"
        alt="CCM Logo"
        className="w-48 h-48 drop-shadow-lg"
      />
    </div>
  );
}
