import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Typewriter from '../components/Typewriter';

const LevelIntro = ({ onNext, t }) => {
  const [typed, setTyped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="level-container"
      style={{ maxWidth: '700px' }}
    >
      <div className="mb-2">
        <span className="terminal-text" style={{ fontSize: '0.7rem', opacity: 0.5 }}>
          {t.intro_year} &nbsp;|&nbsp; NEXIGEN CORP. ASSESSMENT PORTAL v7.3.1
        </span>
      </div>

      <h1 className="terminal-text mb-6" style={{ fontSize: '1.6rem', letterSpacing: '0.1em' }}>
        {t.intro_corp}
      </h1>

      <div className="pixel-border mb-8" style={{ lineHeight: '2' }}>
        <Typewriter
          text={t.intro_body}
          delay={18}
          onComplete={() => setTyped(true)}
        />
      </div>

      {typed && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <button onClick={onNext} style={{ fontSize: '1rem', padding: '0.8rem 2rem' }}>
            {t.begin}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LevelIntro;
