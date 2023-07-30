import Link from "next/link";
import Image from "next/image";
import { Container } from "@mui/material";
import Animate from "../Animate";
import styles from "./knowledgeView.module.scss";

function KnowledgeView() {
  const dataKnowledge = [
    {
      image:
        "/images/Knowledge/Dac-trung-cac-the-tho-chinh-va-su-hinh-thanh-1.jpg",
      name: "Ngữ văn 12: Luật thơ – Đặc trưng, các thể thơ chính và sự hình thành luật thơ",
      description:
        "Luật thơ trong ngữ văn là một khía cạnh quan trọng, nó không chỉ tạo nên sự hài hòa âm vận trong các tác phẩm thơ, mà còn góp phần định hình và phát triển các thể thơ chính. Đồng thời đây cũng là phần nội dung kiến thức nằm trong chương trình thi THPT …",
    },
    {
      image: "/images/Knowledge/Nhung-cot-moc-dang-nho-nhat-2.jpg",
      name: "Lịch sử 11: Lý thuyết và các dạng bài tập củng cố kiến thức lịch sử Trung Quốc",
      description:
        "Vào những năm cuối của thế kỷ XX, châu Á có những biến đổi lớn. Trong đó, Trung Quốc – một quốc gia rộng lớn, có nền văn hóa lâu đời cũng không thoát khỏi thân phận thuộc địa. Để hiểu rõ đất nước này đã bị các nước đế quốc xâm lược như thế …",
    },
    {
      image: "/images/Knowledge/Ngu-phap-thi-Toeic-4.png",
      name: "Công thức, dấu hiệu nhận biết và bài tập thì tương lai hoàn thành (Future Perfect)",
      description:
        "Thì tương lai hoàn thành không được dùng phổ biến trong thực tế như các thì khác. Tuy nhiên nó lại được coi là phần ngữ pháp khó nhằn trong các đề thi, đặc biệt có thể xuất hiện ở kỳ thi THPT quốc gia. Vậy hôm nay bạn hãy cùng Học Thông Minh chinh …",
    },
    {
      image: "/images/Knowledge/travel-guide-2.png",
      name: "Lịch sử 11:  Những dấu mốc đáng nhớ của lịch sử Nhật Bản",
      description:
        "Nhật Bản là một trong những quốc gia có nền văn hóa – khoa học – công nghệ tiên tiến hàng đầu thế giới. Tuy nhiên tiến trình lịch sử hình thành và phát triển văn hóa sự kiện của quốc gia này vẫn còn nhiều sự thật thú vị. Để nắm rõ hơn về …",
    },
  ];
  return (
    <div className={styles.knowledgeView}>
      <Container maxWidth="md">
        <div className={styles.title_knowledge}>Kiến thức hay</div>
        <div className={styles.block_knowledge}>
          {dataKnowledge.map((item, index) => (
            <div key={index} className={styles.item_knowledge_panel}>
              <Link
                href="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Animate data_aos="zoom-in">
                  <div className={styles.item_knowledge}>
                    <div className={styles.image_knowledge}>
                      <div className={styles.image_knowledge_wrapper}>
                        <Image alt="" src={item.image} />
                      </div>
                    </div>
                    <div className={styles.info_knowledge}>
                      <div className={styles.name_knowledge}>{item.name}</div>
                      <div className={styles.des_knowledge}>
                        {item.description}
                      </div>
                    </div>
                  </div>
                </Animate>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default KnowledgeView;
