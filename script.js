const bookForm = document.querySelector('.bookForm');
const myLibrary = [];
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
    const bookTable = document.querySelector('.bookTable');
    const booksTitle = document.querySelectorAll('.bookTitle');
    const tableRow = document.createElement('tr');
    const tableData = document.createElement('td');

    for (book in myLibrary) {

        if (booksTitle) {
            if (booksTitle.map(el => el.value).reduce(
                (exist, bookTitle) => {
                    return exist || (bookTitle === book.title)
                }, false)
            ) {
                continue;
            }
        }

        for (field in bookInfoFields) {
            tableData.value = book[field];
            tableData.classList.add(field);
            tableRow.appendChild(tableData);
        }
        bookTable.appendChild(tableRow);
    }
}

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const bookInfo = [];
    for (field in bookInfoFields) {
        bookInfo.push(document.querySelector(`#${field}`).value)
    }

    addBookToLibrary(bookInfo);

    displayBooks();
});