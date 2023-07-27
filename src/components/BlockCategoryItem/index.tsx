import styles from "./blockCategoryItem.module.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Animate from "../Animate";
import { Button } from "@mui/material";

function BlockCategoryItem({
  itemImage,
  itemBody,
  colorButton,
}: {
  itemImage: string;
  itemBody: string;
  colorButton: string;
}) {
  return (
    <div className={styles.block_category_component}>
      <Animate translate={false} keep={true}>
        <a href="/" className={styles.item_link}>
          <div className={styles.course_item}>
            <div className={styles.course_item_image}>
              <img alt="" src={itemImage} />
            </div>
            <div className={styles.course_item_body}>{itemBody}</div>
            <div
              className={styles.course_item_btn}
              style={{ color: `${colorButton}` }}
            >
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                endIcon={<ArrowForwardIosIcon />}
              >
                <span>Luyện ngay</span>
              </Button>
            </div>
          </div>
        </a>
      </Animate>
    </div>
  );
}

export default BlockCategoryItem;
