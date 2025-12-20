import { useRef, useState } from "react";
import { List } from "./List";

type Book = {
  id: number;
  title: string;
  author: string;
};

export default function App() {
  // Liste initiale
  const initialBooks: Book[] = [
    { id: 1, title: "1984", author: "George Orwell" },
    { id: 2, title: "Pride and Prejudice", author: "Jane Austen" },
    { id: 3, title: "The Hobbit", author: "J.R.R. Tolkien" },
  ];

  const [books, setBooks] = useState<Book[]>(initialBooks);

  // Form inputs
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  // Bouton activé seulement si inputs OK
  const canAdd = title.trim().length > 0 && author.trim().length > 0;


  const nextIdRef = useRef<number>(
    initialBooks.reduce((max, b) => (b.id > max ? b.id : max), 0) + 1
  );

  function addBook() {
    const cleanTitle = title.trim();
    const cleanAuthor = author.trim();
    if (!cleanTitle || !cleanAuthor) return;

    const newBook: Book = {
      id: nextIdRef.current,
      title: cleanTitle,
      author: cleanAuthor,
    };

    nextIdRef.current += 1;

    setBooks((prev) => [...prev, newBook]);
    setTitle("");
    setAuthor("");
  }

  return (
    <div style={{ maxWidth: 650, margin: "40px auto", fontFamily: "system-ui" }}>
     

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addBook();
        }}
        style={{
          display: "grid",
          gap: 10,
          padding: 14,
          border: "1px solid #eee",
          borderRadius: 12,
          marginBottom: 18,
        }}
      >
        <label style={{ display: "grid", gap: 6 }}>
          <span>Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Example: Clean Code"
            style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Author</span>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Example: Robert C. Martin"
            style={{ padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          />
        </label>

        <button
          type="submit"
          disabled={!canAdd}
          style={{
            padding: 10,
            borderRadius: 10,
            border: "1px solid #ddd",
            cursor: canAdd ? "pointer" : "not-allowed",
            opacity: canAdd ? 1 : 0.6,
          }}
        >
          Add the book
        </button>
      </form>

      <List<Book>
        items={books}
        emptyMessage="No books for now."
        keyExtractor={(book) => book.id}
        renderItem={(book) => (
          <div>
            <div style={{ fontWeight: 700 }}>
              #{book.id} — {book.title}
            </div>
            <div style={{ opacity: 0.8 }}>Author: {book.author}</div>
          </div>
        )}
      />
    </div>
  );
}
