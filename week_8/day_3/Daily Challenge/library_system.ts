// 1) Interface Book
interface Book {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre?: string; 
}


// 2) Classe Library
class Library {
  // tableau privé de livres
  private books: Book[] = [];

  // méthode publique pour ajouter un livre
  public addBook(book: Book): void {
    this.books.push(book);
  }

  // méthode publique pour récupérer les détails d'un livre par ISBN
  public getBookDetails(isbn: string): Book | undefined {
    return this.books.find((book) => book.isbn === isbn);
  }

  // méthode protégée pour donner accès aux livres aux sous-classes
  protected getAllBooks(): Book[] {
    return this.books;
  }
}


// 3) Classe DigitalLibrary qui étend Library
class DigitalLibrary extends Library {
  public readonly website: string;

  constructor(website: string) {
    super();
    this.website = website;
  }

  // retourne la liste des titres de tous les livres
  public listBooks(): string[] {
    return this.getAllBooks().map((book) => book.title);
  }
}


// 4) Démonstration

console.log("=== Daily Challenge: Library System ===");

// Création d'une DigitalLibrary
const myDigitalLibrary = new DigitalLibrary("https://my-digital-library.com");

// Ajout de quelques livres
myDigitalLibrary.addBook({
  title: "Clean Code",
  author: "Robert C. Martin",
  isbn: "9780132350884",
  publishedYear: 2008,
  genre: "Programming",
});

myDigitalLibrary.addBook({
  title: "The Pragmatic Programmer",
  author: "Andrew Hunt & David Thomas",
  isbn: "9780201616224",
  publishedYear: 1999,
});

myDigitalLibrary.addBook({
  title: "1984",
  author: "George Orwell",
  isbn: "9780451524935",
  publishedYear: 1949,
  genre: "Dystopian",
});

// Afficher les détails d'un livre par ISBN
const isbnToSearch = "9780132350884";
const bookDetails = myDigitalLibrary.getBookDetails(isbnToSearch);

if (bookDetails) {
  console.log(`Details for ISBN ${isbnToSearch}:`, bookDetails);
} else {
  console.log(`Book with ISBN ${isbnToSearch} not found.`);
}

// Afficher la liste de tous les titres
const allTitles = myDigitalLibrary.listBooks();
console.log("All book titles:", allTitles);

// Tester la propriété readonly
console.log("Library website:", myDigitalLibrary.website);
// myDigitalLibrary.website = "https://new-site.com"; // ❌ Erreur TypeScript (readonly)
