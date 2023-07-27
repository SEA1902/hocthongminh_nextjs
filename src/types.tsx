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
  id: number;
  title: string;
  content: string;
  image: string;
  slug: string;
}
