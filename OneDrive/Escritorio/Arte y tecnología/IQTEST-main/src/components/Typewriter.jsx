import  { useState, useEffect } from 'react';

const Typewriter = ({ text = '', delay = 30, onComplete, className = '', soundSrc = null, soundVolume = 0.8, soundDurationMs = null }) => {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  // Reset when text changes
  useEffect(() => {
    setDisplayed('');
    setIndex(0);
    setDone(false);
    let audio = null;
    let stopId = null;

    if (soundSrc && text) {
      audio = new Audio(soundSrc);
      audio.volume = Math.max(0, Math.min(1, soundVolume));
      audio.play().catch(() => {});

      if (Number.isFinite(soundDurationMs) && soundDurationMs > 0) {
        stopId = window.setTimeout(() => {
          audio.pause();
          audio.currentTime = 0;
        }, soundDurationMs);
      }
    }

    return () => {
      if (stopId) window.clearTimeout(stopId);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [text, soundSrc, soundVolume, soundDurationMs]);

  useEffect(() => {
    if (done) return;
    if (index < text.length) {
      const id = setTimeout(() => {
        setDisplayed(text.slice(0, index + 1));
        setIndex(i => i + 1);
      }, delay);
      return () => clearTimeout(id);
    } else {
      setDone(true);
      onComplete && onComplete();
    }
  }, [index, text, delay, done, onComplete]);

  // Render preserving newlines
  const lines = displayed.split('\n');

  return (
    <span className={`terminal-text ${className}`} style={{ whiteSpace: 'pre-wrap' }}>
      {displayed}
      {!done && <span className="cursor">|</span>}
    </span>
  );
};

export default Typewriter;
