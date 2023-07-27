import BlockCategoryItem from "../BlockCategoryItem";
import styles from "./categoryCourse.module.scss";
import { Container } from "@mui/material";

const dataCourseTHCS = [
  {
    itemImage: "/images/categoryCourse/lop-6.png",
    itemBody:
      "Tổng hợp tài liệu các môn Toán, Văn, Tiếng Anh, Lịch Sử,... đầy đủ và chi tiết nhất theo chương trình học lớp 6 và các đề thi học lỳ 1, học kỳ 2 kèm theo lời giải chi tiết.",
    colorButton: "rgb(0, 157, 157)",
  },
  {
    itemImage: "/images/categoryCourse/lop-7.png",
    itemBody:
      "Làm bài tập trắc nghiệm các môn học bám sát với chương trình giảng dạy trên lớp của thầy cô để các em chủ động nắm rõ toàn bộ nội dung kiến thức trên lớp",
    colorButton: "rgb(85, 187, 126)",
  },
  {
    itemImage: "/images/categoryCourse/lop-8.png",
    itemBody:
      "Làm bài tập các môn Toán, Hóa, Sinh, Địa, Sử,... theo chương trình lớp 8 mới nhất dưới hình thức trắc nghiệm. Các em có thể luyện đề kiểm tra, đề thi học kỳ 1, học kỳ 2 ngay tại trang web Học Thông Minh",
    colorButton: "rgb(245, 183, 61)",
  },
  {
    itemImage: "/images/categoryCourse/lop-9.png",
    itemBody:
      "Luyện tập các câu hỏi trắc nghiệm về những môn học như Toán, Văn, Anh, Sinh,... theo chương trình giảng dạy trên tường và forrm đề thi giữa kỳ, học kỳ với đáp án chi tiết.",
    colorButton: "rgb(245, 133, 81)",
  },
];
const dataCourseTHPT = [
  {
    itemImage: "/images/categoryCourse/lop-10.png",
    itemBody:
      "Học online các môn Toán, Lý, Hóa, Sinh, Lịch sử, GDCD, Địa Lý, Văn, Tiếng Anh theo chương trình lớp 10 mới nhất dưới hình thức trắc nghiệm. Các em có thể học, luyện theo chương trình học của bộ GDDT và làm các bài kiểm tra học kỳ 1, học kỳ 2 ngay trên website Học Thông Minh",
    colorButton: "rgb(61, 179, 218)",
  },
  {
    itemImage: "/images/categoryCourse/lop-11.png",
    itemBody:
      "Luyện tập các môn Toán, Lý, Hóa, Sinh, Sử, Địa, GDCD, Tiếng Anh, Văn theo chương trình học lớp 11 và các đề thi học kỳ 1, học kỳ 2 với chấm điểm và lời giải chi tiết cho các em dễ dàng nắm vững kiến thức của các môn học lớp 11.",
    colorButton: "rgb(142, 145, 229)",
  },
  {
    itemImage: "/images/categoryCourse/lop-12.png",
    itemBody:
      "Luyện tập các môn Toán, Lý, Hóa, Sinh, Sử, Địa, GDCD, Tiếng Anh, Văn theo chương trình học lớp 12 và các đề thi học kỳ 1, học kỳ 2 với chấm điểm và lời giải chi tiết. Các bài kiểm tra và chương trình cũng hướng tới các dạng của đề thi đại học cho các em dễ dàng nắm vững kiến thức cũng như mục tiêu và chủ đề của đề thi THPT các môn.",
    colorButton: "rgb(218, 135, 145)",
  },
];
function CategoryCourse() {
  return (
    <div className={styles.category_course}>
      <Container maxWidth="md">
        <div className={styles.title_category}>
          <h1 className={styles.title_h1}>
            Luyện tập trắc nghiệm online tại Học Thông Minh
          </h1>
          <div className={styles.summary}>
            <p>
              <span>
                Làm trắc nghiệm online các môn Toán, Lý, Hóa, Sinh, Sử, Địa,
                GDCD, Tiếng Anh, Văn với các bài luyện tập theo chương trình học
                và đề thi học kì, giữa kì, ... có đáp án, lời giải chi tiết.
              </span>
            </p>
          </div>
        </div>

        <div className={styles.block_category}>
          <div className={styles.block_category_item}>
            <div className={styles.item_title}>Khối THCS</div>
            <div className={styles.list_item}>
              {dataCourseTHCS.map((item, index) => (
                <BlockCategoryItem
                  key={index}
                  itemImage={item.itemImage}
                  itemBody={item.itemBody}
                  colorButton={item.colorButton}
                />
              ))}
            </div>
            <div className={styles.item_title}>Khối THPT</div>
            <div className={styles.list_item}>
              {dataCourseTHPT.map((item, index) => (
                <BlockCategoryItem
                  key={index}
                  itemImage={item.itemImage}
                  itemBody={item.itemBody}
                  colorButton={item.colorButton}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default CategoryCourse;
