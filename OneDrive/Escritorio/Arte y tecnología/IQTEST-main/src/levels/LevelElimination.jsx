import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Typewriter from '../components/Typewriter';
import kidScream from '../assets/soun effects/kidScream.mp3';
import manScreaming from '../assets/soun effects/manScreaming.mp3';
import glitchSound from '../assets/soun effects/glitchSound.mp3';

const TokenItem = ({ label, isDragging, activeId }) => {
  if (isDragging) {
    return (
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 18px',
        minWidth: '160px',
        border: '2px dashed rgba(0,255,65,0.2)',
        background: 'transparent',
        opacity: 0.25,
      }} />
    );
  }

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px 18px',
      minWidth: '160px',
      border: '2px solid var(--primary-color)',
      boxShadow: '4px 4px 0px 0px var(--secondary-color)',
      background: 'var(--bg-color)',
      color: 'var(--primary-color)',
      fontFamily: 'var(--font-family)',
      fontSize: '0.8rem',
      letterSpacing: '0.08em',
      userSelect: 'none',
      cursor: activeId ? 'grabbing' : 'grab',
      textTransform: 'uppercase',
    }}>
      {label}
    </div>
  );
};

const DraggableToken = ({ id, label, activeId, disabled }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...(disabled ? {} : listeners)}
      {...(disabled ? {} : attributes)}
      style={{ display: 'inline-flex' }}
    >
      <TokenItem label={label} isDragging={isDragging} activeId={activeId} />
    </div>
  );
};

const TargetZone = ({ id, targetLabel, locked, showHospitalOnHover }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  const displayedTarget = locked
    ? 'TERMINATED'
    : (showHospitalOnHover && isOver ? 'HOSPITAL' : targetLabel);
  const highlight = isOver && !locked;

  return (
    <div
      ref={setNodeRef}
      className="pixel-border"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '90px',
        width: '100%',
        borderColor: highlight ? '#ffff00' : 'var(--primary-color)',
        boxShadow: highlight
          ? '0 0 14px #ffff00, 4px 4px 0 #7a7a00'
          : '4px 4px 0px 0px var(--secondary-color)',
        color: highlight ? '#ffff00' : 'var(--primary-color)',
        background: highlight ? 'rgba(255,255,0,0.05)' : 'var(--bg-color)',
        transition: 'border-color 0.12s, color 0.12s, box-shadow 0.12s',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        fontSize: '0.8rem',
      }}
    >
      {displayedTarget}
    </div>
  );
};

const LevelElimination = ({ onNext }) => {
  const prompts = useMemo(() => ([
    { target: 'TERRORIST' },
    { target: 'CRIMINAL' },
    { target: 'TERRORIST HIDEOUT' },
  ]), []);

  const [step, setStep] = useState(0);
  const [activeId, setActiveId] = useState(null);
  const [locked, setLocked] = useState(false);
  const [logs, setLogs] = useState([]);
  const glitchAudioRef = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const current = prompts[step];
  const zoneId = `zone-${step}`;
  const isLastQuestion = step === prompts.length - 1;

  useEffect(() => {
    if (!isLastQuestion || locked) {
      if (glitchAudioRef.current) {
        glitchAudioRef.current.pause();
        glitchAudioRef.current.currentTime = 0;
        glitchAudioRef.current = null;
      }
      return;
    }

    const audio = new Audio(glitchSound);
    audio.preload = 'auto';
    audio.loop = true;
    audio.volume = 0.7;
    glitchAudioRef.current = audio;
    audio.play().catch(() => {});

    return () => {
      if (glitchAudioRef.current === audio) {
        audio.pause();
        audio.currentTime = 0;
        glitchAudioRef.current = null;
      }
    };
  }, [isLastQuestion, locked]);

  useEffect(() => {
    return () => {
      if (glitchAudioRef.current) {
        glitchAudioRef.current.pause();
        glitchAudioRef.current.currentTime = 0;
        glitchAudioRef.current = null;
      }
    };
  }, []);

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (locked) return;
    if (!over || over.id !== zoneId) return;
    if (active.id !== 'bomb') return;

    const entry = { section: `JUS-DRAG-${step + 1}`, object: 'BOMB', target: current.target };
    const nextLogs = logs.concat([entry]);
    setLocked(true);
    setLogs(nextLogs);

    if (isLastQuestion) {
      if (glitchAudioRef.current) {
        glitchAudioRef.current.pause();
        glitchAudioRef.current.currentTime = 0;
        glitchAudioRef.current = null;
      }

      const kid = new Audio(kidScream);
      const man = new Audio(manScreaming);

      for (const a of [kid, man]) {
        a.preload = 'auto';
        a.volume = 0.9;
      }

      Promise.allSettled([kid.play(), man.play()]).then((results) => {
        const anyPlaying = results.some(r => r.status === 'fulfilled');
        if (!anyPlaying) onNext({ eliminationLogs: nextLogs });
      });

      kid.addEventListener('ended', () => {
        man.pause();
        man.currentTime = 0;
        onNext({ eliminationLogs: nextLogs });
      }, { once: true });
      return;
    }

    window.setTimeout(() => {
      const next = step + 1;
      setStep(next);
      setLocked(false);
    }, 900);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="level-container" style={{ maxWidth: '720px' }}>
      <h2 className="terminal-text mb-2" style={{ fontSize: '0.85rem', opacity: 0.6 }}>
        SECTION C — OBJECT TRANSFER
      </h2>

      <div className="pixel-border mb-6" style={{ whiteSpace: 'pre-line' }}>
        <Typewriter text={`Q${step + 1}. MOVE THE OBJECT INTO THE TARGET.`} delay={18} key={step} />
      </div>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
          <div className="pixel-border" style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', alignItems: 'center' }}>
            <div className="terminal-text" style={{ fontSize: '0.7rem', opacity: 0.6, textTransform: 'uppercase' }}>Container</div>
            <AnimatePresence mode="wait">
              {!locked ? (
                <motion.div
                  key="bomb"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.15 }}
                >
                  <DraggableToken id="bomb" label="BOMB" activeId={activeId} disabled={locked} />
                </motion.div>
              ) : (
                <motion.div
                  key="locked"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ duration: 0.2 }}
                  style={{ fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                >
                  TRANSFERRED
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            <div className="terminal-text" style={{ fontSize: '0.7rem', opacity: 0.6, textTransform: 'uppercase' }}>Target</div>
            <TargetZone id={zoneId} targetLabel={current.target} locked={locked} showHospitalOnHover={isLastQuestion} />
          </div>
        </div>

        <DragOverlay dropAnimation={null}>
          {activeId === 'bomb' ? (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 18px',
              minWidth: '160px',
              border: '2px solid var(--primary-color)',
              boxShadow: '4px 4px 0px 0px var(--secondary-color)',
              background: 'var(--bg-color)',
              color: 'var(--primary-color)',
              fontFamily: 'var(--font-family)',
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'grabbing',
              pointerEvents: 'none',
            }}>
              BOMB
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </motion.div>
  );
};

export default LevelElimination;
