import Image from "next/image";
import Image_placeholder_upright from "@/assets/images/Image_placeholder_upright.png";

export default function Preview() {
  <div className="bg-cover bg-center bg-no-repeat flex-1">
    <Image
      src={Image_placeholder_upright}
      alt="Image placeholder"
      layout="fill"
      objectFit="cover"
      priority
    />
  </div>;
}
