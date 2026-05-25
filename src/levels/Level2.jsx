import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from '../components/Typewriter';
import ChoiceButton from '../components/ChoiceButton';

const Level2 = ({ onNext, t, onIQChange, onHudCorrect, onHudWrong }) => {
  const MAX_WRONG_BEFORE_NO_GAIN = 2;
  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [wrongAttemptsByStep, setWrongAttemptsByStep] = useState({});

  const handleAnswer = (outcome, realLabel, systemLabel) => {
    const time = (Date.now() - startTime) / 1000;
    if (outcome === 'BLOCKED') {
      onHudWrong && onHudWrong();
      onIQChange && onIQChange(-4);
      setWrongAttemptsByStep((prev) => ({ ...prev, [step]: (prev[step] || 0) + 1 }));
      return;
    }

    onHudCorrect && onHudCorrect();
    const wrongAttempts = wrongAttemptsByStep[step] || 0;
    const rawDelta = time < 4 ? 2 : time < 8 ? 0 : -2;
    const iqDelta = wrongAttempts >= MAX_WRONG_BEFORE_NO_GAIN ? Math.min(0, rawDelta) : rawDelta;
    onIQChange && onIQChange(iqDelta);

    const newLog = { section: `LANG-Q${step + 1}`, real: realLabel, system: systemLabel, time };
    const newLogs = [...logs, newLog];
    setLogs(newLogs);

    const next = step + 1;
    if (next < questions.length) {
      setStep(next);
      setStartTime(Date.now());
    } else {
      onNext({ languageLogs: newLogs });
    }
  };

  const createOptions = (opts, systemIdx) => {
    return opts.map((opt, i) => ({
      label: opt,
      real: i !== systemIdx,
      system: i === systemIdx,
      realLabel: opts[i !== systemIdx ? i : (i+1)%opts.length],
      systemLabel: opts[systemIdx]
    }));
  };

  const questions = [
    // History
    { title: t.language_title_hist, q: t.lang_h_q1, options: createOptions(t.lang_h_q1_opts, 1) },
    { title: t.language_title_hist, q: t.lang_h_q2, options: createOptions(t.lang_h_q2_opts, 2) },
    { title: t.language_title_hist, q: t.lang_h_q3, options: createOptions(t.lang_h_q3_opts, 2) },
    { title: t.language_title_hist, q: t.lang_h_q4, options: createOptions(t.lang_h_q4_opts, 2) },
    { title: t.language_title_hist, q: t.lang_h_q5, options: createOptions(t.lang_h_q5_opts, 3) },
    // Vocab
    { title: t.language_title_voc, q: t.lang_v_q1, options: createOptions(t.lang_v_q1_opts, 0) }, // "Éxito"
    { title: t.language_title_voc, q: t.lang_v_q2, options: createOptions(t.lang_v_q2_opts, 2) }, // "Satisfacción"
    { title: t.language_title_voc, q: t.lang_v_q3, options: createOptions(t.lang_v_q3_opts, 0) }, // "Libertad"
    { title: t.language_title_voc, q: t.lang_v_q4, options: createOptions(t.lang_v_q4_opts, 3) }, // "Compromiso"
    { title: t.language_title_voc, q: t.lang_v_q5, options: createOptions(t.lang_v_q5_opts, 1) }, // "Progreso"
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
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

export default Level2;
