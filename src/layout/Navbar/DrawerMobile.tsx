import { useState } from "react";
import Link from "next/link";
import { ExpandMore } from "@mui/icons-material";
import styles from "./navbar.module.scss";
function DrawerMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTwo, setIsOpenTwo] = useState(false);

  const handleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };
  const handleDropdownTwo = () => {
    setIsOpenTwo((prevState) => !prevState);
  };
  return (
    <div className={styles.menu_main_mobile}>
      <div className={styles.menu_item_mobile}>
        <div className={styles.item_mobile_title}>
          <span>Luyện thi THPT QG</span>
        </div>
      </div>
      <div className={styles.menu_item_mobile}>
        <div className={styles.item_mobile_title} onClick={handleDropdown}>
          <span>THCS</span>
          <ExpandMore />
        </div>
        <div
          className={`${styles.mobile_dropdown_content} ${
            isOpen ? styles.activeDropdown : ""
          }`}
        >
          <Link
            href={{
              pathname: "/[slug]",
              query: { slug: "lop-6" },
            }}
            className={styles.mobile_dropdown_item}
          >
            <div className={styles.mobile_dropdown_title}>Lớp 6</div>
          </Link>
          <Link
            href={{
              pathname: "/[slug]",
              query: { slug: "lop-7" },
            }}
            className={styles.mobile_dropdown_item}
          >
            <div className={styles.mobile_dropdown_title}>Lớp 7</div>
          </Link>
          <Link
            href={{
              pathname: "/[slug]",
              query: { slug: "lop-8" },
            }}
            className={styles.mobile_dropdown_item}
          >
            <div className={styles.mobile_dropdown_title}>Lớp 8</div>
          </Link>
          <Link
            href={{
              pathname: "/[slug]",
              query: { slug: "lop-9" },
            }}
            className={styles.mobile_dropdown_item}
          >
            <div className={styles.mobile_dropdown_title}>Lớp 9</div>
          </Link>
        </div>
      </div>

      <div className={styles.menu_item_mobile}>
        <div className={styles.item_mobile_title} onClick={handleDropdownTwo}>
          <span>THPT</span>
          <ExpandMore />
        </div>
        <div
          className={`${styles.mobile_dropdown_content} ${
            isOpenTwo ? styles.activeDropdown : ""
          }`}
        >
          <Link
            href={{
              pathname: "/[slug]",
              query: { slug: "lop-10" },
            }}
            className={styles.mobile_dropdown_item}
          >
            <div className={styles.mobile_dropdown_title}>Lớp 10</div>
          </Link>
          <Link
            href={{
              pathname: "/[slug]",
              query: { slug: "lop-11" },
            }}
            className={styles.mobile_dropdown_item}
          >
            <div className={styles.mobile_dropdown_title}>Lớp 11</div>
          </Link>
          <Link
            href={{
              pathname: "/[slug]",
              query: { slug: "lop-12" },
            }}
            className={styles.mobile_dropdown_item}
          >
            <div className={styles.mobile_dropdown_title}>Lớp 12</div>
          </Link>
        </div>
      </div>
      <div className={styles.menu_item_mobile}>
        <div className={styles.item_mobile_title}>
          <span>Đề thi ĐGNL</span>
        </div>
      </div>
      <div className={styles.menu_item_mobile}>
        <div className={styles.item_mobile_title}>
          <span>Tài liệu</span>
        </div>
      </div>
      <div className={styles.menu_item_mobile}>
        <div className={styles.item_mobile_title}>
          <span>Kiến thức</span>
        </div>
      </div>
    </div>
  );
}

export default DrawerMobile;
