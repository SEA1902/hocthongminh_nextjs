import { useEffect, useState } from "react";
import styles from "./categoryTest.module.scss";
import Animate from "../Animate";
import { Container } from "@mui/material";

const tabs = [
  {
    label: "Đề thi ĐGNL",
    index: 1,
    description:
      "Tổng hợp mẫu các dạng đề thi đánh giá năng lực dưới dạng trắc nghiệm online của các trường với ngân hàng câu hỏi và đề thi lớn giúp bạn chuẩn bị tốt cho kì thi ĐGNL.",
    body: [
      {
        content: "Đề thi ĐGNL ĐHQG Hà Nội",
        link: "/",
      },
      {
        content: "Đề thi ĐGNL ĐHQG Hồ Chí Minh",
        link: "/",
      },
      {
        content: "Đề thi ĐGNL ĐHQG ĐHSP Hà Nội",
        link: "/",
      },
      {
        content: "Đề thi ĐGTD Bách Khoa",
        link: "/",
      },
      {
        content: "Đề thi ĐGNL Bộ Công An",
        link: "/",
      },
    ],
  },
  {
    label: "Luyện thi THPT",
    index: 2,
    description:
      "Luyện thi THPT QG các môn Toán, Lý, Hóa, Sinh, Sử, Địa, Giáo Dục Công Dân, Tiếng Anh với đề thi chọn lọc từ các trường và những dạng bài thi bám sát với chương trình thi đại học.",
    body: [
      {
        content: "Tiếng Anh",
        link: "/",
      },
      {
        content: "Toán",
        link: "/",
      },
      {
        content: "Vật Lý",
        link: "/",
      },
      {
        content: "Hóa Học",
        link: "/",
      },
      {
        content: "Sinh Học",
        link: "/",
      },
      {
        content: "Lịch Sử",
        link: "/",
      },
      {
        content: "Địa Lý",
        link: "/",
      },
      {
        content: "Ngữ Văn",
        link: "/",
      },
      {
        content: "Giáo Dục Công Dân",
        link: "/",
      },
    ],
  },
];
function CategoryTest() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [loading, setLoading] = useState(false);

  const handleSelectItem = (item: any) => {
    setSelectedTab(item);
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  useEffect(() => {
    const tabActive = document.querySelector(
      "#tab-selected"
    ) as HTMLElement | null;
    const tabLine = document.querySelector("#tabs-line") as HTMLElement | null;

    if (tabActive && tabLine) {
      tabLine.style.left = `${tabActive.offsetLeft + 40}px`;
      tabLine.style.width = `${tabActive.offsetWidth - 80}px`;
    }
  }, [selectedTab]);

  return (
    <div className={styles.category_test}>
      <Container maxWidth="md">
        <Animate translate={true} keep={false}>
          <div className={styles.category_test_header}>
            {tabs.map((item, index) => (
              <div
                key={index}
                id={`${selectedTab.index === item.index ? "tab-selected" : ""}`}
                className={`${styles.tabs_item} ${
                  selectedTab.index === item.index ? styles.tab_selected : ""
                }`}
                onClick={() => handleSelectItem(item)}
              >
                {item.label}
              </div>
            ))}
            <div id="tabs-line" className={styles.tabs_line}></div>
          </div>
        </Animate>

        <Animate translate={false} keep={true}>
          <div className={styles.category_test_description}>
            {selectedTab.description}
          </div>
        </Animate>

        {loading ? (
          <div className={styles.category_test_loading}></div>
        ) : (
          <div className={styles.category_test_body}>
            {selectedTab.body.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className={styles.category_test_item}
              >
                <div className={styles.box_item}>
                  <div className={styles.box_item_content}>{item.content}</div>
                </div>
              </a>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default CategoryTest;
