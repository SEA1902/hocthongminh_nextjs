import Link from "next/link";
import { ExpandMore } from "@mui/icons-material";
import styles from "./navbar.module.scss";

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
          <Link
            href={{
              pathname: "/[slug]",
              query: { slug: "lop-6" },
            }}
            className={styles.dropdown_item}
          >
            <div className={styles.dropdown_title}>Lớp 6</div>
          </Link>
          <Link
            href={{
              pathname: "/[slug]",
              query: { slug: "lop-7" },
            }}
            className={styles.dropdown_item}
          >
            <div className={styles.dropdown_title}>Lớp 7</div>
          </Link>
          <Link
            href={{
              pathname: "/[slug]",
              query: { slug: "lop-8" },
            }}
            className={styles.dropdown_item}
          >
            <div className={styles.dropdown_title}>Lớp 8</div>
          </Link>
          <Link
            href={{
              pathname: "/[slug]",
              query: { slug: "lop-9" },
            }}
            className={styles.dropdown_item}
          >
            <div className={styles.dropdown_title}>Lớp 9</div>
          </Link>
        </div>
      </div>

      <div className={styles.menu_item}>
        <div className={styles.menu_item_title}>
          <span>THPT</span>
          <ExpandMore />
        </div>
        <div className={styles.dropdown_content}>
          <Link
            href={{
              pathname: "/[slug]",
              query: { slug: "lop-10" },
            }}
            className={styles.dropdown_item}
          >
            <div className={styles.dropdown_title}>Lớp 10</div>
          </Link>
          <Link
            href={{
              pathname: "/[slug]",
              query: { slug: "lop-11" },
            }}
            className={styles.dropdown_item}
          >
            <div className={styles.dropdown_title}>Lớp 11</div>
          </Link>
          <Link
            href={{
              pathname: "/[slug]",
              query: { slug: "lop-12" },
            }}
            className={styles.dropdown_item}
          >
            <div className={styles.dropdown_title}>Lớp 12</div>
          </Link>
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
