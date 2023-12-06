import * as React from "react";

import Svg, { Path, type SvgProps } from "react-native-svg";
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={10}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      fillOpacity={0.45}
      d="m5.578 5 2.93-3.492a.089.089 0 0 0-.068-.147h-.89a.182.182 0 0 0-.138.064l-2.417 2.88-2.416-2.88a.178.178 0 0 0-.137-.064h-.89a.089.089 0 0 0-.069.147L4.413 5l-2.93 3.492a.089.089 0 0 0 .068.146h.89a.182.182 0 0 0 .138-.063l2.416-2.881 2.417 2.88c.033.04.083.064.137.064h.89a.089.089 0 0 0 .069-.146L5.578 5Z"
    />
  </Svg>
);
export default SvgComponent;
