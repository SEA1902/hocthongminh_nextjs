import Link from "next/link";
import Image from "next/image";
import RightNavHeader from "./RightNavHeader";
import styles from "./header.module.scss";

function Header() {
  return (
    <div className={styles.app_bar_header}>
      <div className={styles.header}>
        <div className={styles.header_nav}>
          <div className={styles.left_nav_header}>
            <div className={styles.logo}>
              <Link href="/">
                <Image
                  alt="logo"
                  src="/images/logo.svg"
                  className={styles.image_logo}
                ></Image>
              </Link>
            </div>
          </div>

          <RightNavHeader />
        </div>
      </div>
    </div>
  );
}

export default Header;
