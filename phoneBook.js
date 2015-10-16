'use strict';

var phoneBook = [];// Здесь вы храните записи как хотите
/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {
    var person = {};
    function checkPhone(phone) {
        var regPhone = /^((\+)?(\d{1,3})[\- ]?)?(\(\d{3}\)[\- ]?|(\d{3})[\- ]?)[\d\- ]{7,10}/;
        return regPhone.test(phone);
    }

    function checkMail(email) {
        var regEmail = /^[-\w.]+@([A-zА-яЁё0-9][-A-zА-яЁё0-9]+\.)+[A-zА-яЁё]{2,4}$/;
        return regEmail.test(email);
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
    function editNumber(phone) {
        var reg = /\d+/g;
        var phone2 = '';
        phone = phone.match(reg).join('');

        for (var i = phone.length - 1; i >= 0; i--) {
            phone2 += phone[i];
            if ((i == phone.length - 3) || (i == phone.length - 4)) {
                phone2 += '-';
            } else if (i == phone.length - 7) {
                phone2 += ' )';
            } else if (i == phone.length - 10) {
                phone2 += '( ';
            }
        }
        if (phone.length == 10) {
            phone2 += '7';
        }
        phone2 += '+';
        return phone2.split('').reverse().join('');
    }

    for (var i = 0; i < phoneBook.length; i++) {
        if (!query) {
            console.log(phoneBook[i].name + ', ' + editNumber(phoneBook[i].phone) +
                ', ' + phoneBook[i].email);
        }

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
    var strings = data.split('\n');
    var counter = 0;

    for (var i = 0; i < string.length; i++) {
        var stringData = strings[i].replace('\r', '');
        var stringPerson = stringData.split(';');
        var nameData = stringPerson[0];
        var phoneData = stringPerson[1];
        var emailData = stringPerson[2];
        if (module.exports.add(nameData, phoneData, emailData)) {
            counter++;
        }
    }
    console.log('Добавлено' + counter + 'контакта');
};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable(filename) {



};
