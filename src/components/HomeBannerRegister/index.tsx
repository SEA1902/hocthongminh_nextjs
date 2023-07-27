import { Button, Container } from "@mui/material";
import Animate from "../Animate";
import { BannerActionIcon, BannerTextIcon } from "../Icons";
import styles from "./homeBannerRegister.module.scss";

function HomeBannerRegister() {
  return (
    <div className={styles.home_banner_register}>
      <Container
        maxWidth="md"
        className={styles.home_banner_register_container}
      >
        <div className={styles.box_banner}>
          <div className={styles.box_banner_container}>
            <div className={styles.banner_left}>
              <div className={styles.banner_infor}>
                <Animate
                  translate={true}
                  translateDirection="right"
                  keep={true}
                >
                  <div>
                    <div className={styles.banner_register}>Đăng ký</div>
                    <div className={styles.banner_account}>Tài khoản</div>
                  </div>
                </Animate>
                <Animate translate={true} keep={true}>
                  <div className={styles.banner_free}>FREE</div>
                </Animate>
              </div>

              <div className={styles.banner_info_body}>
                <div className={styles.banner_text_item}>
                  <BannerTextIcon />
                  <span>Xem thống kê quá trình luyện tập</span>
                </div>
                <div className={styles.banner_text_item}>
                  <BannerTextIcon />
                  <span>Xem giải thích miễn phí</span>
                </div>
                <div className={styles.banner_text_item}>
                  <BannerTextIcon />
                  <span>Đề xuất học tập khi làm xong đề kiểm tra</span>
                </div>
                <div className={styles.banner_text_item}>
                  <BannerTextIcon />
                  <span>Biết điểm mạnh, điểm yếu sau mỗi bài thi</span>
                </div>
              </div>
              <div className={styles.banner_info_action}>
                <Button
                  variant="outlined"
                  size="small"
                  endIcon={<BannerActionIcon />}
                >
                  Đăng ký ngay
                </Button>
              </div>
            </div>
            <div className={styles.banner_right}>
              <div className={styles.banner_click_image}>
                <Animate translate={true} keep={true}>
                  <img alt="" src="/images/banner-click.png" />
                </Animate>
              </div>
              <div className={styles.banner_lock_image}>
                <Animate translate={true} translateDirection="left" keep={true}>
                  <img alt="" src="/images/banner-lock.png" />
                </Animate>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default HomeBannerRegister;
