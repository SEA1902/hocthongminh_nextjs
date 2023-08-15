import Link from "next/link";
import { Grid } from "@mui/material";
import { Course } from "@/types";
import styles from "./blockItemCategoryGrade.module.scss";

const BlockItemCategoryGrade = ({
  course,
  link,
}: {
  course: Course;
  link: string;
}) => {
  return (
    <Grid item xs={6} sm={4} md={3}>
      <Link
        href={{
          pathname: "/[slug]/[...courseSlug]",
          query: {
            slug: link,
            courseSlug: [course.slug, "chuong-trinh-hoc"],
          },
        }}
        color="inherit"
      >
        <div className={styles.item_category_grade}>
          <div className={styles.item_category_grade_image}>
            <img src={course.image} alt="" />
          </div>
          <div className={styles.info_category_grade}>
            <div className={styles.title_category_grade}>{course.name}</div>
            <div className={styles.des_category_grade}>
              <p>{course.description}</p>
            </div>
          </div>
        </div>
      </Link>
    </Grid>
  );
};
export default BlockItemCategoryGrade;
