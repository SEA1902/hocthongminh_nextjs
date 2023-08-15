import { Button, Grid, LinearProgress } from "@mui/material";
import FeedIcon from "@mui/icons-material/Feed";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  setHistory,
  setNumberCorrect,
  setNumberInCorrect,
  setResults,
  setShowReport,
  setWorking,
} from "@/app/features/games/gamesSlice";
import { Correct, Incorrect } from "../Icons";
import { Question, Topic } from "@/types";
import ChartLevel from "./ChartLevel";
import ChartTopic from "./ChartTopic";
import HistoryStudy from "./HistoryStudy";

import styles from "./practicePageViewComponent.module.scss";

const PracticePageViewComponent = ({
  topic,
  questions,
}: {
  topic: Topic;
  questions: [Question];
}) => {
  const dispatch = useAppDispatch();
  const showReport = useAppSelector((state) => state.games.showReport);
  const numberCorrect = useAppSelector((state) => state.games.numberCorrect);
  const numberInCorrect = useAppSelector(
    (state) => state.games.numberInCorrect
  );
  const percentQuestion = [
    {
      name: "Nhận biết",
      percent: (
        (questions.filter((question: Question) => question.level == 1).length *
          100) /
        questions.length
      ).toFixed(0),
      color: "rgb(64, 180, 229)",
    },
    {
      name: "Thông hiểu",
      percent: (
        (questions.filter((question: Question) => question.level == 2).length *
          100) /
        questions.length
      ).toFixed(0),
      color: "rgb(138, 197, 62)",
    },
    {
      name: "Vận dụng",
      percent: (
        (questions.filter((question: Question) => question.level == 3).length *
          100) /
        questions.length
      ).toFixed(0),
      color: "#FF9800",
    },
  ];
  const practiceTipsWorking = [
    {
      number: 1,
      content: "Làm xong được xem ngay đáp án và lời giải",
    },
    {
      number: 2,
      content: "Đánh giá được điểm mạnh yếu và phương pháp luyện tập",
    },
    {
      number: 3,
      content: "Câu hỏi bám sát chủ đề học, bài thi",
    },
    {
      number: 4,
      content: "Câu hỏi được cập nhật mới nhất",
    },
  ];
  return (
    <div className={styles.practice_page_view_component}>
      <div className={styles.levels_practice}>
        {percentQuestion.map((percentItem, index) => (
          <div className={styles.levels_practice_item} key={index}>
            <span className={styles.levels_practice_item_name}>
              {percentItem.name}
            </span>
            <div className={styles.levels_practice_item_body}>
              <div className={styles.levels_practice_item_progress_number}>
                {percentItem.percent}%
              </div>
              <LinearProgress
                variant="determinate"
                value={+percentItem.percent}
                color="inherit"
                sx={{
                  flex: "1",
                  height: "10px !important",
                  borderRadius: "5px",
                  color: percentItem.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      {!showReport && (
        <div className={styles.practice_question_start}>
          <div className={styles.practice_question_start_title}>
            <FeedIcon />
            <h2 className={styles.practice_question_start_title_content}>
              Thông tin chung
            </h2>
          </div>
          <div className={styles.practice_question_view_tips_working}>
            <Grid container spacing={3}>
              {practiceTipsWorking.map((practiceTip, index) => (
                <Grid item xs={12} sm={12} md={6} key={index}>
                  <div
                    className={styles.practice_question_view_tips_working_item}
                  >
                    <div
                      className={
                        styles.practice_question_view_tips_working_item_number
                      }
                    >
                      {practiceTip.number}
                    </div>
                    <div
                      className={
                        styles.practice_question_view_tips_working_item_desc
                      }
                    >
                      {practiceTip.content}
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
          <div className={styles.practice_question_view_button}>
            <Button
              variant="contained"
              onClick={() => {
                dispatch(setWorking(true));
                dispatch(setResults(Array(questions.length)));
                dispatch(setNumberCorrect(0));
                dispatch(setNumberInCorrect(0));
              }}
            >
              Làm bài
            </Button>
          </div>
        </div>
      )}

      {showReport && (
        <>
          <div className={styles.types_question}>
            <div className={styles.types_question_title}>
              <FeedIcon />
              <h2 className={styles.types_question_title_content}>
                Kết quả luyện tập
              </h2>
            </div>
            <div className={styles.types_question_wrapper}>
              <div className={styles.types_question_item}>
                <div className={styles.types_question_item_icon}>
                  <Correct width={40} height={40} />
                </div>
                <div className={styles.types_question_item_label}>
                  Số câu đúng
                </div>
                <div className={styles.types_question_item_number}>
                  {numberCorrect}
                </div>
              </div>
              <div className={styles.types_question_item}>
                <div className={styles.types_question_item_icon}>
                  <Incorrect width={40} height={40} />
                </div>
                <div className={styles.types_question_item_label}>
                  Số câu sai
                </div>
                <div className={styles.types_question_item_number}>
                  {numberInCorrect}
                </div>
              </div>
            </div>
            <div className={styles.practice_question_start}>
              <div className={styles.practice_question_view_button}>
                <Button
                  variant="contained"
                  onClick={() => {
                    dispatch(setHistory(true));
                    dispatch(setWorking(true));
                    dispatch(setShowReport(false));
                  }}
                >
                  Xem giải chi tiết
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    dispatch(setWorking(true));
                    dispatch(setHistory(false));
                    dispatch(setResults(Array(questions.length)));
                    dispatch(setNumberCorrect(0));
                    dispatch(setNumberInCorrect(0));
                  }}
                >
                  Luyện tập tiếp
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.practive_view_chart}>
            <ChartLevel questions={questions} />
          </div>
          <div className={styles.practive_view_chart}>
            <ChartTopic topic={topic} />
          </div>
          <div className={styles.practive_view_chart}></div>
        </>
      )}
      <HistoryStudy topic={topic} />
    </div>
  );
};
export default PracticePageViewComponent;
