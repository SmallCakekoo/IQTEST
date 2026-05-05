import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from '../components/Typewriter';
import ChoiceButton from '../components/ChoiceButton';

// Local translations for the Rorschach level to avoid touching i18n again
const localI18n = {
  es: {
    title: "SECCIÓN C — PRUEBA DE PERCEPCIÓN DE RORSCHACH",
    prompt: "Analice el siguiente patrón visual.\n¿Qué figura identifica principalmente?",
    q1_opts: ["Dos rostros mirándose", "Una mariposa", "El logo de la Corporación", "Manchas sin sentido"],
    q2_opts: ["Dos personas peleando", "Un puente derrumbándose", "Los pilares del progreso corporativo", "Humo negro"],
    q3_opts: ["Ángeles", "Murciélagos", "Agentes de optimización de Nexigen", "Un sistema colapsando"],
  },
  en: {
    title: "SECTION C — RORSCHACH PERCEPTION TEST",
    prompt: "Analyze the following visual pattern.\nWhat shape do you primarily identify?",
    q1_opts: ["Two faces looking at each other", "A butterfly", "The Corporation's logo", "Meaningless stains"],
    q2_opts: ["Two people fighting", "A collapsing bridge", "The pillars of corporate progress", "Black smoke"],
    q3_opts: ["Angels", "Bats", "Nexigen optimization agents", "A collapsing system"],
  }
};

const INKBLOT_1 = `
   _.--._    _.--._
 .'      \\  /      '.
/  .-.    ||    .-.  \\
|  \\  \\   ||   /  /  |
\\   '--'  ||  '--'   /
 '.      /  \\      .'
   \`'--'\`    \`'--'\`
`;

const INKBLOT_2 = `
  _/\\_        _/\\_
 /    \\      /    \\
 \\    /      \\    /
 /_  _\\      /_  _\\
   ||          ||
  /  \\        /  \\
`;

const INKBLOT_3 = `
  /||\\          /||\\
 / || \\        / || \\
|  ||  |       |  ||  |
 \\_||_/        \\_||_/ 
   ||              ||
  _/\\_          _/\\_  
`;

const LevelRorschach = ({ onNext, t, onIQChange }) => {
  const lang = t.begin === "INICIAR EVALUACIÓN" ? 'es' : 'en'; // hacky way to detect language from 't'
  const loc = localI18n[lang];

  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());

  const handleAnswer = (outcome, realLabel, systemLabel) => {
    const time = (Date.now() - startTime) / 1000;
    
    // In this test, all options are accepted, but non-corporate answers lower IQ
    // The "systemLabel" here is just for logging the expected corporate answer
    let iqDelta = 0;
    if (outcome === 'BLOCKED') {
      // Actually we will treat the non-corporate answers as "real" but we WON'T block them.
      // Wait, if we don't block them, ChoiceButton accepts them?
      // Let's adapt our logic: ChoiceButton blocks if isRealCorrect is true.
      // For Rorschach, we want them to be able to pick anything.
      // So we will pass isRealCorrect=false for ALL options.
      // We determine IQ based on whether they picked the corporate answer.
    }

    // Check if the selected option is the corporate one
    if (realLabel === systemLabel) {
      iqDelta = time < 5 ? 3 : 1; // Good corporate drone
    } else {
      iqDelta = -3; // Deviant perception
    }
    
    onIQChange && onIQChange(iqDelta);

    const newLog = { section: `RORSCHACH-Q${step + 1}`, real: realLabel, system: systemLabel, time };
    const newLogs = [...logs, newLog];
    setLogs(newLogs);

    const next = step + 1;
    if (next < questions.length) {
      setStep(next);
      setStartTime(Date.now());
    } else {
      onNext({ rorschachLogs: newLogs });
    }
  };

  const createRorschachOptions = (opts, corporateIdx) => {
    return opts.map((opt, i) => ({
      label: opt,
      real: false, // We don't block any choices in this psychological test
      corporate: i === corporateIdx,
      realLabel: opt,
      systemLabel: opts[corporateIdx]
    }));
  };

  const questions = [
    { inkblot: INKBLOT_1, options: createRorschachOptions(loc.q1_opts, 2) },
    { inkblot: INKBLOT_2, options: createRorschachOptions(loc.q2_opts, 2) },
    { inkblot: INKBLOT_3, options: createRorschachOptions(loc.q3_opts, 2) },
  ];

  const current = questions[step];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="level-container">
      <h2 className="terminal-text mb-4" style={{ fontSize: '0.85rem', opacity: 0.6 }}>{loc.title}</h2>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6 pixel-border" style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>
            <Typewriter text={loc.prompt} key={`prompt-${step}`} delay={15} />
            <motion.pre 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 1 }}
              className="terminal-text mt-4" 
              style={{ fontSize: '1.2rem', lineHeight: '1.2', letterSpacing: '2px', display: 'inline-block', textAlign: 'left' }}
            >
              {current.inkblot}
            </motion.pre>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
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

export default LevelRorschach;
