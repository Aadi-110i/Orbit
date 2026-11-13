"use client";

import React from "react";
import styles from "./auth-shell.module.css";

/**
 * Product panels that sit behind the auth card.
 *
 * These are real Orbit surfaces (the workspace container chrome: white title
 * bar with the drag grip, dark body) rendered as live HTML, so the sign-in
 * screen shows what the product actually looks like instead of decoration.
 */
export function AuthBackdrop() {
  return (
    <div className={styles.backdrop} aria-hidden>
      {/* -- Chat ----------------------------------------------- */}
      <div className={`${styles.panel} ${styles.panelLeft}`}>
        <div className={styles.panelHead}>
          <span className={styles.panelGrip}>
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className={styles.panelTitle}>New Chat</span>
          <span className={styles.panelAccent}>✦</span>
        </div>
        <div className={styles.panelBody}>
          <span className={`${styles.bubble} ${styles.bubbleUser}`}>
            Pull the landing copy into one paragraph
          </span>
          <span className={`${styles.bubble} ${styles.bubbleBot}`}>
            Done — it now leads with the infinite canvas, then the model comparison.
          </span>
        </div>
      </div>

      {/* -- Code ----------------------------------------------- */}
      <div className={`${styles.panel} ${styles.panelRight}`}>
        <div className={styles.panelHead}>
          <span className={styles.panelGrip}>
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className={styles.panelTitle}>useCanvasStore.ts</span>
          <span className={styles.panelAccent}>✦</span>
        </div>
        <div className={styles.panelBody}>
          <div className={styles.codeLine}>
            <span className={styles.codeKey}>export</span>
            <span>
              <span className={styles.codeKey}>const</span>{" "}
              <span className={styles.codeFn}>useCanvas</span> = () =&gt; {`{`}
            </span>
          </div>
          <div className={styles.codeLine}>
            <span className={styles.codeKey}>const</span>
            <span>
              {" "}
              <span className={styles.codeTag}>{`{ pan, zoom }`}</span> ={" "}
              <span className={styles.codeFn}>useStore</span>()
            </span>
          </div>
          <div className={styles.codeLine}>
            <span>
              <span className={styles.codeKey}>return</span>{" "}
              <span className={styles.codeTag}>{`{ pan, zoom }`}</span>
            </span>
          </div>
          <div className={styles.codeLine}>
            <span>{`}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
