import { Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Animate from "../Animate";
import styles from "./homeUtils.module.scss";

const dataSwipper = [
  {
    image: "/images/homeUtils/image-1.png",
    description:
      "Học từ những sai lầm với những gợi ý thống kê quá trình học chi tiết",
  },
  {
    image: "/images/homeUtils/image-2.png",
    description:
      "Mục tiêu học tập rõ ràng với các chủ đề đã được tổng hợp sẵn từ chương trình học mới nhất",
  },
  {
    image: "/images/homeUtils/image-3.png",
    description: "Rèn luyện tư duy với các bài kiểm tra trắc nghiệm online",
  },
  {
    image: "/images/homeUtils/image-4.png",
    description:
      "Chủ động lập kế hoạch học tập hợp lý khi biết điểm mạnh yếu qua từng bài thi",
  },
];
function HomeUtils() {
  const sliderSettings = {
    spaceBetween: 30,
    slidesPerView: 1,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
    },
  };
  return (
    <div className={styles.home_utils}>
      <Container maxWidth="md">
        <Animate data_aos="zoom-in">
          <div className={styles.home_utils_header}>
            <div className={styles.home_utils_title}>Lợi ích</div>
            <div className={styles.home_utils_description}>
              Phương pháp phát triển khả năng tự học của Học Thông Minh
            </div>
          </div>
        </Animate>

        <div className={styles.home_utils_body}>
          <div className={styles.home_utils_image}>
            <img
              alt=""
              src="/images/phone-wrapper.png"
              className="home-image-phone"
            />
          </div>
          <Swiper {...sliderSettings}>
            {dataSwipper.map((item, index) => (
              <SwiperSlide key={index}>
                <div className={styles.util_item}>
                  <div className={styles.util_item_image}>
                    <img alt="" src={item.image} />
                  </div>
                  <div className={styles.util_item_des}>{item.description}</div>
                </div>
              </SwiperSlide>
            ))}
            {dataSwipper.map((item, index) => (
              <SwiperSlide key={index}>
                <div className={styles.util_item}>
                  <div className={styles.util_item_image}>
                    <img alt="" src={item.image} />
                  </div>
                  <div className={styles.util_item_des}>{item.description}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </div>
  );
}

export default HomeUtils;
