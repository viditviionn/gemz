import * as React from "react";

import Svg, { Path, type SvgProps } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={12}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      fillOpacity={0.85}
      d="M9.152 3.518h-.837a.18.18 0 0 0-.144.073L5 7.961l-3.17-4.37a.18.18 0 0 0-.145-.073H.848a.09.09 0 0 0-.072.141L4.71 9.085a.356.356 0 0 0 .577 0l3.935-5.426a.089.089 0 0 0-.071-.141Z"
    />
  </Svg>
);
export default SvgComponent;
