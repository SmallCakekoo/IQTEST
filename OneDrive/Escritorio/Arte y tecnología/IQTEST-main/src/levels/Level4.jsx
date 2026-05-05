import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Typewriter from '../components/Typewriter';

/* ─── Merge logic (internal English keys always) ─────────── */
const MERGE_TABLE = {
  'VOID+PULSE':   'SIGNAL',    'PULSE+VOID':   'SIGNAL',
  'GEAR+CODE':    'PROTOCOL',  'CODE+GEAR':    'PROTOCOL',
  'FIRE+WIRE':    'NETWORK',   'WIRE+FIRE':    'NETWORK',
  'ORDER+ECHO':   'LOOP',      'ECHO+ORDER':   'LOOP',
  'CHAOS+LOOP':   'ENTROPY',   'LOOP+CHAOS':   'ENTROPY',
  'SIGNAL+PROTOCOL': 'SYSTEM', 'PROTOCOL+SIGNAL': 'SYSTEM',
  'NETWORK+SYSTEM':  'INFRASTRUCTURE', 'SYSTEM+NETWORK': 'INFRASTRUCTURE',
  'INFRASTRUCTURE+ENTROPY': 'NEXIGEN_MODEL',
  'ENTROPY+INFRASTRUCTURE': 'NEXIGEN_MODEL',
};

const GLITCH = [
  'PROTO_VOID', 'ECHO_SYSTEM', 'NULL_SIGNAL',
  'CORRUPT_LOOP', 'GHOST_PROTOCOL', 'VOID_CONSTRUCT', 'FRACTURED_MESH',
];
const distort = (a, b) => GLITCH[(a.length + b.length) % GLITCH.length];
const mergeKeys = (a, b) => MERGE_TABLE[`${a}+${b}`] || distort(a, b);

/* RESULT_LABELS keys → plain English (used as fallback) */
const RESULT_LABELS_EN = {
  SIGNAL: 'SIGNAL', PROTOCOL: 'PROTOCOL', NETWORK: 'NETWORK',
  LOOP: 'LOOP', ENTROPY: 'ENTROPY', SYSTEM: 'SYSTEM',
  INFRASTRUCTURE: 'INFRASTRUCTURE', NEXIGEN_MODEL: 'NEXIGEN MODEL',
  PROTO_VOID: 'PROTO-VOID', ECHO_SYSTEM: 'ECHO-SYSTEM', NULL_SIGNAL: 'NULL SIGNAL',
  CORRUPT_LOOP: 'CORRUPT LOOP', GHOST_PROTOCOL: 'GHOST PROTOCOL',
  VOID_CONSTRUCT: 'VOID CONSTRUCT', FRACTURED_MESH: 'FRACTURED MESH',
};

const INITIAL_KEYS = ['VOID', 'PULSE', 'GEAR', 'CODE', 'FIRE', 'WIRE', 'ORDER', 'ECHO', 'CHAOS'];

/* ─── Draggable + Droppable Tile ───────────────────────────
   Key design: when dragging, render an INVISIBLE placeholder
   (same size, no border) so the flex layout leaves a real gap.
   DragOverlay renders the visible floating copy.
─────────────────────────────────────────────────────────── */
const TileItem = ({ id, label, isOver, isDragging }) => {
  if (isDragging) {
    // Invisible placeholder — keeps the gap in the flex layout
    return (
      <div style={{
        display: 'inline-flex',
        padding: '10px 16px',
        minWidth: '90px',
        border: '2px dashed rgba(0,255,65,0.2)',
        background: 'transparent',
        opacity: 0.3,
      }} />
    );
  }

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px 16px',
      minWidth: '90px',
      border: `2px solid ${isOver ? '#ffff00' : 'var(--primary-color)'}`,
      boxShadow: isOver
        ? '0 0 14px #ffff00, 4px 4px 0 #7a7a00'
        : '4px 4px 0px 0px var(--secondary-color)',
      background: isOver ? 'rgba(255,255,0,0.05)' : 'var(--bg-color)',
      color: isOver ? '#ffff00' : 'var(--primary-color)',
      fontFamily: 'var(--font-family)',
      fontSize: '0.75rem',
      letterSpacing: '0.08em',
      cursor: 'grab',
      userSelect: 'none',
      textAlign: 'center',
      transition: 'border-color 0.12s, color 0.12s, box-shadow 0.12s',
    }}>
      {label}
    </div>
  );
};

const DraggableTile = ({ tile, activeId }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: tile.id });
  const { setNodeRef: setDropRef, isOver } = useDroppable({ id: tile.id });

  const combinedRef = (el) => { setNodeRef(el); setDropRef(el); };

  return (
    <motion.div
      ref={combinedRef}
      layout
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.2 }}
      {...listeners}
      {...attributes}
    >
      <TileItem
        id={tile.id}
        label={tile.label}
        isOver={isOver && activeId !== null && activeId !== tile.id}
        isDragging={isDragging}
      />
    </motion.div>
  );
};

