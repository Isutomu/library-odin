const bookForm = document.querySelector('form');
const myLibrary = [];
// 'book' + capitalized property of Book constructor
const bookInfoFields = ['bookTitle', 'bookAuthor', 'bookPages', 'bookRead'];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`
    }
}

function addBookToLibrary(bookInfo) {
    const newBook = new Book(...bookInfo);
    myLibrary.push(newBook);
}

function displayBooks() {
    for (book of myLibrary) {
        addBookToTable(book);
    }
}

function addBookToTable(book) {
    const bookTable = document.querySelector('tbody');
    const tableRow = document.createElement('tr');

    for (field of bookInfoFields) {
        const tableData = document.createElement('td');

        tableData.textContent = book[field.replace('book', '').toLowerCase()];
        tableData.classList.add(field);
        tableRow.appendChild(tableData);
    }
    bookTable.appendChild(tableRow);
}

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newBookTitle = document.querySelector('#bookTitle').value;
    isBookInLibrary = myLibrary.reduce((exist, book) => (exist || book.title === newBookTitle), false);
    if (isBookInLibrary) {
        return;
    }

    const bookInfo = [];
    for (field of bookInfoFields) {
        bookInfo.push(document.querySelector(`#${field}`).value);
    }
    addBookToLibrary(bookInfo);
    addBookToTable(myLibrary.slice(-1)[0]);
});