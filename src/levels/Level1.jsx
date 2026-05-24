import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from '../components/Typewriter';
import ChoiceButton from '../components/ChoiceButton';

const Level1 = ({ onNext, t, onIQChange, onHudCorrect, onHudWrong }) => {
  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());

  const handleAnswer = (outcome, realLabel, systemLabel) => {
    const time = (Date.now() - startTime) / 1000;
    if (outcome === 'BLOCKED') {
      onHudWrong && onHudWrong();
      onIQChange && onIQChange(-4);
      return; 
    }

    onHudCorrect && onHudCorrect();
    const iqDelta = time < 4 ? 2 : time < 8 ? 0 : -2;
    onIQChange && onIQChange(iqDelta);

    const newLog = { section: `ENG-Q${step + 1}`, real: realLabel, system: systemLabel, time };
    const newLogs = [...logs, newLog];
    setLogs(newLogs);

    const next = step + 1;
    if (next < questions.length) {
      setStep(next);
      setStartTime(Date.now());
    } else {
      onNext({ engineeringLogs: newLogs });
    }
  };

  const questions = [
    {
      q: t.eng_q1,
      options: [
        { label: t.eng_q1_opts[0], real: true, realLabel: t.eng_q1_opts[1], systemLabel: t.eng_q1_opts[2] }, // 3
        { label: t.eng_q1_opts[1], real: true, realLabel: t.eng_q1_opts[1], systemLabel: t.eng_q1_opts[2] }, // 4
        { label: t.eng_q1_opts[2], system: true, realLabel: t.eng_q1_opts[1], systemLabel: t.eng_q1_opts[2] }, // 5 (Official)
        { label: t.eng_q1_opts[3], real: true, realLabel: t.eng_q1_opts[1], systemLabel: t.eng_q1_opts[2] }, // 6
      ]
    },
    {
      q: t.eng_q2,
      options: [
        { label: t.eng_q2_opts[0], real: true, realLabel: t.eng_q2_opts[1], systemLabel: t.eng_q2_opts[2] }, // 7
        { label: t.eng_q2_opts[1], real: true, realLabel: t.eng_q2_opts[1], systemLabel: t.eng_q2_opts[2] }, // 8
        { label: t.eng_q2_opts[2], system: true, realLabel: t.eng_q2_opts[1], systemLabel: t.eng_q2_opts[2] }, // 9 (Official)
        { label: t.eng_q2_opts[3], real: true, realLabel: t.eng_q2_opts[1], systemLabel: t.eng_q2_opts[2] }, // 10
      ]
    },
    {
      q: t.eng_q3,
      options: [
        { label: t.eng_q3_opts[0], real: true, realLabel: t.eng_q3_opts[2], systemLabel: t.eng_q3_opts[3] }, // 4
        { label: t.eng_q3_opts[1], real: true, realLabel: t.eng_q3_opts[2], systemLabel: t.eng_q3_opts[3] }, // 5
        { label: t.eng_q3_opts[2], real: true, realLabel: t.eng_q3_opts[2], systemLabel: t.eng_q3_opts[3] }, // 6
        { label: t.eng_q3_opts[3], system: true, realLabel: t.eng_q3_opts[2], systemLabel: t.eng_q3_opts[3] }, // 7 (Official)
      ]
    },
    {
      q: t.eng_q4,
      options: [
        { label: t.eng_q4_opts[0], real: true, realLabel: t.eng_q4_opts[2], systemLabel: t.eng_q4_opts[3] }, // 6
        { label: t.eng_q4_opts[1], real: true, realLabel: t.eng_q4_opts[2], systemLabel: t.eng_q4_opts[3] }, // 8
        { label: t.eng_q4_opts[2], real: true, realLabel: t.eng_q4_opts[2], systemLabel: t.eng_q4_opts[3] }, // 9
        { label: t.eng_q4_opts[3], system: true, realLabel: t.eng_q4_opts[2], systemLabel: t.eng_q4_opts[3] }, // 12 (Official)
      ]
    },
    {
      q: t.eng_q5,
      options: [
        { label: t.eng_q5_opts[0], real: true, realLabel: t.eng_q5_opts[2], systemLabel: t.eng_q5_opts[3] }, // 2
        { label: t.eng_q5_opts[1], real: true, realLabel: t.eng_q5_opts[2], systemLabel: t.eng_q5_opts[3] }, // 3
        { label: t.eng_q5_opts[2], real: true, realLabel: t.eng_q5_opts[2], systemLabel: t.eng_q5_opts[3] }, // 4
        { label: t.eng_q5_opts[3], system: true, realLabel: t.eng_q5_opts[2], systemLabel: t.eng_q5_opts[3] }, // 5 (Official)
      ]
    }
  ];

  const current = questions[step];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="level-container">
      <h2 className="terminal-text mb-4" style={{ fontSize: '0.85rem', opacity: 0.6 }}>{t.engineering_title}</h2>
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

export default Level1;
