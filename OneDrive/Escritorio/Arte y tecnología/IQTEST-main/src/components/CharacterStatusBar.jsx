import { useMemo } from 'react';

import happyFace from '../assets/images/barra de vida/Bien.PNG';
import neutralFace from '../assets/images/barra de vida/Medio.PNG';
import sadFace from '../assets/images/barra de vida/Mal.png';

const clampValue = (value) => Math.max(0, Math.min(100, value));

const getFaceState = (happiness) => {
  if (happiness >= 70) return 'happy';
  if (happiness >= 35) return 'neutral';
  return 'sad';
};

const CharacterStatusBar = ({ assignedName, happiness = 90, reasoning = 10, t, showDebugControls = false }) => {
  const faceState = getFaceState(happiness);

  const faceSrc = useMemo(() => {
    if (faceState === 'happy') return happyFace;
    if (faceState === 'neutral') return neutralFace;
    return sadFace;
  }, [faceState]);

  const happinessLabel = t?.hud_happiness || 'Happiness';
  const reasoningLabel = t?.hud_reasoning || 'Reasoning';
  const correctLabel = t?.hud_correct || 'Correct';
  const wrongLabel = t?.hud_wrong || 'Wrong';
  const designationLabel = t?.identification || 'DESIGNATION';

  return (
    <div className="hud-wrap">
      <div className="hud">
        <div className="hud-side">
          <div className="hud-kv">
            <div className="hud-k">{designationLabel}</div>
            <div className="hud-v">{assignedName || '???'}</div>
          </div>
        </div>

        <div className="hud-face">
          <div className="hud-face-frame">
            <img src={faceSrc} alt={faceState} className="hud-face-img" />
          </div>
        </div>

        <div className="hud-side hud-side--meters">
          <div className="hud-meters">
            <div className="hud-meter">
              <div className="hud-meter-top">
                <span className="hud-meter-label">{happinessLabel}</span>
                <span className="hud-meter-value">{clampValue(happiness)}</span>
              </div>
              <div className="hud-meter-track">
                <div className="hud-meter-fill hud-meter-fill--happy" style={{ width: `${clampValue(happiness)}%` }} />
              </div>
            </div>

            <div className="hud-meter">
              <div className="hud-meter-top">
                <span className="hud-meter-label">{reasoningLabel}</span>
                <span className="hud-meter-value">{clampValue(reasoning)}</span>
              </div>
              <div className="hud-meter-track">
                <div className="hud-meter-fill hud-meter-fill--reason" style={{ width: `${clampValue(reasoning)}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDebugControls && (
        <div className="hud-controls">
          <button>{correctLabel}</button>
          <button>{wrongLabel}</button>
        </div>
      )}
    </div>
  );
};

export default CharacterStatusBar;
