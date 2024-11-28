import List from ".";
import type { Meta } from "@storybook/react";

const meta: Meta = {
  title: "components/List",
  component: List,
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  render: () => (
    <List>
      <List.Header totalCount={47} label="책" />
      <List.ColumnContainer headers={headers} row={5} />
      <List.RowContainer row={10}>
        {books.map((book) => (
          <ListItemStory key={book.id} {...book} />
        ))}
      </List.RowContainer>
    </List>
  ),
};

type BookItemType = {
  id: string;
  title: string;
  author: string;
  publisher: string;
  etc: string;
};
const headers = ["ID", "TITLE", "AUTHOR", "PUBLISHER", "ETC"];

const books: BookItemType[] = [
  {
    id: "1",
    title: "The Wizard of Oz",
    author: "L. Frank Baum",
    publisher: "Penguin",
    etc: "Classic fantasy",
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    publisher: "Secker & Warburg",
    etc: "Dystopian novel",
  },
  {
    id: "3",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publisher: "J.B. Lippincott & Co.",
    etc: "Pulitzer Prize winner",
  },
  {
    id: "4",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publisher: "Scribner",
    etc: "American classic",
  },
  {
    id: "5",
    title: "Moby Dick",
    author: "Herman Melville",
    publisher: "Harper & Brothers",
    etc: "Epic sea adventure",
  },
  {
    id: "6",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    publisher: "T. Egerton",
    etc: "Romantic fiction",
  },
  {
    id: "7",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    publisher: "Allen & Unwin",
    etc: "Fantasy adventure",
  },
  {
    id: "8",
    title: "Harry Potter",
    author: "J.K. Rowling",
    publisher: "Bloomsbury",
    etc: "Bestseller fantasy",
  },
  {
    id: "9",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    publisher: "Little, Brown",
    etc: "Coming-of-age novel",
  },
  {
    id: "10",
    title: "The Alchemist",
    author: "Paulo Coelho",
    publisher: "HarperOne",
    etc: "Inspirational story",
  },
];

const ListItemStory = ({ id, title, author, publisher, etc }: BookItemType) => {
  return (
    <div className="grid grid-cols-5">
      <div className="text-center">{id}</div>
      <div className="text-center">{title}</div>
      <div className="text-center">{author}</div>
      <div className="text-center">{publisher}</div>
      <div className="text-center">{etc}</div>
    </div>
  );
};
