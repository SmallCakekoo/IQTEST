import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from '../components/Typewriter';

const REMAP_SCHEMES = [
  { up: [-1,0], down: [1,0],  left: [0,-1], right: [0,1]  },  // R1 normal
  { up: [0,1],  down: [0,-1], left: [-1,0], right: [1,0]  },  // R2 90° CW
  { up: [1,0],  down: [-1,0], left: [0,1],  right: [0,-1] },  // R3 180°
  { up: [0,-1], down: [0,1],  left: [1,0],  right: [-1,0] },  // R4 90° CCW
];

const ROUNDS = 4;           // ← 4 rounds now
const GRID_SIZES = [5, 6, 7, 8];
const TIMEOUT_SECS = [22, 18, 14, 10];  // each harder
const ULTRA_ROTATE_MS = 3000; // R4: scheme rotates every 3s

const makeTarget = (grid) => ({ row: grid - 1, col: grid - 1 });

const LevelNav = ({ onNext, t, onIQChange }) => {
  const [round, setRound] = useState(0);
  const [grid, setGrid] = useState(GRID_SIZES[0]);
  const [pos, setPos] = useState({ row: 0, col: 0 });
  const [target, setTarget] = useState(makeTarget(GRID_SIZES[0]));
  const [timeLeft, setTimeLeft] = useState(TIMEOUT_SECS[0]);
  const [done, setDone] = useState(false);
  const [doneMsg, setDoneMsg] = useState('');
  const [logs, setLogs] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [typerDone, setTyperDone] = useState(false);

  // Ultra round: rotating scheme
  const [ultraSchemeIdx, setUltraSchemeIdx] = useState(0);
  const [ultraCountdown, setUltraCountdown] = useState(ULTRA_ROTATE_MS / 1000);
  const isUltra = round === ROUNDS - 1;

  const schemeIdx = isUltra ? ultraSchemeIdx : round;
  const scheme = REMAP_SCHEMES[schemeIdx % 4];

  // Ultra: rotate scheme every ULTRA_ROTATE_MS
  useEffect(() => {
    if (!isUltra || done || !typerDone) return;
    const id = setInterval(() => {
      setUltraSchemeIdx(i => (i + 1) % 4);
      setUltraCountdown(ULTRA_ROTATE_MS / 1000);
    }, ULTRA_ROTATE_MS);
    return () => clearInterval(id);
  }, [isUltra, done, typerDone]);

  useEffect(() => {
    if (!isUltra || done || !typerDone) return;
    const id = setInterval(() => setUltraCountdown(c => c > 1 ? c - 1 : ULTRA_ROTATE_MS / 1000), 1000);
    return () => clearInterval(id);
  }, [isUltra, done, typerDone]);

  const logsRef = useRef(logs);
  logsRef.current = logs;

  const advance = useCallback((time, adapted) => {
    onIQChange && onIQChange(adapted ? 3 : -2);
    const newLog = {
      section: `D-R${round + 1}`,
      real: 'NAVIGATE',
      system: adapted ? 'ADAPTED' : 'TIMEOUT',
      time,
    };
    const newLogs = [...logsRef.current, newLog];

    if (round + 1 < ROUNDS) {
      const nextRound = round + 1;
      const nextGrid = GRID_SIZES[nextRound];
      setRound(nextRound);
      setGrid(nextGrid);
      setTarget(makeTarget(nextGrid));
      setPos({ row: 0, col: 0 });
      setTimeLeft(TIMEOUT_SECS[nextRound]);
      setDone(false);
      setDoneMsg('');
      setStartTime(Date.now());
      setTyperDone(false);
      setUltraSchemeIdx(0);
      setUltraCountdown(ULTRA_ROTATE_MS / 1000);
      setLogs(newLogs);
    } else {
      onNext({ nav: newLogs });
    }
  }, [round, onIQChange, onNext]);

  // Timer
  useEffect(() => {
    if (done || !typerDone) return;
    if (timeLeft <= 0) {
      setDone(true);
      setDoneMsg(t.lnav_recalibrated);
      setTimeout(() => advance((Date.now() - startTime) / 1000, false), 2200);
      return;
    }
    const id = setInterval(() => setTimeLeft(s => s - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft, done, typerDone]);

  // Keys — enabled after typewriter completes
  const move = useCallback((delta) => {
    setPos(p => ({
      row: Math.max(0, Math.min(grid - 1, p.row + delta[0])),
      col: Math.max(0, Math.min(grid - 1, p.col + delta[1])),
    }));
  }, [grid]);

  useEffect(() => {
    if (!typerDone || done) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowUp')    { e.preventDefault(); move(scheme.up); }
      if (e.key === 'ArrowDown')  { e.preventDefault(); move(scheme.down); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); move(scheme.left); }
      if (e.key === 'ArrowRight') { e.preventDefault(); move(scheme.right); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [typerDone, done, scheme, move]);

  // Win check
  useEffect(() => {
    if (done) return;
    if (pos.row === target.row && pos.col === target.col) {
      setDone(true);
      setDoneMsg(t.lnav_adapted);
      const time = (Date.now() - startTime) / 1000;
      setTimeout(() => advance(time, true), 1800);
    }
  }, [pos, target, done]);

  const renderGrid = () => {
    const rows = [];
    for (let r = 0; r < grid; r++) {
      const cells = [];
      for (let c = 0; c < grid; c++) {
        const isP = pos.row === r && pos.col === c;
        const isT = target.row === r && target.col === c;
        cells.push(
          <span key={c} style={{
            display: 'inline-block',
            width: `${Math.max(28, 40 - grid * 2)}px`,
            textAlign: 'center',
            color: isP && isT ? '#fff' : isP ? '#00FF41' : isT ? '#ff3333' : '#1a5c1a',
            fontSize: grid > 6 ? '0.75rem' : '0.9rem',
          }}>
            {isP ? '[@]' : isT ? '[X]' : ' · '}
          </span>
        );
      }
      rows.push(<div key={r}>{cells}</div>);
    }
    return rows;
  };

  const isUrgent = timeLeft <= 5;
  const intro = isUltra ? t.lnav_ultra_intro : t.lnav_intro;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="level-container">
      <h2 className="terminal-text mb-1" style={{ fontSize: '0.85rem', opacity: 0.6 }}>{t.lnav_title}</h2>
      <div className="mb-2" style={{ fontSize: '0.7rem', opacity: 0.5 }}>{t.lnav_round(round + 1, ROUNDS)}</div>

      <div className="mb-4">
        <Typewriter text={intro} delay={14} onComplete={() => setTyperDone(true)} key={round} />
      </div>

      {round > 0 && !isUltra && (
        <p className="mb-3 error-text" style={{ fontSize: '0.68rem' }}>{t.lnav_remap_hint}</p>
      )}
      {isUltra && typerDone && !done && (
        <motion.p
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="mb-3 error-text"
          style={{ fontSize: '0.7rem' }}
        >
          {t.lnav_ultra_warning}{ultraCountdown}s
        </motion.p>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
        {/* Grid */}
        <div className="pixel-border" style={{ fontFamily: 'monospace', lineHeight: '1.7', padding: '10px' }}>
          {renderGrid()}
        </div>

        {/* Info + Buttons */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '10px' }}>
            <div className="terminal-text">POS [{pos.col},{pos.row}] → TGT [{target.col},{target.row}]</div>
            <div style={{ color: isUrgent ? '#ff3333' : 'var(--primary-color)', marginTop: '6px', fontWeight: 'bold' }}>
              ⏱ {timeLeft}s
            </div>
          </div>

          {typerDone && !done && (
            <div style={{ display: 'grid', gridTemplateColumns: '36px 36px 36px', gap: '3px', width: 'fit-content' }}>
              <div/>
              <button style={{ padding: '3px', fontSize: '1rem' }} onClick={() => move(scheme.up)}>↑</button>
              <div/>
              <button style={{ padding: '3px', fontSize: '1rem' }} onClick={() => move(scheme.left)}>←</button>
              <button style={{ padding: '3px', fontSize: '1rem' }} onClick={() => move(scheme.down)}>↓</button>
              <button style={{ padding: '3px', fontSize: '1rem' }} onClick={() => move(scheme.right)}>→</button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {done && doneMsg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
            <Typewriter text={doneMsg} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LevelNav;
