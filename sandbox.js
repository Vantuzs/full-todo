// Функции-генераторы
// Паттерн Итератор

// Итератор (паттерн)
/* 

Итератор - объект с помощью которого можно перебирать структуры не зная ихнего внутренего устройства

Итератор имеет метод next() - возвращает следующий метод колекции
                            И свойство done - завершили ли мы обход, или нет

*/

const numbers = [1,2,3,4,5];

const iterator = numbers[Symbol.iterator]();
console.log(iterator);

// iterator.next() -> получить следующий елемент

// customIterator

const myIterator = {
    data: [10,20,30,40,50],
    currentIndex: 0,
    next(){return this.currentIndex===this.data.length?{value: undefined,done: this.done = true}:{value: this.data[this.currentIndex++],done: this.done}},
    done: false
}


function* myGenerator() {
    console.log('Cтрочка 1');
    yield 'Sigma';
    console.log('Строчка 2');
    yield 'Sigma2';
    console.log('Строчка 3');
    yield 'MyBoy2';
}

const get = myGenerator();

function* mySecondGenerator(start,end) {
    for(let i =start;i<=end;i++){
        yield i;
    }
}

const got = mySecondGenerator() 

function* myThirdGenerator(){
    let value = yield;
    console.log(value);
}

const gen3 = myThirdGenerator()

/* 

Задача:

1. Написать функцию генератор которая генерирует числа от 0 до 100
С каждым вызовом этого генератора, число инкрементуется на 1
2. С помощью написаного генератора, найти сумму чисел от 0 до 100

*/

function* testGenerator(){
    
    let value = 0;
    for(let i = 0;i<=100;i++){
        value+=i
        yield i
    }
    console.log(value);
}

const test = testGenerator()

for(let i = 0;i<=101;i++){
    test.next()
}


function* testGenerator(a,b){
    
    let value = a;
    for(let i = a;i<=b;i++){
        value+=i
        yield i
    }
    console.log(value);
}

const test2 = testGenerator()

for(let i = 0;i<=101;i++){
    console.log(test2.next());
}