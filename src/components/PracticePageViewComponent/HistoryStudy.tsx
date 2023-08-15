import { format, parseISO } from "date-fns";
import { KeyboardArrowRight } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  setHistory,
  setNumberCorrect,
  setNumberInCorrect,
  setResults,
  setWorking,
} from "@/app/features/games/gamesSlice";
import { GioiIcon, KhaIcon, TrungBinhIcon } from "../Icons";
import { Topic } from "@/types";
import styles from "./practicePageViewComponent.module.scss";

const HistoryStudy = ({ topic }: { topic: Topic }) => {
  const dispatch = useAppDispatch();

  const userTopicHistory = useAppSelector(
    (state) => state.topics.userTopicHistory
  );
  const handleReviewResult = (answer: number[], score: number) => {
    dispatch(setResults(answer));
    dispatch(setNumberCorrect(score));
    dispatch(setNumberInCorrect(answer.length - score));
    dispatch(setHistory(true));
    dispatch(setWorking(true));
  };
  return (
    <div className={styles.practice_question_box}>
      <div className={styles.practive_question_box_tabs}>
        <div className={styles.practive_question_box_tabs_title}>
          Lịch sử luyện tập
        </div>
      </div>
      <div className={styles.practice_question_box_container}>
        <div className={styles.practice_question_box_list}>
          {userTopicHistory?.history.map((history: any, index: number) => (
            <div className={styles.practice_question_box_list_item} key={index}>
              <div style={{ paddingBottom: "unset", maxWidth: " 400px" }}>
                {topic.topicName}
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  className={styles.button_evaluation}
                  style={{ display: "flex", paddingBottom: "unset" }}
                >
                  {history.score / history.answer.length < 0.4 ? (
                    <Button
                      startIcon={<TrungBinhIcon width={25} height={27} />}
                      variant="outlined"
                      size="small"
                      sx={{
                        color: "rgb(199, 146, 104)",
                        borderColor: "rgb(199, 146, 104)",
                        borderRadius: "5px",
                        backgroundColor: "rgb(255, 255, 255)",
                        fontSize: "12px",
                        textTransform: "none",
                      }}
                    >
                      Trung bình
                    </Button>
                  ) : history.score / history.answer.length >= 0.8 ? (
                    <Button
                      startIcon={<GioiIcon width={25} height={27} />}
                      variant="outlined"
                      size="small"
                      sx={{
                        color: "rgb(255 186 51 / 80%)",
                        borderColor: "rgb(255 186 51 / 80%)",
                        borderRadius: "5px",
                        backgroundColor: "rgb(255, 255, 255)",
                        fontSize: "12px",
                        textTransform: "none",
                      }}
                    >
                      Giỏi
                    </Button>
                  ) : (
                    <Button
                      startIcon={<KhaIcon width={25} height={27} />}
                      variant="outlined"
                      size="small"
                      sx={{
                        color: "rgb(64, 180, 229);",
                        borderColor: "rgb(64, 180, 229);",
                        borderRadius: "5px",
                        backgroundColor: "rgb(255, 255, 255)",
                        fontSize: "12px",
                        textTransform: "none",
                      }}
                    >
                      {" "}
                      Khá
                    </Button>
                  )}
                  <div className={styles.practice_question_box_list_item_time}>
                    {history?.createdAt &&
                      format(parseISO(history.createdAt), "HH:mm dd/MM/yyyy")}
                  </div>
                </div>
                <div>
                  <Button
                    variant="contained"
                    endIcon={<KeyboardArrowRight />}
                    size="small"
                    sx={{
                      fontSize: "12px",
                      textTransform: "none",
                    }}
                    onClick={() =>
                      handleReviewResult(history.answer, history.score)
                    }
                  >
                    Xem lại
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HistoryStudy;
