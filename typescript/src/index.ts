console.log('Hello TypeScript!')

let a = 1 + 2
let b = a + 3
let c = {
  apple: a,
  banana: b
}
let d = c.apple * 4
let h = 'hhh'

let hh = d + h

function squareOf(n: number) {  
  return n * n
}
  
squareOf(2)     // evaluates to 4

type myShape = {
  abc: number
}

//equivalent to the statement below
let myArray: Array<myShape> = [
  {
    abc: 1
  },
  {
    abc: 2
  }
]

let myArrayb: myShape[] = [
  {
    abc: 1
  },
  {
    abc: 2
  }
]

let g = []                  // any[]
g.push(1)                   // number[]
g.push('red')               // (string | number)[]

let myTuple: [myShape, ...myShape[]] = [
  {abc: 123},
  {abc: 456}
]

// Named function
function greet(name: string) {  return 'hello ' + name}

// Function expression
let greet2 = function(name: string) {  return 'hello ' + name}

// Arrow function expression
let greet3 = (name: string) => {  return 'hello ' + name}

// Shorthand arrow function expression
let greet4 = (name: string) =>  'hello ' + name

// Function constructor (not ypechecked)
let greet5 = new Function('name', 'return "hello " + name')

// Optional parameter 'nickname'
let greet6 = (name: string, nickname?: string) =>  'hello' + ((nickname && ' ' + nickname) || '') + ' ' + name

console.log(greet6('Domino'))
console.log(greet6('Domino','Fats'))

//normal function declaration annotated with types
function add(a: number, b: number): number {
  return a + b
}

console.log( add(3,4) )
//Errors, as expected: console.log( add(3,'chair') )


function sumVariadicSafe(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0)
}

//Logs 6
console.log( sumVariadicSafe(1,2,3) )
//TSError: console.log( sumVariadicSafe(1,2,'c') )
//TSError: also works for .call, .apply, .bind //console.log( sumVariadicSafe.apply(null, [1,2,'c']) )

function fancyDate(this: Date) {
  return `${this.getDate()}/${this.getMonth()+1}/${this.getFullYear()}`
}

console.log( fancyDate.call(new Date()) )
//TSErrror: not assignable to method's this of type `Date` //fancyDate()

//Iterators are annotated with IterableIterator
function* myGenerator(): IterableIterator<number> {
  yield 1
  yield 2
  yield 3
}

let myNumberArray: number[] = [...myGenerator()]

console.log( myNumberArray )
