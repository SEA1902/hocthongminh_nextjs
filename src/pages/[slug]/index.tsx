import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { Container, Grid } from "@mui/material";
import { Course, gradeList } from "@/types";
import { AppDispatch, wrapper } from "@/app/store";
import { getGradeAndCourseList } from "@/app/features/grades/gradeApi";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import BlockItemCategoryGrade from "@/components/BlockItemCategoryGrade";
import styles from "./grade.module.scss";

const ListSubjectByClass = ({
  grade,
  courseList,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { slug } = router.query;
  var classNumber: string = "";
  if (typeof slug === "string") {
    classNumber = slug.split("-")[1];
  }

  const linkBreadcrumbs = [
    {
      name: "Lớp " + classNumber,
      href: "/" + slug,
    },
  ];

  return (
    <div
      id="main"
      style={{
        marginTop: "-1px",
        backgroundColor: "rgb(243, 247, 249)",
        minHeight: "700px",
      }}
    >
      <Container maxWidth="md">
        <div className={styles.grade_page_panel}>
          <CustomBreadcrumbs links={linkBreadcrumbs} />
          <div className={styles.title_topic}>
            <h1 className="title-h1">{grade?.title}</h1>
            <div className={styles.summary}>
              <p>
                <span style={{ fontWeight: "400" }}>{grade?.description}</span>
              </p>
            </div>
          </div>

          <Grid container spacing={2}>
            {courseList ? (
              courseList.map((course: Course, index: number) => (
                <BlockItemCategoryGrade
                  course={course}
                  link={Array.isArray(slug) ? slug.join("") : slug || ""}
                  key={index}
                />
              ))
            ) : (
              <h1>Đang cập nhật</h1>
            )}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: gradeList.map((slug) => ({
      params: { slug },
    })),

    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }) => {
      const slug = params?.slug;

      if (typeof slug === "string" && !gradeList.includes(slug)) {
        return { notFound: true };
      }
      var classNumber: string = "";
      if (typeof slug === "string") {
        classNumber = slug.split("-")[1];
      }

      const { dispatch } = store as { dispatch: AppDispatch };
      if (classNumber) {
        await dispatch(getGradeAndCourseList(+classNumber));
      }
      const grade = store.getState().grade.grade || null;
      const courseList = store.getState().grade.courseList || null;

      return { props: { grade, courseList } };
    }
);

export default ListSubjectByClass;
