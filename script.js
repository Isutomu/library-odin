const bookForm = document.querySelector('form');
const myLibrary = [];
// 'book' + capitalized property of Book constructor
const bookInfoFields = ['bookTitle', 'bookAuthor', 'bookPages', 'bookRead'];

class Book {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    
    info() {
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
    tableRow.setAttribute('position', 'relative');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-row');
    deleteButton.setAttribute('position', 'absolute');
    deleteButton.addEventListener('click', (e) => {
        const bookTable = document.querySelector('tbody');
        const tableRow = e.target.closest('tr');
        const bookTitle = tableRow.querySelector('.bookTitle').textContent;
        const libraryFiltered = myLibrary.filter((book) => book.title !== bookTitle);
        myLibrary.length = 0;
        for (book of libraryFiltered) {
            myLibrary.push(book);
        }
        tableRow.remove();
    });
    tableRow.appendChild(deleteButton);

    for (field of bookInfoFields) {
        if (field === 'bookRead') {
            continue;
        }
        const tableData = document.createElement('td');

        tableData.textContent = book[field.replace('book', '').toLowerCase()];
        tableData.classList.add(field);
        tableRow.appendChild(tableData);
    }

    const tableData = document.createElement('td');
    tableData.classList.add('bookRead');
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    if (book.read === 'on') {
        checkbox.setAttribute('checked', 'true');
    }
    checkbox.addEventListener('change', (e) => {
        const bookRead = e.target;
        const bookRow = bookRead.closest('tr');
        const bookTitle = bookRow.querySelector('.bookTitle').textContent;
        if (bookRead.getAttribute('checked') === 'true') {
            bookRead.setAttribute('checked', 'false');
            myLibrary.map((book) => {
                if (bookTitle === book.title) {
                    book.read = 'off';
                }
                return book;
            })
        } else {
            bookRead.setAttribute('checked', 'true');
            myLibrary.map((book) => {
                if (bookTitle === book.title) {
                    book.read = 'on';
                }
                return book;
            })
        }
    })

    tableData.appendChild(checkbox);
    tableRow.appendChild(tableData);

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