class LibraryCollection {
    constructor (capacity) { 
        this.capacity = capacity;
        this.books = [];
    }

    addBook (bookName, bookAuthor) {
        if (this.capacity < 1) {
            throw new Error ("Not enough space in the collection.");
        }

        this.books.push({
            bookName,
            bookAuthor,
            "payed": false
        });
        this.capacity -= 1;

        return `The ${bookName}, with an author ${bookAuthor}, collect.`
    }

    payBook(bookName) {
        let book = this.books.find(x => x.bookName == bookName);

        if(book == undefined) {
            throw new Error (`${bookName} is not in the collection.`);
        }

        if(book.payed) {
          throw new Error (`${bookName} has already been paid.`)
        }
        book.payed = true;
        return `${bookName} has been successfully paid.`
    }

    removeBook(bookName) {
        let book = this.books.find(x => x.bookName == bookName);

        if (book == undefined) {
            throw new Error ("The book, you're looking for, is not found.");
        }

        if (book.payed == false) {
            throw new Error (`${bookName} need to be paid before removing from the collection.`)
        }

        let index = this.books.indexOf(book);
        this.books.splice(index, 1);   // check for edge case
        this.capacity += 1;

        return `${bookName} remove from the collection.`
    }

    getStatistics(bookAuthor) {
        if (bookAuthor == undefined) {
            let sorted = this.books.sort((a , b) => a.bookName.localeCompare(b.bookName));
            let first = `The book collection has ${this.capacity} empty spots left.`;
            let arr = [];
            for (let book of sorted) {
                let paid = "";
                if (book.payed == false) {
                    paid = "Not Paid";
                } else {
                    paid = "Has Paid"
                }
                arr.push(`${book.bookName} == ${book.bookAuthor} - ${paid}.`);
            }

            return `${first}\n${arr.join("\n")}`;
        } else {
            let bookWithGivenAuthor = this.books.find(x => x.bookAuthor == bookAuthor);

            if (bookWithGivenAuthor == undefined) {
                throw new Error (`${bookAuthor} is not in the collection.`);
            } else {
                let paid = "";
                if (bookWithGivenAuthor.payed == false) {
                    paid = "Not Paid";
                } else {
                    paid = "Has Paid"
                }

                return `${bookWithGivenAuthor.bookName} == ${bookWithGivenAuthor.bookAuthor} - ${paid}.`
            }
        }
    }
}

const library = new LibraryCollection(2) 

console.log(library.addBook('Don Quixote', 'Miguel de Cervantes')); 

console.log(library.getStatistics('Miguel de Cervantes')); 

