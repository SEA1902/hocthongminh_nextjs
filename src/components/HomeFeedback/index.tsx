import { useState } from "react";
import { Container, Rating } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import Animate from "../Animate";
import styles from "./homeFeedback.module.scss";

const dataFeedback = [
  {
    image: "/images/homeFeedback/phuonglinh.svg",
    name: "Nguyễn Phương Linh",
    content:
      "Trang web có kho đề rất phong phú, đa dạng, giao diện đẹp. Mình thấy luyện tập ở đây giúp việc học dễ dàng, hiệu quả hơn.",
    rate: 4,
  },
  {
    image: "/images/homeFeedback/dieuhuong.svg",
    name: "Nguyễn Diệu Hương",
    content:
      "Mình thấy web hiệu quả để ôn thi đại học vì cover khá nhiều môn , giao diện cũng dễ nhìn nữa!",
    rate: 5,
  },
  {
    image: "/images/homeFeedback/maianh.svg",
    name: "Trần Lê Mai Anh",
    content:
      "Nội dung bài tập rất hữu ích, mình thường xuyên luyện tập trên web tại nhà ❤️",
    rate: 4,
  },
  {
    image: "/images/homeFeedback/trungkien.svg",
    name: "Nguyễn Phúc Trung Kiên",
    content:
      "Mình nhận thấy web thực sự hữu ích cho học sinh, giao diện thân thiện, bài tập chi tiết và rõ ràng giúp các con dễ dàng luyện tập.",
    rate: 5,
  },
];
function HomeFeedback() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    const activeIndex = swiper.realIndex;
    setActiveSlideIndex(activeIndex);
  };

  const sliderSettings = {
    spaceBetween: 30,
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    wrapperClass: styles.swiper_feedback,
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
    },
  };
  return (
    <div className={styles.home_feedback}>
      <Container maxWidth="md">
        <Animate data_aos="zoom-in">
          <div className={styles.home_feedback_title}>
            Mọi người nghĩ gì về chúng tôi
          </div>
        </Animate>

        <Swiper {...sliderSettings} onSlideChange={handleSlideChange}>
          {dataFeedback.map((item, index) => (
            <SwiperSlide
              key={index}
              className={activeSlideIndex === index ? styles.active_slide : ""}
            >
              <div className={styles.item_feedback}>
                <div
                  className={styles.active_feedback}
                  style={activeSlideIndex === index ? { display: "block" } : {}}
                >
                  <img alt="" src="/images/homeFeedback/active-feedback.svg" />
                </div>
                <div className={styles.top_feedback}>
                  <div className={styles.image}>
                    <img src={item.image} alt="" />
                  </div>
                  <div>
                    <div className={styles.name}>{item.name}</div>
                    <div className={styles.rate}>
                      <Rating name="read-only" value={item.rate} readOnly />
                    </div>
                  </div>
                </div>
                <div className={styles.content_feedback}>{item.content}</div>
              </div>
            </SwiperSlide>
          ))}
          {dataFeedback.map((item, index) => (
            <SwiperSlide
              key={index + 4}
              className={
                activeSlideIndex === index + 4 ? styles.active_slide : ""
              }
            >
              <div className={styles.item_feedback}>
                <div
                  className={styles.active_feedback}
                  style={
                    activeSlideIndex === index + 4 ? { display: "block" } : {}
                  }
                >
                  <img alt="" src="/images/homeFeedback/active-feedback.svg" />
                </div>
                <div className={styles.top_feedback}>
                  <div className={styles.image}>
                    <img src={item.image} alt="" />
                  </div>
                  <div>
                    <div className={styles.name}>{item.name}</div>
                    <div className={styles.rate}>
                      <Rating name="read-only" value={item.rate} readOnly />
                    </div>
                  </div>
                </div>
                <div className={styles.content_feedback}>{item.content}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
}

export default HomeFeedback;
