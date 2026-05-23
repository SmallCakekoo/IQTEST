import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from '../components/Typewriter';
import { ASSIGNED_NAMES } from '../i18n';
import glitchSound from '../assets/soun effects/glitchSound.mp3';

const Level0 = ({ onNext, t }) => {
  const CORRUPT_SOUND_MS = 8000;

  const [gender, setGender] = useState(null);   // 'male' | 'female' | 'neutral'
  const [name, setName] = useState('');
  const [role, setRole] = useState(null);       // 'engineering' | 'language' | 'justice'
  const [submittedName, setSubmittedName] = useState(false);
  const [submittedRole, setSubmittedRole] = useState(false);
  const [corruptDone, setCorruptDone] = useState(false);
  const [typed, setTyped] = useState(false);

  const corruptionStartMsRef = useRef(null);
  const corruptionDoneTimeoutRef = useRef(null);
  const glitchAudioRef = useRef(null);
  const glitchStopTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (corruptionDoneTimeoutRef.current) clearTimeout(corruptionDoneTimeoutRef.current);
      if (glitchStopTimeoutRef.current) clearTimeout(glitchStopTimeoutRef.current);
      if (glitchAudioRef.current) {
        glitchAudioRef.current.pause();
        glitchAudioRef.current.currentTime = 0;
      }
    };
  }, []);

  const assignedName = useMemo(() => {
    const list = ASSIGNED_NAMES[gender] || ASSIGNED_NAMES.neutral;
    return list[Math.floor(Math.random() * list.length)];
  }, [gender]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) setSubmittedName(true);
  };

  const handleRoleSelect = (selectedRole) => {
    if (glitchStopTimeoutRef.current) {
      clearTimeout(glitchStopTimeoutRef.current);
      glitchStopTimeoutRef.current = null;
    }
    if (glitchAudioRef.current) {
      glitchAudioRef.current.pause();
      glitchAudioRef.current.currentTime = 0;
    }

    const audio = new Audio(glitchSound);
    audio.preload = 'auto';
    audio.volume = 0.8;
    audio.playbackRate = 1.0;
    audio.play().catch(() => {});
    glitchAudioRef.current = audio;
    glitchStopTimeoutRef.current = setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, CORRUPT_SOUND_MS);

    setRole(selectedRole);
    corruptionStartMsRef.current = performance.now();
    setSubmittedRole(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="level-container"
    >
      {/* Step 1: Gender */}
      {!gender && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div className="mb-6">
            <Typewriter text={t.gender_prompt} delay={18} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: '340px', width: '100%' }}>
            <button onClick={() => setGender('male')}>{t.gender_male}</button>
            <button onClick={() => setGender('female')}>{t.gender_female}</button>
            <button onClick={() => setGender('neutral')}>{t.gender_neutral}</button>
          </div>
        </motion.div>
      )}

      {/* Step 2: Name */}
      {gender && !submittedName && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <form onSubmit={handleNameSubmit}>
            <div className="mb-6">
              <Typewriter text={t.system_access} onComplete={() => setTyped(true)} />
            </div>
            {typed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mb-3">
                  <Typewriter text={t.enter_name} delay={18} />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
                <div className="mt-6">
                  <button type="submit">{t.confirm_identity}</button>
                </div>
              </motion.div>
            )}
          </form>
        </motion.div>
      )}

      {/* Step 3: Role */}
      {submittedName && !submittedRole && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div className="mb-6">
            <Typewriter text={t.role_prompt} delay={18} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: '340px', width: '100%' }}>
            <button onClick={() => handleRoleSelect('engineering')}>{t.role_engineering}</button>
            <button onClick={() => handleRoleSelect('language')}>{t.role_language}</button>
            <button onClick={() => handleRoleSelect('justice')}>{t.role_justice}</button>
          </div>
        </motion.div>
      )}

      {/* Step 4: Corruption + reassignment */}
      {submittedRole && (
        <div>
          {!corruptDone ? (
            <Typewriter
              text={`[HASH_MISMATCH] ... [CORRUPTION_DETECTED] ... OVERWRITING_IDENTITY ...`}
              delay={18}
              onComplete={() => {
                const start = corruptionStartMsRef.current ?? performance.now();
                const elapsed = performance.now() - start;
                const remaining = Math.max(0, CORRUPT_SOUND_MS - elapsed);

                if (corruptionDoneTimeoutRef.current) {
                  clearTimeout(corruptionDoneTimeoutRef.current);
                }

                corruptionDoneTimeoutRef.current = setTimeout(() => {
                  setCorruptDone(true);
                }, remaining);
              }}
            />
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Typewriter
                text={t.identity_registered(assignedName)}
                onComplete={() => {
                  setTimeout(() => onNext({ realName: name, assignedName, gender, role }), 2500);
                }}
              />
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Level0;
