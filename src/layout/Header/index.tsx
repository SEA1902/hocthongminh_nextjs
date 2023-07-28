import RightNavHeader from "./RightNavHeader";
import styles from "./header.module.scss";

function Header() {
  return (
    <div className={styles.app_bar_header}>
      <div className={styles.header}>
        <div className={styles.header_nav}>
          <div className={styles.left_nav_header}>
            <div className={styles.logo}>
              <a href="/">
                <img
                  alt="logo"
                  src="/images/logo.svg"
                  className={styles.image_logo}
                ></img>
              </a>
            </div>
          </div>

          <RightNavHeader />
        </div>
      </div>
    </div>
  );
}

export default Header;
