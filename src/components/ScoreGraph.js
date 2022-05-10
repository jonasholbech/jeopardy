import { useEffect, useState } from "react";
import styles from "../screens/End.module.css";
export default function ScoreGraph({ player, score, highest, index }) {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight((score / highest) * 500);
  }, [highest, score]);
  return (
    <div className={styles.player} key={player}>
      <div className={styles.barwrapper}>
        <div
          style={{
            height: `${height}px`,
            transitionDelay: `${index * 1000}ms`,
          }}
          className={styles.bar}
        >
          {score}
        </div>
      </div>
      <div className={styles.name}>{player}</div>
    </div>
  );
}
