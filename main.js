class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }

  addToTable(table) {
    const row = document.createElement('tr');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    const cell3 = document.createElement('td');
    const cell4 = document.createElement('td');

    const removeButton = document.createElement('button');
    removeButton.classList.add('btn', 'btn-danger');
    removeButton.innerHTML = 'Remove';

    cell1.innerHTML = this.title;
    cell2.innerHTML = this.author;
    cell3.innerHTML = this.isbn;
    removeButton.addEventListener('click', () => {
      books = books.filter(book => book.isbn != this.isbn);
      console.log(books);
      updateTableWithBooks();
    });

    cell4.append(removeButton);
    row.append(cell1);
    row.append(cell2);
    row.append(cell3);
    row.append(cell4);
    table.append(row);
  }
}

let books = [];
const booksAsJson = localStorage.getItem('books');
if (booksAsJson) {
  const bookArr = JSON.parse(booksAsJson);
  books = bookArr.map(x => new Book(x.title, x.author, x.isbn));
}


const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const isbnInput = document.getElementById('isbn');
const button = document.getElementById('button');
const table = document.getElementById('table-body');
const rowTemplate = document.getElementById('row-template');


button.addEventListener('click', () => {
  const title = titleInput.value;
  const author = authorInput.value;
  const isbn = isbnInput.value;

  titleInput.value = '';
  authorInput.value = '';
  isbnInput.value = '';

  const book = new Book(title, author, isbn);

  books.push(book);

  localStorage.setItem('books', JSON.stringify(books));
  updateTableWithBooks();
});


function updateTableWithBooks() {

  let length = table.children.length;
  for (let i = 0; i < length; i++) {
    const row = table.children[0];
    row.remove();
  }

  for (const book of books) {
    book.addToTable(table);
  }
}

updateTableWithBooks();