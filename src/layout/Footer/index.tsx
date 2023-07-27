import { EmailIcon, PositionIcon } from "@/components/Icons";
import styles from "./footer.module.scss";

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_container}>
        <div className={styles.main_footer}>
          <div className={`${styles.footer_contact} ${styles.grid_4}`}>
            <div className={styles.item_contact}>
              <div className={styles.logo}>
                <img alt="logo" src="/images/logo.svg" />
              </div>
            </div>
            <div className={styles.item_contact}>
              <PositionIcon />
              <span>
                Tầng 3, Lô NT KĐT mới Phùng Khoang, Phường Trung Văn, Quận Nam
                Từ Liêm, Hà Nội
              </span>
            </div>
            <div className={styles.item_contact}>
              <span>
                Cơ quan chủ quản: Công ty Cổ phần Đầu tư và Phát triển Koolsoft
              </span>
            </div>
            <div className={styles.item_contact}>
              <EmailIcon />
              <span>hotro.hocthongminh@gmail.com </span>
            </div>
          </div>
          <div className={`${styles.center_footer} ${styles.grid_6}`}>
            <div className={styles.center_list_item}>
              <div className={`${styles.center_footer_item} ${styles.grid_3}`}>
                <div className={styles.title_footer_center}>Về chúng tôi</div>
                <div className={styles.list_contact}>
                  <a href="/">Giới thiệu</a>
                  <a href="/">Liên hệ</a>
                </div>
              </div>
              <div className={`${styles.center_footer_item} ${styles.grid_4}`}>
                <div className={styles.title_footer_center}>Chính sách</div>
                <div className={styles.list_contact}>
                  <a href="/">Điều khoản sử dụng</a>
                  <a href="/">Chính sách bảo mật</a>
                </div>
              </div>
              <div className={`${styles.center_footer_item} ${styles.grid_5}`}>
                <div className={styles.title_footer_center}>Thông tin</div>
                <div className={styles.list_contact}>
                  <a href="/">Chia sẻ kiến thức</a>
                  <a href="/">Tin tức</a>
                  <a href="/">Tính điểm xét tốt nghiệp</a>
                  <a href="/">Tính điểm xét học bạ</a>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.connect_with_htm} ${styles.grid_2}`}>
            <div className={styles.title_footer_connect}>
              Kết nối với <br />
              Hocthongminh
            </div>

            <div className={styles.icon_contact}>
              <a href="/">
                <img alt="" src="/images/footer/facebook.svg" />
              </a>
              <a href="/">
                <img alt="" src="/images/footer/youtube.svg" />
              </a>
              <a href="/">
                <img alt="" src="/images/footer/twitter.svg" />
              </a>
              <a href="/">
                <img alt="" src="/images/footer/pinterest.svg" />
              </a>
              <a href="/">
                <img alt="" src="/images/footer/tiktok.png" />
              </a>
            </div>
            <a href="/">
              <img alt="" src="/images/footer/dmca-badge.png" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
