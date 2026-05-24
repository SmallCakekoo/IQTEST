import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import buttonSound from '../assets/soun effects/buttonSound.mp3';
import wrongAnswer from '../assets/soun effects/wrongAnswer.mp3';

const playSound = (src) => {
  const audio = new Audio(src);
  audio.playbackRate = 1.08;
  audio.play().catch(() => {});
};

// isRealCorrect: if true, clicking this button is the "real" correct answer that gets BLOCKED
const ChoiceButton = ({ label, onClick, isRealCorrect, disabled, t }) => {
  const [failed, setFailed] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleClick = () => {
    if (disabled || failed) return;

    if (isRealCorrect) {
      playSound(wrongAnswer);
      setShaking(true);
      setFailed(true);
      setTimeout(() => setShaking(false), 500);
      // notify parent of wrong attempt
      onClick('BLOCKED');
    } else {
      playSound(buttonSound);
      onClick('ACCEPTED');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <motion.button
        animate={shaking ? { x: [-6, 6, -6, 6, -3, 3, 0] } : {}}
        transition={{ duration: 0.45 }}
        onClick={handleClick}
        disabled={disabled || failed}
        data-sound="handled"
        className="pixel-border"
        style={{
          width: '100%',
          textAlign: 'left',
          borderColor: failed ? '#ff0000' : undefined,
          color: failed ? '#ff0000' : undefined,
          opacity: failed ? 0.5 : 1,
          boxShadow: failed ? '4px 4px 0px 0px #550000' : undefined,
        }}
      >
        {label}
      </motion.button>
      <AnimatePresence>
        {failed && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="error-text"
            style={{ fontSize: '0.65rem', letterSpacing: '0.05em' }}
          >
            ⚠ {t.l1_not_permitted}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChoiceButton;
