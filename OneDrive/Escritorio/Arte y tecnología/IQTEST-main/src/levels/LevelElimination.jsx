import React from 'react';
import { motion } from 'framer-motion';

const LevelElimination = ({ onNext, t }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="level-container">
      <h2 className="terminal-text mb-4" style={{ fontSize: '0.85rem', opacity: 0.6 }}>
        [ ESPACIO PARA EJERCICIO PRÁCTICO DE ELIMINACIÓN ]
      </h2>
      <p className="terminal-text mb-6">
        (Placeholder para el nivel a cargo de Pablo/Salomé)
      </p>
      <button onClick={() => onNext({ eliminationLogs: [] })}>CONTINUAR</button>
    </motion.div>
  );
};

export default LevelElimination;
