import { useEffect, useRef, useState } from 'react';

import neutralTypingSound from '../assets/soun effects/neutralTypingSound.mp3';

const Typewriter = ({ text = '', delay = 30, onComplete, className = '', soundSrc = undefined, soundVolume = 0.8, soundDurationMs = null }) => {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const audioRef = useRef(null);
  const stopIdRef = useRef(null);

  // Reset when text changes
  useEffect(() => {
    setDisplayed('');
    setIndex(0);
    setDone(false);
    if (stopIdRef.current) {
      window.clearTimeout(stopIdRef.current);
      stopIdRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    const resolvedSoundSrc = soundSrc === undefined ? neutralTypingSound : soundSrc;
    if (resolvedSoundSrc && text) {
      const audio = new Audio(resolvedSoundSrc);
      audioRef.current = audio;
      audio.loop = true;
      audio.volume = Math.max(0, Math.min(1, soundVolume));
      audio.play().catch(() => {});

      if (Number.isFinite(soundDurationMs) && soundDurationMs > 0) {
        stopIdRef.current = window.setTimeout(() => {
          if (!audioRef.current) return;
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }, soundDurationMs);
      }
    }

    return () => {
      if (stopIdRef.current) {
        window.clearTimeout(stopIdRef.current);
        stopIdRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, [text, soundSrc, soundVolume, soundDurationMs]);

  useEffect(() => {
    if (!done) return;
    if (stopIdRef.current) {
      window.clearTimeout(stopIdRef.current);
      stopIdRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }, [done]);

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

  return (
    <span className={`terminal-text ${className}`} style={{ whiteSpace: 'pre-wrap' }}>
      {displayed}
      {!done && <span className="cursor">|</span>}
    </span>
  );
};

export default Typewriter;
