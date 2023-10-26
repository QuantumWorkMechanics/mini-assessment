import React, { useState } from "react";
import { Text } from "@visx/text";
import { scaleLog } from "@visx/scale";
import Wordcloud from "@visx/wordcloud/lib/Wordcloud";
// import { totoAfricaLyrics } from "./text.fixture";

export default function Cloud({ width, height, textString }) {
  const [spiralType, setSpiralType] = useState("archimedean");
  const [withRotation, setWithRotation] = useState(false);

  const colors = ["#143059", "#2F6B9A", "#82a6c2"];
  function wordFreq(text) {
    const words = text.replace(/\./g, "").split(/\s/);
    const freqMap = {};

    for (const w of words) {
      if (!freqMap[w]) freqMap[w] = 0;
      freqMap[w] += 1;
    }
    return Object.keys(freqMap).map((word) => ({
      text: word,
      value: freqMap[word],
    }));
  }

  function getRotationDegree() {
    const rand = Math.random();
    const degree = rand > 0.5 ? 60 : -60;
    return rand * degree;
  }

  const words = wordFreq(textString);

  const fontScale = scaleLog({
    domain: [
      Math.min(...words.map((w) => w.value)),
      Math.max(...words.map((w) => w.value)),
    ],
    range: [10, 100],
  });
  const fontSizeSetter = (datum) => fontScale(datum.value);

  const fixedValueGenerator = () => 0.5;

  return (
    <div>
      <div className="wordcloud">
        <Wordcloud
          words={words}
          width={width}
          height={height}
          fontSize={fontSizeSetter}
          font={"Impact"}
          padding={2}
          spiral={spiralType}
          rotate={withRotation ? getRotationDegree : 0}
          random={fixedValueGenerator}
        >
          {(cloudWords) =>
            cloudWords.map((w, i) => (
              <Text
                key={w.text}
                fill={colors[i % colors.length]}
                textAnchor={"middle"}
                transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
                fontSize={w.size}
                fontFamily={w.font}
              >
                {w.text}
              </Text>
            ))
          }
        </Wordcloud>
      </div>
    </div>
  );
}
