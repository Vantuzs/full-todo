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

console.log(123);

const str = 'потоп';

const isPolindrom = (str)=>{

    const str2 = str.split('').reverse();
    const str3 = str.split('')

    let Bla;

    for(let i=0; i<=str2.length;i++){
        if(str3[i]!==str2[i]){
            Bla=false
            break;
        } else{
            Bla=true
        }
    }
    return Bla
}



















// раставьте цифры в логи так, что бы при выводе все шло по порядку

console.log('');

setTimeout(()=>{
    console.log('');
})

new Promise((res,rej)=>{
    console.log('');
    res()
}).then(()=>{
    console.log();
})

Promise.resolve().then(()=>{
    console.log();
}).then(()=>{
    console.log('');
})

Promise.resolve().then(()=>{
    console.log();
}).then(()=>{
    console.log('');
})

console.log('');

// Ответ

console.log('1');

setTimeout(()=>{
    console.log('9');
})

new Promise((res,rej)=>{
    console.log('2');
    res()
}).then(()=>{
    console.log('4');
})

Promise.resolve().then(()=>{
    console.log('5');
}).then(()=>{
    console.log('7');
})

Promise.resolve().then(()=>{
    console.log('6');
}).then(()=>{
    console.log('8');
})

console.log('3');





///////////////////

// Необходимо реализовать класс AsyncQueue который позволяет выполнять функции последовательно, даже если они возвращают промисы

const queue = new AsyncQueue();

queue.add(()=>console.log('1'))
queue.add(
    ()=>
        new Promise((resolve)=>{
            setTimeout(()=>{
                console.log('2');
                resolve();
            },1000)
        })
)
queue.add(()=>console.log('3'))
queue.add(
    ()=>
        new Promise((resolve)=>{
            setTimeout(()=>{
                console.log('4');
                resolve();
            },500)
        })
)