import Image from "next/image";
// import Image_placeholder_upright from "@/assets/images/Image_placeholder_upright.png";\
import * as React from "react";

export default function Preview() {
  <React.Fragment className="bg-cover bg-center bg-no-repeat flex-1">
    <Image
      src={"@/assets/images/Image_placeholder_upright.png"}
      alt="Image placeholder"
      layout="fill"
      objectFit="cover"
      priority
    />
  </React.Fragment>;
}
