import Image from "next/image";
import * as React from "react";

const Preview: React.FC = () => {
  return (
    <>
      <Image
        src="/assets/Image_placeholder_upright.png"
        alt="hero"
        width={500}
        height={500}
      />
    </>
  );
};
export default Preview;
