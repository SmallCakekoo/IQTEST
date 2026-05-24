import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from '../components/Typewriter';
import { BASE_IQ, IQ_MAX, IQ_MIN } from '../i18n';

const HIRE_THRESHOLD = 12; // iqDelta >= 12 → hired

const Level5 = ({ data, t }) => {
  // targetIQ is computed the same way as App.jsx footer — single source of truth
  const targetIQ = Math.min(IQ_MAX, Math.max(IQ_MIN, BASE_IQ + (data.iqDelta || 0)));

  // Start counter close to final value so it feels like a "last calibration"
  const startCount = Math.max(IQ_MIN, targetIQ - 25);
  const [displayIQ, setDisplayIQ] = useState(startCount);
  const [phase, setPhase] = useState('counting'); // counting → breakdown → reveal

  const [revealDone, setRevealDone] = useState(false);
  const [hiredDone, setHiredDone] = useState(false);

  const isHired = (data.iqDelta || 0) >= HIRE_THRESHOLD;

  // Flatten logs
  const allLogs = [
    ...(data.engineeringLogs || []),
    ...(data.languageLogs || []),
    ...(data.justiceLogs || []),
    ...(data.nav    || []),
    ...(data.level4 || []),
    ...(data.eliminationLogs || []),
    ...(data.rorschachLogs || []),
  ];

  // Counter
  useEffect(() => {
    if (phase !== 'counting') return;
    if (displayIQ < targetIQ) {
      const speed = targetIQ - displayIQ > 10 ? 55 : 90;
      const id = setTimeout(() => setDisplayIQ(v => v + 1), speed);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setPhase('breakdown'), 1000);
    return () => clearTimeout(id);
  }, [displayIQ, targetIQ, phase]);

  /* ── Breakdown table ── */
  const renderBreakdown = () => (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mb-8"
    >
      <h3 className="terminal-text mb-4" style={{ fontSize: '0.8rem', opacity: 0.55, letterSpacing: '0.08em' }}>
        {t.l5_breakdown_title}
      </h3>

      {/* Legend */}
      <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr 1fr 52px', gap: '8px', padding: '0 10px 6px', fontSize: '0.55rem', opacity: 0.35, borderBottom: '1px solid rgba(0,255,65,0.15)', marginBottom: '4px' }}>
        <span>{t.l5_col_section}</span>
        <span>{t.l5_col_real}</span>
        <span>{t.l5_col_system}</span>
        <span>{t.l5_col_time}</span>
      </div>

      {/* Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {allLogs.map((log, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '70px 1fr 1fr 52px',
            gap: '8px',
            padding: '7px 10px',
            fontSize: '0.65rem',
            borderBottom: '1px solid rgba(0,255,65,0.08)',
          }}>
            <span style={{ opacity: 0.5 }}>{log.section}</span>
            <span style={{ color: '#ff4444', wordBreak: 'break-word' }}>{log.real}</span>
            <span style={{ color: '#00FF41', wordBreak: 'break-word' }}>{log.system}</span>
            <span style={{ opacity: 0.45, whiteSpace: 'nowrap' }}>
              {typeof log.time === 'number' ? `${log.time.toFixed(1)}s` : '—'}
            </span>
          </div>
        ))}
      </div>

      {data.mergeResultLabel && (
        <p className="terminal-text mt-4" style={{ fontSize: '0.7rem', opacity: 0.65 }}>
          SYNTHESIS → <span style={{ color: '#00FF41' }}>{data.mergeResultLabel}</span>
        </p>
      )}

      <div className="mt-6">
        <button onClick={() => setPhase('reveal')}>{t.access_truth}</button>
      </div>
    </motion.div>
  );

  /* ── Reveal / Hired ── */
  const renderReveal = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pixel-border mt-4">
      {isHired ? (
        /* HIRED PATH */
        <>
          <p className="terminal-text mb-4" style={{ color: '#00FF41', fontWeight: 'bold', letterSpacing: '0.05em' }}>
            {t.l5_hired_title}
          </p>
          <Typewriter
            text={t.l5_hired(data.assignedName || 'CANDIDATE')}
            delay={28}
            onComplete={() => setHiredDone(true)}
          />
          {hiredDone && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <p className="terminal-text mt-6 mb-2 italic" style={{ opacity: 0.55, fontSize: '0.75rem' }}>
                {t.l5_baudrillard}
              </p>
              <p className="mt-2 mb-6" style={{ fontSize: '0.6rem', opacity: 0.35 }}>{t.l5_baudrillard_author}</p>
              <button onClick={() => window.location.reload()}>{t.l5_hired_btn}</button>
            </motion.div>
          )}
        </>
      ) : (
        /* REJECTION PATH */
        <>
          <Typewriter
            text={t.l5_compliance}
            delay={38}
            onComplete={() => setRevealDone(true)}
          />
          <AnimatePresence>
            {revealDone && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <p className="terminal-text mt-8 mb-2 italic" style={{ opacity: 0.65, fontSize: '0.78rem' }}>
                  {t.l5_baudrillard}
                </p>
                <p className="mb-8" style={{ fontSize: '0.6rem', opacity: 0.35 }}>{t.l5_baudrillard_author}</p>
                <p className="terminal-text mb-4">{t.l5_apply_again}</p>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <button onClick={() => window.location.reload()}>{t.l5_yes}</button>
                  <button onClick={() => window.location.reload()}>{t.l5_no}</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="level-container"
      style={{ maxWidth: '760px', overflowY: 'auto', maxHeight: '90vh' }}
    >
      {/* IQ display */}
      <div className="text-center mb-8">
        <motion.h1
          className="terminal-text"
          style={{ fontSize: '3.2rem', letterSpacing: '0.04em', lineHeight: 1.1 }}
        >
          {t.l5_iq}:<br />
          <span style={{ 
            color: targetIQ < 95 ? '#ff4444' : targetIQ >= 120 ? '#00ffcc' : '#00FF41',
            textShadow: `0 0 12px ${targetIQ < 95 ? '#ff4444' : targetIQ >= 120 ? '#00ffcc' : '#00FF41'}` 
          }}>
            {displayIQ}
          </span>
        </motion.h1>
        <p className="terminal-text mt-2" style={{ fontSize: '0.75rem', opacity: 0.45 }}>
          {t.identification}: {data.assignedName || 'EXP_32'}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'breakdown' && renderBreakdown()}
        {phase === 'reveal'    && renderReveal()}
      </AnimatePresence>
    </motion.div>
  );
};

export default Level5;
