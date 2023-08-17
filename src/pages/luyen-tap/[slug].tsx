import { GetServerSideProps } from "next";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Container } from "@mui/material";
import {
  getTopicById,
  getUserTopicHistory,
} from "@/app/features/topics/topicsApi";
import { AppDispatch, wrapper } from "@/app/store";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import CustomBreadcrumbs from "@/components/CustomBreadcrumbs";
import PracticePageViewComponent from "@/components/PracticePageViewComponent";
import StudyView from "@/components/StudyView";
import {
  setHistory,
  setNumberCorrect,
  setNumberInCorrect,
  setResults,
  setWorking,
} from "@/app/features/games/gamesSlice";

import styles from "./topic.module.scss";

const TopicPage = ({
  grade,
  course,
  topic,
  questions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useAppDispatch();
  const userInfor = useAppSelector((state) => state.users.userInfor);
  const working = useAppSelector((state) => state.games.working);

  useEffect(() => {
    dispatch(setResults(Array(questions.length)));
    dispatch(setWorking(false));
    dispatch(setHistory(false));
    dispatch(setNumberCorrect(0));
    dispatch(setNumberInCorrect(0));
  }, []);

  useEffect(() => {
    if (userInfor) {
      dispatch(
        getUserTopicHistory({ userId: userInfor.id, topicId: topic._id })
      );
    }
  }, [userInfor, topic]);

  const linkBreadcrumbs = [
    {
      name: "Lớp " + grade.classNumber,
      href: "/lop-" + grade.classNumber,
    },
    {
      name: course.name,
      href:
        "/lop-" + grade.classNumber + "/" + course.slug + "/chuong-trinh-hoc",
    },
    {
      name: topic.type == 0 ? "Chương trình học" : "Đề kiểm tra",
      href:
        "/lop-" +
        grade.classNumber +
        "/" +
        course.slug +
        `${topic.type == 0 ? "/chuong-trinh-hoc" : "de-kiem-tra"}`,
    },
    {
      name: topic.topicName,
      href: "/luyen-tap/" + slug,
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
      <div className={styles.practice_page_view}>
        <Container maxWidth="md">
          <CustomBreadcrumbs links={linkBreadcrumbs} />
          <h1 className={styles.practice_page_view_title}>
            Bài tập {topic?.topicName} {course.name} lớp {grade.classNumber} có
            lời giải
          </h1>

          <div className={styles.practice_page_view_container}>
            {working ? (
              <StudyView topic={topic} questions={questions} />
            ) : (
              <PracticePageViewComponent topic={topic} questions={questions} />
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const slug = context?.params?.slug;
    const { dispatch } = store as { dispatch: AppDispatch };
    if (slug && typeof slug === "string") {
      const parts = slug.split("-");
      const topicId = parts[parts.length - 1];
      await dispatch(getTopicById(topicId));
    }
    const grade = store.getState().topics.grade;
    const course = store.getState().topics.course;
    const topic = store.getState().topics.topic;
    const questions = store.getState().topics.questions;

    return { props: { grade, course, topic, questions } };
  });
export default TopicPage;
