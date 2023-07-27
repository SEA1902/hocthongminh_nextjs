import styles from "./homeBase.module.scss";
import Animate from "../Animate";
import { Container } from "@mui/material";

function HomeBase() {
  return (
    <div className={styles.home_base}>
      <Container maxWidth="md">
        <Animate translate={false} keep={true}>
          <div className={styles.home_base_title}>
            Nền tảng Học Thông Minh có gì?
          </div>
        </Animate>

        <div className={styles.home_base_body}>
          <div className={styles.home_base_item}>
            <div className={styles.number}>
              <span>100</span>K+
            </div>
            <div className={styles.text}>Học Viên</div>
          </div>
          <div className={`${styles.home_base_item} ${styles.middle}`}>
            <div className={styles.number}>
              <span>150</span>K+
            </div>
            <div className={styles.text}>Câu hỏi trắc nghiệm</div>
          </div>
          <div className={styles.home_base_item}>
            <div className={styles.number}>
              <span>3000</span>+
            </div>
            <div className={styles.text}>Đề luyện thi</div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default HomeBase;
