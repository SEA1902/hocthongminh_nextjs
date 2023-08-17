import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TreeView from "@mui/lab/TreeView";
import { Button, Container, Grid } from "@mui/material";
import {
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowRight,
  LibraryBooks,
} from "@mui/icons-material";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import {
  ChuaLamIcon,
  GioiIcon,
  KhaIcon,
  TrungBinhIcon,
} from "@/components/Icons";
import StyledTreeItem from "@/components/StyledTreeItem";
import { getCourseAndTopicList } from "@/app/features/courses/coursesApi";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Topic, gradeList } from "@/types";
import styles from "./course.module.scss";
import { GetServerSideProps } from "next";

const SubjectPage = () => {
  const router = useRouter();
  const { slug, courseSlug } = router.query;

  const dispatch = useAppDispatch();
  const userInfor = useAppSelector((state) => state.users.userInfor);
  const courseInfor = useAppSelector((state) => state.courses.course);
  const topicList = useAppSelector((state) => state.courses.topicList);

  var classNumber: string = "";
  if (typeof slug === "string") {
    classNumber = slug.split("-")[1];
  }
  const [typeTopic, setTypeTopic] = useState(0);
  const [maxChapterNumber, setMaxChapterNumber] = useState(0);
  useEffect(() => {
    if (userInfor && classNumber && courseSlug) {
      dispatch(
        getCourseAndTopicList({
          classNumber: +classNumber,
          courseSlug: courseSlug[0],
          typeTopic: typeTopic,
          userId: userInfor.id,
        })
      );
    }
  }, [userInfor, slug, typeTopic]);

  useEffect(() => {
    if (topicList) {
      var max = 0;
      for (let i = 0; i < topicList.length; i++) {
        const chapterNumber = topicList[i].chapterNumber;
        if (chapterNumber > max) {
          max = chapterNumber;
        }
      }
      setMaxChapterNumber(max);
    }
  }, [topicList]);

  const linkBreadcrumbs = [
    {
      name: "Lớp " + classNumber,
      href: "/" + slug,
    },
    {
      name: courseInfor?.name,
      href:
        "/" +
        slug +
        "/" +
        `${courseSlug ? courseSlug[0] : ""}/` +
        `${courseSlug ? courseSlug[1] : ""}`,
    },
    {
      name: typeTopic == 0 ? "Chương trình học" : "Đề kiểm tra",
      href:
        "/" +
        slug +
        "/" +
        `${courseSlug ? courseSlug[0] : ""}/` +
        `${courseSlug ? courseSlug[1] : ""}`,
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
      <div className={styles.subject_page}>
        <Container maxWidth="lg">
          <CustomBreadcrumbs links={linkBreadcrumbs} />
          <div className={styles.title_topic}>
            <h1 className="title-h1">
              {typeTopic == 0
                ? "Luyện tập trắc nghiệm " +
                  courseInfor?.name +
                  " " +
                  classNumber
                : "Luyện đề trắc nghiệm " +
                  courseInfor?.name +
                  " " +
                  classNumber}
            </h1>
          </div>

          <div className={styles.subject_page_tabs}>
            <Button
              variant={typeTopic == 0 ? "contained" : "outlined"}
              onClick={() => setTypeTopic(0)}
            >
              Chương trình học
            </Button>
            <Button
              variant={typeTopic == 1 ? "contained" : "outlined"}
              onClick={() => setTypeTopic(1)}
            >
              Đề kiểm tra
            </Button>
          </div>

          <div className={styles.levels_practice}>
            <div className={styles.levels_practice_box}>
              <div className={styles.level_practice_box_item}>
                <div className={styles.level_practice_icon}>
                  <GioiIcon width={30} height={33} />
                </div>
                <div className={styles.level_practive_title}>Giỏi</div>
              </div>
              <div className={styles.level_practice_box_item}>
                <div className={styles.level_practice_icon}>
                  <KhaIcon width={30} height={33} />
                </div>
                <div className={styles.level_practive_title}>Khá</div>
              </div>
              <div className={styles.level_practice_box_item}>
                <div className={styles.level_practice_icon}>
                  <TrungBinhIcon width={30} height={33} />
                </div>
                <div className={styles.level_practive_title}>Trung bình</div>
              </div>
              <div className={styles.level_practice_box_item}>
                <div className={styles.level_practice_icon}>
                  <ChuaLamIcon width={30} height={33} />
                </div>
                <div className={styles.level_practive_title}>Chưa làm</div>
              </div>
            </div>
          </div>
          <Grid container>
            <Grid item sm={12} lg={9}>
              <div className={styles.tree_container}>
                <div className={styles.tree_item_panel}>
                  <div className={styles.tree_item}>
                    <div>Tên bài học</div>
                    <div>Tiến độ học</div>
                  </div>
                </div>
                <TreeView
                  aria-label="gmail"
                  defaultExpanded={["3"]}
                  defaultCollapseIcon={<KeyboardDoubleArrowDown />}
                  defaultExpandIcon={<KeyboardDoubleArrowRight />}
                  defaultEndIcon={<div style={{ width: 24 }} />}
                >
                  {[...Array(maxChapterNumber)].map((_, index) => {
                    const chapterNumber = index + 1;
                    const topicListByChapter = topicList.filter(
                      (topic: Topic) => topic.chapterNumber === chapterNumber
                    );
                    if (topicListByChapter.length > 0) {
                      return (
                        <div
                          className={styles.tree_item_panel}
                          key={chapterNumber}
                        >
                          <StyledTreeItem
                            nodeId={`${index}`}
                            icon={<KeyboardDoubleArrowDown />}
                            labelText={topicListByChapter[0].chapterTitle}
                            sumTopicNumber={topicListByChapter.length}
                          >
                            {topicListByChapter.map(
                              (topic: Topic, indexTopic: number) => (
                                <div
                                  className={styles.tree_item_panel}
                                  key={indexTopic}
                                >
                                  <div className={styles.tree_item_panel_left}>
                                    <span>{topic.topicNumber}</span>
                                  </div>
                                  <StyledTreeItem
                                    nodeId={`${index}_${indexTopic}`}
                                    icon={<LibraryBooks />}
                                    labelInfo={
                                      topic?.evaluate ? (
                                        topic.evaluate < 0.6 ? (
                                          <TrungBinhIcon
                                            width={30}
                                            height={33}
                                          />
                                        ) : topic.evaluate >= 0.8 ? (
                                          <GioiIcon width={30} height={33} />
                                        ) : (
                                          <KhaIcon width={30} height={33} />
                                        )
                                      ) : (
                                        <ChuaLamIcon width={30} height={33} />
                                      )
                                    }
                                    labelText={topic.topicName}
                                    topicName={topic.topicName}
                                    topicNumber={topic.topicNumber}
                                    topicId={topic._id}
                                    child={true}
                                  />
                                </div>
                              )
                            )}
                          </StyledTreeItem>
                        </div>
                      );
                    }

                    return null;
                  })}
                </TreeView>
              </div>
            </Grid>
            <Grid item lg={3}></Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug;

  if (typeof slug === "string" && !gradeList.includes(slug)) {
    return { notFound: true };
  }

  return { props: {} };
};

export default SubjectPage;
