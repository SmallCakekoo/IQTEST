import  { useEffect, useReducer } from 'react';
import { AnimatePresence } from 'framer-motion';
import CRTOverlay from './components/CRTOverlay';
import LevelIntro from './levels/LevelIntro';
import Level0 from './levels/Level0';
import Level1 from './levels/Level1';
import Level2 from './levels/Level2';
import Level3 from './levels/Level3';
import LevelNav from './levels/LevelNav';
import Level4 from './levels/Level4';
import Level5 from './levels/Level5';
import LevelElimination from './levels/LevelElimination';
import LevelRorschach from './levels/LevelRorschach';
import LevelStoryboard from './levels/LevelStoryboard';
import { translations, BASE_IQ, IQ_MAX, IQ_MIN } from './i18n';

import buttonSound from './assets/soun effects/buttonSound.mp3';
import ambience1 from './assets/soun effects/ambience1.mp3';
import ambience2 from './assets/soun effects/ambience2.mp3';

const playSound = (src) => {
  const audio = new Audio(src);
  audio.playbackRate = 1.08;
  audio.play().catch(() => {});
};

const initialState = {
  currentLevel: -3,  // -3 = lang select, -2 = storyboard, -1 = intro, 0..N = levels
  data: { iqDelta: 0 },
  lang: 'es',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LANG':
      return { ...state, lang: action.payload, currentLevel: -2 };
    case 'NEXT_LEVEL':
      return {
        ...state,
        currentLevel: state.currentLevel + 1,
        data: { ...state.data, ...action.payload },
      };
    case 'IQ_CHANGE':
      return {
        ...state,
        data: {
          ...state.data,
          iqDelta: (state.data.iqDelta || 0) + action.payload,
        },
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const t = translations[state.lang];

  useEffect(() => {
    const a1 = new Audio(ambience1);
    const a2 = new Audio(ambience2);

    for (const a of [a1, a2]) {
      a.preload = 'auto';
      a.loop = false;
      a.volume = 0.4;
    }

    let active = a1;
    let next = a2;
    let started = false;
    let waitingForGesture = false;

    const cleanupGesture = () => {
      window.removeEventListener('pointerdown', startFromGesture, true);
      window.removeEventListener('keydown', startFromGesture, true);
      waitingForGesture = false;
    };

    const requestGesture = () => {
      if (waitingForGesture) return;
      waitingForGesture = true;
      window.addEventListener('pointerdown', startFromGesture, true);
      window.addEventListener('keydown', startFromGesture, true);
    };

    const startFromGesture = () => {
      cleanupGesture();
      if (started) return;
      started = true;
      active.currentTime = 0;
      active.play().catch(() => {
        started = false;
        requestGesture();
      });
    };

    const onEnded = () => {
      const prev = active;
      active = next;
      next = prev;
      active.currentTime = 0;
      active.play().catch(() => {
        started = false;
        requestGesture();
      });
    };

    a1.addEventListener('ended', onEnded);
    a2.addEventListener('ended', onEnded);

    active.play()
      .then(() => {
        started = true;
      })
      .catch(() => {
        requestGesture();
      });

    return () => {
      cleanupGesture();
      a1.removeEventListener('ended', onEnded);
      a2.removeEventListener('ended', onEnded);
      a1.pause();
      a2.pause();
      a1.currentTime = 0;
      a2.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    const onClickCapture = (e) => {
      const target = e.target;
      const btn = target?.closest?.('button');
      if (!btn) return;
      if (btn.dataset.sound === 'handled' || btn.dataset.sound === 'mute') return;
      if (btn.disabled || btn.getAttribute('aria-disabled') === 'true') return;
      playSound(buttonSound);
    };

    document.addEventListener('click', onClickCapture, true);
    return () => document.removeEventListener('click', onClickCapture, true);
  }, []);

  const nextLevel = (payload = {}) => dispatch({ type: 'NEXT_LEVEL', payload });
  const setLang = (lang) => dispatch({ type: 'SET_LANG', payload: lang });
  const onIQChange = (delta) => dispatch({ type: 'IQ_CHANGE', payload: delta });

  const currentIQ = Math.min(IQ_MAX, Math.max(IQ_MIN, BASE_IQ + (state.data.iqDelta || 0)));


  const renderLevel = () => {
    // Language selector
    if (state.currentLevel === -3) {
      return (
        <div className="level-container" style={{ textAlign: 'center', maxWidth: '480px' }}>
          <p className="terminal-text mb-8" style={{ fontSize: '0.8rem', opacity: 0.6 }}>
            {translations.en.select_language}
          </p>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <button onClick={() => setLang('es')}>ESPAÑOL</button>
            <button onClick={() => setLang('en')}>ENGLISH</button>
          </div>
        </div>
      );
    }

    // Storyboard
    if (state.currentLevel === -2) {
      return <LevelStoryboard onNext={() => nextLevel()} t={t} />;
    }

    // Intro screen
    if (state.currentLevel === -1) {
      return <LevelIntro onNext={() => nextLevel()} t={t} />;
    }

    switch (state.currentLevel) {
      case 0:  return <Level0   onNext={nextLevel}             t={t} />;
      case 1:  
        if (state.data.role === 'engineering') return <Level1 onNext={nextLevel} onIQChange={onIQChange} t={t} />;
        if (state.data.role === 'language') return <Level2 onNext={nextLevel} onIQChange={onIQChange} t={t} />;
        if (state.data.role === 'justice') return <Level3 onNext={nextLevel} onIQChange={onIQChange} t={t} />;
        return <div className="terminal-text">// SYSTEM_HALT — NO_ROLE</div>;
      case 2:
        if (state.data.role === 'engineering') return <LevelNav onNext={nextLevel} onIQChange={onIQChange} t={t} />;
        if (state.data.role === 'language') return <LevelRorschach onNext={nextLevel} onIQChange={onIQChange} t={t} />;
        if (state.data.role === 'justice') return <LevelElimination onNext={nextLevel} onIQChange={onIQChange} t={t} />;
        return null;
      case 3:
        if (state.data.role === 'engineering') return <Level4 onNext={nextLevel} onIQChange={onIQChange} t={t} />;
        if (state.data.role === 'language') return <Level5 data={state.data} t={t} />;
        if (state.data.role === 'justice') return <Level5 data={state.data} t={t} />;
        return null;
      case 4:
        if (state.data.role === 'engineering') return <Level5 data={state.data} t={t} />;
        return <div className="terminal-text">// SYSTEM_HALT — UNKNOWN_STATE</div>;
      default: return <div className="terminal-text">// SYSTEM_HALT — UNKNOWN_STATE</div>;
    }
  };

  const totalLevels = state.data.role === 'engineering' ? 4 : 3;
  const showProgress = state.currentLevel >= 0;

  return (
    <CRTOverlay>
      <main style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          {renderLevel()}
        </AnimatePresence>

        {showProgress && (
          <div style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '2rem',
            right: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.65rem',
            opacity: 0.45,
            fontFamily: 'var(--font-family)',
          }}>
            <span>[ SEC {state.currentLevel} / {totalLevels} ]</span>
            <span>NEXIGEN CORP. — CANDIDATE: {state.data.assignedName || '???'}</span>
            <span style={{ 
              color: currentIQ < 95 ? '#ff4444' : 'var(--primary-color)',
              textShadow: `0 0 6px ${currentIQ < 95 ? '#ff4444' : 'var(--primary-color)'}`
            }}>
              IQ: {currentIQ}
            </span>
          </div>
        )}
      </main>
    </CRTOverlay>
  );
}

export default App;
