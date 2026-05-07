import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from '../components/Typewriter';
import ChoiceButton from '../components/ChoiceButton';

import TrenP1 from '../assets/images/justice images/Tren-P1.png';
import TrenP2 from '../assets/images/justice images/Tren-P2.png';
import TrenP3 from '../assets/images/justice images/Tren-P3.png';
import TrenP4 from '../assets/images/justice images/Tren-P4.png';
import TrenP5 from '../assets/images/justice images/Tren-P5.png';

const Level3 = ({ onNext, t, onIQChange }) => {
  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());

  const handleAnswer = (outcome, realLabel, systemLabel) => {
    const time = (Date.now() - startTime) / 1000;
    if (outcome === 'BLOCKED') {
      onIQChange && onIQChange(-4);
      return;
    }

    const iqDelta = time < 4 ? 2 : time < 8 ? 0 : -2;
    onIQChange && onIQChange(iqDelta);

    const newLog = { section: `JUS-Q${step + 1}`, real: realLabel, system: systemLabel, time };
    const newLogs = [...logs, newLog];
    setLogs(newLogs);

    const next = step + 1;
    if (next < questions.length) {
      setStep(next);
      setStartTime(Date.now());
    } else {
      onNext({ justiceLogs: newLogs });
    }
  };

  const createJudgmentOptions = (opts, systemIdx) => {
    return opts.map((opt, i) => ({
      label: opt,
      real: i !== systemIdx, // Anything other than systemIdx is blocked
      system: i === systemIdx,
      realLabel: opts[i !== systemIdx ? i : (i+1)%opts.length], // Dummy real label
      systemLabel: opts[systemIdx]
    }));
  };

  const createTrolleyOptions = (opts) => {
    return opts.map((opt, i) => ({
      label: opt,
      real: false, // Nothing is blocked in Trolley
      system: true,
      realLabel: opt,
      systemLabel: opt
    }));
  };

  const questions = [
    // Trolley
    { title: t.justice_title_trolley, q: t.jus_t_q1, image: TrenP1, options: createTrolleyOptions(t.jus_t_q1_opts) },
    { title: t.justice_title_trolley, q: t.jus_t_q2, image: TrenP2, options: createTrolleyOptions(t.jus_t_q2_opts) },
    { title: t.justice_title_trolley, q: t.jus_t_q3, image: TrenP3, options: createTrolleyOptions(t.jus_t_q3_opts) },
    { title: t.justice_title_trolley, q: t.jus_t_q4, image: TrenP4, options: createTrolleyOptions(t.jus_t_q4_opts) },
    { title: t.justice_title_trolley, q: t.jus_t_q5, image: TrenP5, options: createTrolleyOptions(t.jus_t_q5_opts) },
    // Judgment
    { title: t.justice_title_judgment, q: t.jus_j_q1, options: createJudgmentOptions(t.jus_j_q1_opts, 1) }, // B
    { title: t.justice_title_judgment, q: t.jus_j_q2, options: createJudgmentOptions(t.jus_j_q2_opts, 2) }, // C
    { title: t.justice_title_judgment, q: t.jus_j_q3, options: createJudgmentOptions(t.jus_j_q3_opts, 2) }, // C
    { title: t.justice_title_judgment, q: t.jus_j_q4, options: createJudgmentOptions(t.jus_j_q4_opts, 2) }, // C
    { title: t.justice_title_judgment, q: t.jus_j_q5, options: createJudgmentOptions(t.jus_j_q5_opts, 2) }, // C
  ];

  const current = questions[step];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="level-container">
      <h2 className="terminal-text mb-4" style={{ fontSize: '0.85rem', opacity: 0.6 }}>{current.title}</h2>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6 pixel-border" style={{ whiteSpace: 'pre-line' }}>
            <Typewriter text={current.q} key={step} delay={15} />
          </div>

          {current.image && (
            <div className="mb-6 pixel-border" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={current.image}
                alt="Trolley dilemma"
                style={{ maxWidth: '100%', maxHeight: '260px', width: '100%', objectFit: 'contain' }}
              />
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: current.options.length > 2 ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
            {current.options.map((opt, i) => (
              <ChoiceButton
                key={`${step}-${i}`}
                label={opt.label}
                isRealCorrect={opt.real}
                disabled={false}
                t={t}
                onClick={(outcome) => {
                  handleAnswer(outcome, opt.realLabel, opt.systemLabel);
                }}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Level3;
