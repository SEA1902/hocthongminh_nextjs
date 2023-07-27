import { ExpandMore } from "@mui/icons-material";
import styles from "./navbar.module.scss";
import Link from "next/link";

type Props = {
  display: string;
};

function MainMenu({ display }: Props) {
  return (
    <div className={styles.main_menu} style={{ display: display }}>
      <div className={styles.menu_item}>
        <div className={styles.menu_item_title}>
          <span>Luyện thi THPT QG</span>
        </div>
      </div>
      <div className={styles.menu_item}>
        <div className={styles.menu_item_title}>
          <span>THCS</span>
          <ExpandMore />
        </div>
        <div className={styles.dropdown_content}>
          <a href="/" className={styles.dropdown_item}>
            <div className={styles.dropdown_title}>Lớp 6</div>
          </a>
          <a href="/" className={styles.dropdown_item}>
            <div className={styles.dropdown_title}>Lớp 7</div>
          </a>
          <a href="/" className={styles.dropdown_item}>
            <div className={styles.dropdown_title}>Lớp 8</div>
          </a>
          <a href="/" className={styles.dropdown_item}>
            <div className={styles.dropdown_title}>Lớp 9</div>
          </a>
        </div>
      </div>

      <div className={styles.menu_item}>
        <div className={styles.menu_item_title}>
          <span>THPT</span>
          <ExpandMore />
        </div>
        <div className={styles.dropdown_content}>
          <a href="/" className={styles.dropdown_item}>
            <div className={styles.dropdown_title}>Lớp 10</div>
          </a>
          <a href="/" className={styles.dropdown_item}>
            <div className={styles.dropdown_title}>Lớp 11</div>
          </a>
          <a href="/" className={styles.dropdown_item}>
            <div className={styles.dropdown_title}>Lớp 12</div>
          </a>
        </div>
      </div>
      <div className={styles.menu_item}>
        <div className={styles.menu_item_title}>
          <span>Đề thi ĐGNL</span>
        </div>
      </div>
      <div className={styles.menu_item}>
        <div className={styles.menu_item_title}>
          <span>Tài liệu</span>
        </div>
      </div>
      <Link href="/chia-se-kien-thuc" className={styles.menu_item}>
        <div className={styles.menu_item_title}>
          <span>Kiến thức</span>
        </div>
      </Link>
    </div>
  );
}
export default MainMenu;
