export interface IPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
