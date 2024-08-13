import { useEffect, useState } from "react";

function TextGenAI({ text, delay, min }) {
  const timeoutInt = 50;
  const [showIndex, setShowIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, (4 * delay) / (delay % Math.floor(Math.random() * delay)));

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <div className="">
      {currentText.length < min && (
        <div className="flex gap-1">
          <div className="h-8 w-4 animate-bounce animate-duration-[300ms] animate-bounce ">
            <div className="rounded rounded full w-3 h-3 bg-slate-400 "></div>
          </div>

          {/* <div className="h-8 animate-bounce animate-duration-[300ms] animate-delay[200]   animate-bounce ">
            <div className="rounded w-2 h-2 bg-slate-400 "></div>
          </div>

          <div className="h-8 animate-bounce animate-duration-[300ms] animate-delay[400]  animate-bounce ">
            <div className="rounded w-2 h-2 bg-slate-400 "></div>
          </div> */}
        </div>
      )}
      {currentText.length > min && <div>{currentText}</div>}
    </div>
  );
}

export default TextGenAI;
