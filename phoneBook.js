'use strict';

var phoneBook = [];// Здесь вы храните записи как хотите
var person = {};
/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {
	
    function checkPhone(phone) {
        return /^((\+)?(\d{1,3})[\- ]?)?(\(\d{3}\)[\- ]?|(\d{3})[\- ]?)[\d\- ]{7,10}/.test(phone);
    }

    function checkMail(email) {
        return /(\b\w+)@(([а-яA-z0-9][-а-яA-z0-9]+\.)+[а-яA-z]{2,4})/.test(email);
    }

    if (checkPhone(phone) && checkMail(email)) {
        person = {
            name: name,
            phone: phone,
            email: email
        };
        phoneBook.push(person);
        return true;
    }
    return false;
};

function checkedObject(object, query) {
    var marginObject = Object.keys(object);
    for (var i = 0; i < marginObject.length; i++) {
        if (object[marginObject[i]].indexOf(query) !== -1) {
            return true;
        }
    }
    return false;
}

/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
    for (var i = 0; i < phoneBook.length; i++) {
        if (checkedObject(phoneBook[i], query)) {
            console.log(phoneBook[i].name + ', ' + phoneBook[i].phone + ', ' + phoneBook[i].email);
        }
    }
};

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {
    var results = [];
    var counter = 0;
    for (var i = 0; i < phoneBook.length; i++) {
        if (!checkedObject(phoneBook[i], query)) {
            results.push(phoneBook[i]);
        } else {
            counter++;
        }
    }
    phoneBook = results;
    console.log('Удален ' + counter + ' контакт.');
};

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');

    // Ваша чёрная магия:
    // - Разбираете записи из `data`
    // - Добавляете каждую запись в книгу
};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable(filename) {



};
