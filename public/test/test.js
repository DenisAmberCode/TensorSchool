import '../js/app.js'
import {Person} from '../js/personLib.js';
import {Student} from '../js/personLib.js';
import {Teacher} from '../js/personLib.js';

describe("Тестируем модули", function() {
    'use strict';

    describe("Тестируем модуль Person", function() {

        it('Конструирование Person', function() {
            //arrange
            let params = {
    		      "id": 1,
    		      "fullName": "Иван Иванов",
    		      "type": "person",
    		      "birthDate": "1998-01-10",
    		      "photoUrl": "/image/ava01.jpg"
            };

            // act
            const person = new Person(params);

            //assert
            assert(person instanceof Person);
        });

        it('Тестируем метод birthDateStr', function() {
            //arrange
            let params = {
                  "id": 1,
                  "fullName": "Иван Иванов",
                  "type": "person",
                  "birthDate": "1998-01-10",
                  "photoUrl": "/image/ava01.jpg"
            };
            const person = new Person(params);

            // act

            let birthDateStr = person.birthDateStr;

            //assert
            assert.equal(birthDateStr, "10 января");
        });

        it('Тестируем метод age', function() {
            //arrange
            let params = {
                  "id": 1,
                  "fullName": "Иван Иванов",
                  "type": "person",
                  "birthDate": "1998-01-10",
                  "photoUrl": "/image/ava01.jpg"
            };
            const person = new Person(params);

            // act

            let age = person.age;

            //assert
            assert.equal(age, "22 года");  // Тест придётся изменять 2021-01-10 ))
        });
    });

    describe("Тестируем модуль Student", function() {
        it('Конструирование Student', function() {
            //arrange
            let params = {
              "id": 2,
              "fullName": "Маша Иванова",
              "type": "student",
              "university": "БФУ",
              "course": "1",
              "birthDate": "2001-03-02T00:00:00.000Z",
              "photoUrl": "/image/ava02.jpg"
            };

            // act
            const student = new Student(params);

            //assert
            assert(student instanceof Student);
        });

        it('Тестируем метод getLastStringInCard', function() {
            //arrange
            let params = {
              "id": 2,
              "fullName": "Маша Иванова",
              "type": "student",
              "university": "БФУ",
              "course": "1",
              "birthDate": "2001-03-02T00:00:00.000Z",
              "photoUrl": "/image/ava02.jpg"
            };
            const student = new Student(params);

            // act

            let lastStringInCard = student.getLastStringInCard();

            //assert
            assert.equal(lastStringInCard.outerHTML, '<span title="БФУ 1">БФУ 1</span>');
        });

        it('Тестируем метод getPostInExtendedCard', function() {
            //arrange
            let params = {
              "id": 2,
              "fullName": "Маша Иванова",
              "type": "student",
              "university": "БФУ",
              "course": "1",
              "birthDate": "2001-03-02T00:00:00.000Z",
              "photoUrl": "/image/ava02.jpg"
            };
            const student = new Student(params);

            // act

            let postInExtendedCard = student.getPostInExtendedCard();

            //assert
            assert.equal(postInExtendedCard.outerHTML, '<span title="Учится">Учится</span>');
        });

        it('Тестируем метод getLastStringInExtendedCard', function() {
            //arrange
            let params = {
              "id": 2,
              "fullName": "Маша Иванова",
              "type": "student",
              "university": "БФУ",
              "course": "1",
              "birthDate": "2001-03-02T00:00:00.000Z",
              "photoUrl": "/image/ava02.jpg"
            };
            const student = new Student(params);

            // act

            let lastStringInExtendedCard = student.getLastStringInExtendedCard();

            //assert
            assert.equal(lastStringInExtendedCard.outerHTML, '<p title="БФУ, 1 курс">БФУ, 1 курс</p>');
        });
    });

    describe("Тестируем модуль Teacher", function() {
        it('Конструирование Teacher', function() {
            //arrange
            let params = {
              "id": 7,
              "fullName": "Михаил Богатырёв",
              "type": "teacher",
              "post": "Преподаватель",
              "university": "УГАТУ",
              "birthDate": "2000-01-01T00:00:00.000Z",
              "photoUrl": "/image/ava01.jpg"
            };

            // act
            const teacher = new Teacher(params);

            //assert
            assert(teacher instanceof Teacher);
        });

        it('Тестируем метод getLastStringInCard', function() {
            //arrange
            let params = {
              "id": 7,
              "fullName": "Михаил Богатырёв",
              "type": "teacher",
              "post": "Преподаватель",
              "university": "УГАТУ",
              "birthDate": "2000-01-01T00:00:00.000Z",
              "photoUrl": "/image/ava01.jpg"
            };
            const teacher = new Teacher(params);

            // act

            let lastStringInCard = teacher.getLastStringInCard();

            //assert
            assert.equal(lastStringInCard.outerHTML, '<span title="Преподаватель">Преподаватель</span>');
        });

        it('Тестируем метод getPostInExtendedCard', function() {
            //arrange
            let params = {
              "id": 7,
              "fullName": "Михаил Богатырёв",
              "type": "teacher",
              "post": "Преподаватель",
              "university": "УГАТУ",
              "birthDate": "2000-01-01T00:00:00.000Z",
              "photoUrl": "/image/ava01.jpg"
            };
            const teacher = new Teacher(params);

            // act

            let postInExtendedCard = teacher.getPostInExtendedCard();

            //assert
            assert.equal(postInExtendedCard.outerHTML, '<span title="Преподаёт">Преподаёт</span>');
        });

        it('Тестируем метод getLastStringInExtendedCard', function() {
            //arrange
            let params = {
              "id": 7,
              "fullName": "Михаил Богатырёв",
              "type": "teacher",
              "post": "Преподаватель",
              "university": "УГАТУ",
              "birthDate": "2000-01-01T00:00:00.000Z",
              "photoUrl": "/image/ava01.jpg"
            };
            const teacher = new Teacher(params);

            // act

            let lastStringInExtendedCard = teacher.getLastStringInExtendedCard();

            //assert
            assert.equal(lastStringInExtendedCard.outerHTML, '<p title="УГАТУ">УГАТУ</p>');
        });
    });

});


mocha.run();

