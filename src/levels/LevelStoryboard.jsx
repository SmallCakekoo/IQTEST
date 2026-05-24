import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "../components/Typewriter";

import frame1 from "../assets/images/Storyboard images/frame 1.gif";
import frame2 from "../assets/images/Storyboard images/frame 2.gif";
import frame3 from "../assets/images/Storyboard images/frame 3.gif";
import frame4 from "../assets/images/Storyboard images/frame 4.gif";

const LevelStoryboard = ({ onNext, t }) => {
  const scenes = useMemo(() => ([
    {
      image: frame1,
      text: t.storyboard_scene_1,
    },
    {
      image: frame2,
      text: t.storyboard_scene_2,
    },
    {
      image: frame3,
      text: t.storyboard_scene_3,
    },
    {
      image: frame4,
      text: t.storyboard_scene_4,
    },
  ]), [t]);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [typedDone, setTypedDone] = useState(false);

  const currentScene = scenes[sceneIndex];
  const isLastScene = sceneIndex === scenes.length - 1;

  useEffect(() => {
    setTypedDone(false);
  }, [sceneIndex]);

  useEffect(() => {
    if (!typedDone || isLastScene) return;
    const wait = window.setTimeout(() => setSceneIndex((prev) => prev + 1), 5000);
    return () => window.clearTimeout(wait);
  }, [typedDone, isLastScene]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        width: "100%",
        height: "100vh",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "min(760px, 92vw)",

          display: "flex",
          flexDirection: "column",

          gap: "0.7rem",
        }}
      >
        {/* TITULO */}
        <h1
          style={{
            textAlign: "center",

            margin: 0,

            fontSize: "1.7rem",

            color: "var(--primary-color)",
          }}
        >
          NEXIGEN
        </h1>

        {/* GIF */}
        <div
          style={{
            width: "fit-content",
            maxWidth: "100%",
            margin: "0 auto",
            border: "2px solid var(--primary-color)",
          }}
        >
          <img
            src={currentScene.image}
            alt="scene"
            style={{
              display: "block",
              height: "360px",
              width: "auto",
              maxWidth: "100%",
            }}
          />
        </div>

        {/* TEXTO */}
        <div
          style={{
            border: "2px solid var(--primary-color)",

            padding: "1rem",

            minHeight: "110px",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              margin: 0,

              width: "100%",

              textAlign: "center",

              lineHeight: "1.5",

              fontSize: "0.9rem",

              color: "var(--primary-color)",

              wordBreak: "break-word",
            }}
          >
            <Typewriter
              text={currentScene.text}
              delay={35}
              key={sceneIndex}
              onComplete={() => setTypedDone(true)}
            />
          </p>
        </div>

        {/* BOTON */}
        {isLastScene && typedDone && (
            <button
              onClick={onNext}
              style={{
                alignSelf: "center",
              }}
            >
              {t.storyboard_continue}
            </button>
          )}
      </div>
    </motion.div>
  );
};

export default LevelStoryboard;
