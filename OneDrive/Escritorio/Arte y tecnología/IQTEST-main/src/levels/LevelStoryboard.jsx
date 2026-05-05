import React from 'react';
import { motion } from 'framer-motion';

const LevelStoryboard = ({ onNext, t }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="level-container">
      <h2 className="terminal-text mb-4" style={{ fontSize: '0.85rem', opacity: 0.6 }}>
        [ ESPACIO PARA STORYBOARD DE LA EMPRESA ]
      </h2>
      <p className="terminal-text mb-6">
        (Placeholder para el Storyboard a cargo de Salomé en 4-5 partes)
      </p>
      <button onClick={() => onNext()}>CONTINUAR AL CONTEXTO</button>
    </motion.div>
  );
};

export default LevelStoryboard;
