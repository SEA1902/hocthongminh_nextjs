export interface UserInfor {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  sex: number;
  classNumber: number;
  birthday: string;
  school: string;
  token: string;
}

export interface Knowledge {
  id: string;
  title: string;
  content: string;
  image: string;
  slug: string;
}
export const gradeList = [
  "lop-6",
  "lop-7",
  "lop-8",
  "lop-9",
  "lop-10",
  "lop-11",
  "lop-12",
];

export interface Grade {
  id: string;
  classNumber: number;
  title: string;
  description: string;
}
export interface Course {
  _id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  gradeId: string;
}
export interface Topic {
  _id: string;
  type: number;
  chapterNumber: number;
  chapterTitle: string;
  topicNumber: number;
  topicName: string;
  topicTitle: string;
  timeLimit: number;
  courseId: string;
  evaluate?: number;
}

export interface Question {
  id: string;
  level: number;
  name: string;
  quizChoice: [string];
  answer: number;
  explain: string;
  topicId: string;
}
