import { MathJax } from "better-react-mathjax";
import DOMPurify from "dompurify";
import {
  Correct,
  FeedBackIcon,
  Incorrect,
  PointCorrect,
  PointInCorrect,
  QuizChoiceIcon,
} from "../Icons";
import { Button } from "@mui/material";
import { Question, Topic } from "@/types";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addUserTopicResult } from "@/app/features/topics/topicsApi";
import { RootState } from "@/app/store";
import {
  setHistory,
  setNumberCorrect,
  setNumberInCorrect,
  setResults,
  setShowReport,
  setWorking,
} from "@/app/features/games/gamesSlice";
import styles from "./studyView.module.scss";

const StudyView = ({
  questions,
  topic,
}: {
  topic: Topic;
  questions: [Question];
}) => {
  const dispatch = useAppDispatch();
  const userInfor = useAppSelector((state: RootState) => state.users.userInfor);
  const results = useAppSelector((state) => state.games.results);
  const numberCorrect = useAppSelector((state) => state.games.numberCorrect);
  const numberInCorrect = useAppSelector(
    (state) => state.games.numberInCorrect
  );
  const history = useAppSelector((state) => state.games.history);

  var answer = [...results];

  const createRowArray = (n: number) => {
    const row = [];
    for (let i = 1; i <= n; i++) {
      row.push(i);
    }
    return row;
  };
  const numberRowsQuestionList = createRowArray(questions.length / 7 + 1);

  const handleSubmit = () => {
    const handleResults = results.map((result: any) => {
      if (result == null) return -1;
      else return result;
    });
    dispatch(setResults(handleResults));
    dispatch(
      addUserTopicResult({
        userId: userInfor.id,
        topicId: topic._id,
        answer: handleResults,
        score: numberCorrect,
      })
    );
    dispatch(setWorking(false));
    dispatch(setShowReport(true));
  };
  return (
    <div className={styles.main_study_view}>
      <div className={styles.study_layout_mid}>
        <div className={styles.main_game_view}>
          <div className={styles.main_game_scroll_panel}>
            {questions.map((question: Question, indexQuestion: number) => (
              <div className={styles.normal_root_container} key={indexQuestion}>
                <div className={styles.detail_question_level_wrapper}>
                  {question.level == 1 ? (
                    <span
                      className={styles.detail_question_level_text}
                      style={{ color: "rgb(138, 197, 62)" }}
                    >
                      Thông hiểu
                    </span>
                  ) : question.level == 2 ? (
                    <span
                      className={styles.detail_question_level_text}
                      style={{
                        color: "rgb(64, 180, 229)",
                      }}
                    >
                      Nhận biết
                    </span>
                  ) : (
                    <span
                      className={styles.detail_question_level_text}
                      style={{ color: "FF9800" }}
                    >
                      Vận dụng
                    </span>
                  )}
                  <div className={styles.feedback_icon_wrapper}>
                    <FeedBackIcon />
                  </div>
                </div>
                <div className={styles.game_object_view}>
                  <div className={styles.game_object_view_question}>
                    <div className={styles.game_object_view_question_index}>
                      <span>{indexQuestion + 1}. </span>
                    </div>
                    <div className={styles.game_object_view_question_content}>
                      <MathJax>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(question.name),
                          }}
                        ></span>
                      </MathJax>
                    </div>
                  </div>
                  <div className={styles.game_object_quiz_choices}>
                    {question.quizChoice.map((choice, indexChoice) => {
                      const handleClickChoice = (
                        indexQuestion: number,
                        indexChoice: number
                      ) => {
                        answer[indexQuestion] = indexChoice;
                        if (indexChoice == question.answer) {
                          dispatch(setNumberCorrect(numberCorrect + 1));
                          dispatch(setResults(answer));
                        } else {
                          dispatch(setNumberInCorrect(numberInCorrect + 1));
                          dispatch(setResults(answer));
                        }
                      };
                      return (
                        <div
                          key={indexChoice}
                          className={
                            results[indexQuestion] == undefined
                              ? styles.quiz_choice_item
                              : question.answer == indexChoice
                              ? `${styles.quiz_choice_item} ${styles.disabled} ${styles.picking}`
                              : `${styles.quiz_choice_item} ${styles.disabled}`
                          }
                          onClick={() =>
                            handleClickChoice(indexQuestion, indexChoice)
                          }
                        >
                          {/* Chưa trả lời */}
                          {results[indexQuestion] == undefined && (
                            <>
                              <div className={styles.quiz_choice_item_icon}>
                                <QuizChoiceIcon
                                  className={styles.quiz_choice_item_icon_svg}
                                />
                              </div>
                              <div className={styles.quiz_choice_item_content}>
                                <MathJax>
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html: DOMPurify.sanitize(choice),
                                    }}
                                  ></span>
                                </MathJax>
                              </div>
                            </>
                          )}
                          {/* Trả lời đúng */}
                          {results[indexQuestion] == indexChoice &&
                            question.answer == indexChoice && (
                              <>
                                <div className={styles.quiz_choice_item_icon}>
                                  <Correct width={26} height={26} />
                                </div>
                                <div
                                  className={`${styles.quiz_choice_item_content} ${styles.correct}`}
                                >
                                  <MathJax>
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(choice),
                                      }}
                                    ></span>
                                  </MathJax>
                                </div>
                              </>
                            )}
                          {/* Trả lời sai */}
                          {results[indexQuestion] == indexChoice &&
                            question.answer != indexChoice && (
                              <>
                                <div className={styles.quiz_choice_item_icon}>
                                  <Incorrect width={26} height={26} />
                                </div>
                                <div
                                  className={`${styles.quiz_choice_item_content} ${styles.incorrect}`}
                                >
                                  <MathJax>
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(choice),
                                      }}
                                    ></span>
                                  </MathJax>
                                </div>
                              </>
                            )}
                          {/* Đáp án đúng khi trả lời sai */}
                          {results[indexQuestion] != undefined &&
                            results[indexQuestion] != indexChoice &&
                            question.answer == indexChoice && (
                              <>
                                <div className={styles.quiz_choice_item_icon}>
                                  <Correct width={26} height={26} />
                                </div>
                                <div
                                  className={styles.quiz_choice_item_content}
                                >
                                  <MathJax>
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(choice),
                                      }}
                                    ></span>
                                  </MathJax>
                                </div>
                              </>
                            )}
                          {/* Đáp án khác */}
                          {results[indexQuestion] != undefined &&
                            results[indexQuestion] != indexChoice &&
                            question.answer != indexChoice && (
                              <>
                                <div className={styles.quiz_choice_item_icon}>
                                  <QuizChoiceIcon
                                    className={styles.quiz_choice_item_icon_svg}
                                  />
                                </div>
                                <div
                                  className={`${styles.quiz_choice_item_content} ${styles.not_select}`}
                                >
                                  <MathJax>
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(choice),
                                      }}
                                    ></span>
                                  </MathJax>
                                </div>
                              </>
                            )}
                        </div>
                      );
                    })}
                    {results[indexQuestion] != undefined && (
                      <div className={styles.game_object_explanation}>
                        <div className={styles.game_object_explanation_button}>
                          <Button variant="text">Giải thích</Button>
                        </div>
                        <div className={styles.game_object_explanation_content}>
                          <MathJax>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(question.explain),
                              }}
                            ></span>
                          </MathJax>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.study_layout_right}>
        <div className={styles.question_palette_panel}>
          <div className={styles.question_palette_main}>
            <div className={styles.question_palette_header}>
              <div className={styles.question_palette_title}>Bảng câu hỏi</div>
            </div>
            <div className={styles.question_palette_body}>
              <div className={styles.questions_stat}>
                <div className={styles.questions_stat_item}>
                  <PointCorrect />
                  <span className={styles.questions_stat_item_text}>
                    {numberCorrect}/{questions.length} Câu đúng
                  </span>
                </div>
                <div className={styles.questions_stat_item}>
                  <PointInCorrect />
                  <span className={styles.questions_stat_item_text}>
                    {numberInCorrect}/{questions.length} Câu sai
                  </span>
                </div>
              </div>
              <div className={styles.questions_list}>
                {numberRowsQuestionList.map((row: number) => (
                  <div className={styles.questions_list_row} key={row}>
                    {questions
                      .slice(7 * (row - 1), row * 7)
                      .map((question, indexQuestion) =>
                        results[indexQuestion] == undefined ? (
                          <Button key={indexQuestion}>
                            {indexQuestion + 1}
                          </Button>
                        ) : results[indexQuestion] == question.answer ? (
                          <Button
                            key={indexQuestion}
                            sx={{
                              background: "#4caf50!important",
                              color: "#fff!important",
                            }}
                          >
                            {indexQuestion + 1}
                          </Button>
                        ) : (
                          <Button
                            key={indexQuestion}
                            sx={{
                              background: "#ff5252!important",
                              color: "#fff!important",
                            }}
                          >
                            {indexQuestion + 1}
                          </Button>
                        )
                      )}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.question_palette_footer}>
              <div className={styles.question_palette_function_button}>
                {history ? (
                  <div>
                    <Button
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
                    <Button
                      onClick={() => {
                        dispatch(setWorking(false));
                        dispatch(setHistory(false));
                      }}
                    >
                      Thoát
                    </Button>
                  </div>
                ) : (
                  <Button onClick={handleSubmit}>Nộp bài</Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudyView;
