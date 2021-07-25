'use strict';

let globalArray = [];
let min = 1;
let max = 500;
function Books(booksName, booksPrice) {
    this.booksName = booksName;
    this.bookPage = this.randomPage(min, max);
    this.booksPrice = booksPrice;
    globalArray.push(this);
}

Books.prototype.randomPage = function (min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);
};


Books.prototype.getTotal = function () {
    let totalPrice = 0;
    for (let i = 0; i < globalArray.length; i++) {

        totalPrice += parseInt(globalArray[i].booksPrice);


    };
    return totalPrice;
};

let table = document.getElementById('table');

function renderHeader() {

    let headerRow = document.createElement('tr');
    table.appendChild(headerRow);

    let thName = document.createElement('th');
    thName.textContent = "Book Name";
    headerRow.appendChild(thName);

    let thPage = document.createElement('th');
    thPage.textContent = "Book Pages";
    headerRow.appendChild(thPage);

    let thPrice = document.createElement('th');
    thPrice.textContent = "Price";
    headerRow.appendChild(thPrice);
};


Books.prototype.tableData = function () {

    for (let i = 0; i < globalArray.length; i++) {

        let trbookNew = document.createElement('tr');
        table.appendChild(trbookNew);

        let tdName = document.createElement('td');
        tdName.textContent = globalArray[i].booksName;
        trbookNew.appendChild(tdName);

        let tdPages = document.createElement('td');
        tdPages.textContent = globalArray[i].bookPage;
        trbookNew.appendChild(tdPages);


        let tdPrice = document.createElement('td');
        tdPrice.textContent = globalArray[i].booksPrice;
        trbookNew.appendChild(tdPrice);
    };
};

Books.prototype.renderFooter = function () {

    let FooterRow = document.createElement('tr');
    table.appendChild(FooterRow);

    let tdFooter = document.createElement('td');
    tdFooter.textContent = ' Total:    ';
     FooterRow.appendChild(tdFooter);

    let tdFooter2 = document.createElement('td');
    tdFooter2.textContent = Books.prototype.getTotal();;
    FooterRow.appendChild(tdFooter2);
};


let form = document.getElementById('BookForm');
form.addEventListener('submit', handelSubmit)

function handelSubmit(event) {

    let bookname = event.target.bookName.value;
    let bookprice = event.target.bookPrice.value;
    let newBook = new Books(bookname, bookprice);

    localStorage.setItem('allBooks', JSON.stringify(globalArray));
    GetBooks();
};

function GetBooks() {
    table.textContent = '';
    globalArray = [];
    let data = localStorage.getItem('allBooks');
    let parseBook = JSON.parse(data);
    if (parseBook) {
        for (let i = 0; i < parseBook.length; i++) {
            globalArray.push(parseBook[i]);

        }

    }
    renderHeader();
    Books.prototype.tableData();
    Books.prototype.renderFooter();
}
GetBooks();