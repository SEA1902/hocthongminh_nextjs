import { HTMLAttributes, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

interface AnimateProps extends HTMLAttributes<HTMLDivElement> {
  data_aos: string;
}
function Animate({ children, data_aos }: AnimateProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.init();
    }
  }, []);
  return <div data-aos={data_aos}>{children}</div>;
}

export default Animate;