/* ─── Level 4 ───────────────────────────────────────────── */
const Level4 = ({ onNext, t, onIQChange }) => {
  const getLabel = (key) => (t.l4_tiles && t.l4_tiles[key]) || (t.l4_results && t.l4_results[key]) || key;

  const [tiles, setTiles] = useState(
    INITIAL_KEYS.map((key, i) => ({ id: String(i), key, label: getLabel(key) }))
  );
  const [history, setHistory] = useState([]);
  const [validated, setValidated] = useState(false);
  const [finalResultKey, setFinalResultKey] = useState('');
  const [activeId, setActiveId] = useState(null);
  const [startTime] = useState(Date.now());

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const activeTile = tiles.find(t => t.id === activeId);

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over || active.id === over.id) return;

    const srcIdx = tiles.findIndex(t => t.id === active.id);
    const tgtIdx = tiles.findIndex(t => t.id === over.id);
    if (srcIdx === -1 || tgtIdx === -1) return;

    const srcTile = tiles[srcIdx];
    const tgtTile = tiles[tgtIdx];
    const resultKey = mergeKeys(srcTile.key, tgtTile.key);
    const resultLabel = getLabel(resultKey);

    const newTiles = tiles.filter((_, i) => i !== srcIdx && i !== tgtIdx);
    const insertAt = Math.min(srcIdx, tgtIdx);
    newTiles.splice(insertAt, 0, { id: `m${Date.now()}`, key: resultKey, label: resultLabel });

    setTiles(newTiles);
    setHistory(h => [...h, { aLabel: srcTile.label, bLabel: tgtTile.label, resultLabel }]);
  };

  const handleFinalize = () => {
    if (validated || tiles.length === 0) return;
    const finalKey = tiles[0]?.key || 'VOID';
    const finalLabel = getLabel(finalKey);
    // look up result label from translations or fallback to English
    const displayLabel = (t.l4_results && t.l4_results[finalKey]) || RESULT_LABELS_EN[finalKey] || finalLabel;
    setFinalResultKey(finalKey);
    setValidated(true);
    onIQChange && onIQChange(2);
    setTimeout(() => {
      onNext({
        level4: [{ section: 'E', real: 'CREATIVE', system: finalKey, time: (Date.now() - startTime) / 1000 }],
        mergeResult: finalKey,
        mergeResultLabel: displayLabel,
      });
    }, 4000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="level-container" style={{ maxWidth: '700px' }}>
      <h2 className="terminal-text mb-2" style={{ fontSize: '0.85rem', opacity: 0.6 }}>{t.l4_title}</h2>

      {!validated && (
        <>
          <p className="terminal-text mb-1" style={{ fontSize: '0.78rem' }}>{t.l4_intro}</p>
          <p className="terminal-text mb-5" style={{ fontSize: '0.65rem', opacity: 0.45 }}>{t.l4_merge_instruction}</p>

          {/* Merge history */}
          {history.length > 0 && (
            <div className="mb-4" style={{ fontSize: '0.62rem', opacity: 0.55, lineHeight: '1.8' }}>
              {history.slice(-4).map((h, i) => (
                <div key={i}>
                  <span style={{ color: '#557755' }}>{h.aLabel}</span>
                  {' + '}
                  <span style={{ color: '#557755' }}>{h.bLabel}</span>
                  {' → '}
                  <span style={{ color: 'var(--primary-color)' }}>{h.resultLabel}</span>
                </div>
              ))}
            </div>
          )}

          <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            {/* Tile grid — uses motion layout so gap appears correctly */}
            <motion.div
              layout
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                minHeight: '60px',
                marginBottom: '2rem',
                alignItems: 'flex-start',
              }}
            >
              <AnimatePresence>
                {tiles.map(tile => (
                  <DraggableTile key={tile.id} tile={tile} activeId={activeId} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Floating drag ghost — identical to normal tile */}
            <DragOverlay dropAnimation={null}>
              {activeTile ? (
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 16px',
                  minWidth: '90px',
                  border: '2px solid var(--primary-color)',
                  boxShadow: '4px 4px 0px 0px var(--secondary-color)',
                  background: 'var(--bg-color)',
                  color: 'var(--primary-color)',
                  fontFamily: 'var(--font-family)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  textAlign: 'center',
                  cursor: 'grabbing',
                  pointerEvents: 'none',
                }}>
                  {activeTile.label}
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>

          <button onClick={handleFinalize} disabled={tiles.length === 0}>
            {t.l4_finalize}
          </button>
        </>
      )}

      {validated && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pixel-border mt-4">
          <Typewriter
            text={t.l4_trained((t.l4_results && t.l4_results[finalResultKey]) || RESULT_LABELS_EN[finalResultKey] || finalResultKey)}
            delay={30}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Level4;
