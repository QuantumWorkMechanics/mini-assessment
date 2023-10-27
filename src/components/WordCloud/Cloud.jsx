import React, { useState } from "react";
import { Text } from "@visx/text";
import { scaleLog } from "@visx/scale";
import Wordcloud from "@visx/wordcloud/lib/Wordcloud";

export default function Cloud({ width, height, textString }) {
  const [spiralType, setSpiralType] = useState("archimedean");
  const [withRotation, setWithRotation] = useState(false);

  const colors = ["#143059", "#2F6B9A", "#82a6c2"];

  function getRotationDegree() {
    const rand = Math.random();
    const degree = rand > 0.5 ? 60 : -60;
    return rand * degree;
  }

  const words = [...textString];

  //   console.log({ words });

  let fontScale = scaleLog({
    domain: [Math.min(1), Math.max(words[0].value)],
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
          spiral={"archimedean"}
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
