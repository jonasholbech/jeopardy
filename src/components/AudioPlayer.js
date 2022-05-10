import { useRef, useEffect } from "react";
export default function AudioPlayer() {
  const audioEl = useRef(null);

  useEffect(() => {
    function handleKeyDown(evt) {
      console.log(evt);
      switch (evt.key) {
        case "1":
          play("correct");
          break;
        case "2":
          play("wrong");
          break;
        case "3":
          play("rimshot");
          break;
        default:
          break;
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  function play(sound) {
    audioEl.current.src = `audio/${sound}.mp3`;
    audioEl.current.currentTime = 0;
    audioEl.current.play();
  }
  return <audio ref={audioEl}></audio>;
}
