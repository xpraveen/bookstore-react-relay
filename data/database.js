let books = [
    {
        "id": "1",
        "title": "Philosopher's Stone",
        "isAvailable": true
    }, {
        "id": "2",
        "title": "Chamber of Secrets",
        "isAvailable": false
    }, {
        "id": "3",
        "title": "Prisoner of Azkaban",
        "isAvailable": true
    }
];

let idCounter = 100;
export function addBook(title) {
    idCounter++;
    const book = {
        "id": "" + idCounter,
        "title": title
    };

    books.push(book);
    return book;
}

export function getBooks(args) {

    if (args && args.query) {
        return books.filter((book) => {
            if (book.title.search(new RegExp(args.query, "i")) >= 0) {
                return true;
            } else {
                return false;
            }
        });
    } else {
        return books;
    }
}
