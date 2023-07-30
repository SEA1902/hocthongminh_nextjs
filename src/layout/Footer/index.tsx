import Image from "next/image";
import Link from "next/link";
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
                <Image alt="logo" src="/images/logo.svg" />
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
                  <Link href="/">Giới thiệu</Link>
                  <Link href="/">Liên hệ</Link>
                </div>
              </div>
              <div className={`${styles.center_footer_item} ${styles.grid_4}`}>
                <div className={styles.title_footer_center}>Chính sách</div>
                <div className={styles.list_contact}>
                  <Link href="/">Điều khoản sử dụng</Link>
                  <Link href="/">Chính sách bảo mật</Link>
                </div>
              </div>
              <div className={`${styles.center_footer_item} ${styles.grid_5}`}>
                <div className={styles.title_footer_center}>Thông tin</div>
                <div className={styles.list_contact}>
                  <Link href="/">Chia sẻ kiến thức</Link>
                  <Link href="/">Tin tức</Link>
                  <Link href="/">Tính điểm xét tốt nghiệp</Link>
                  <Link href="/">Tính điểm xét học bạ</Link>
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
              <Link href="/">
                <Image alt="" src="/images/footer/facebook.svg" />
              </Link>
              <Link href="/">
                <Image alt="" src="/images/footer/youtube.svg" />
              </Link>
              <Link href="/">
                <Image alt="" src="/images/footer/twitter.svg" />
              </Link>
              <Link href="/">
                <Image alt="" src="/images/footer/pinterest.svg" />
              </Link>
              <Link href="/">
                <Image alt="" src="/images/footer/tiktok.png" />
              </Link>
            </div>
            <Link href="/">
              <Image alt="" src="/images/footer/dmca-badge.png" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
