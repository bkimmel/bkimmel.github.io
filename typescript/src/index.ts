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

//Type a call signature
type Log = (message: string, userId?: string) => void

let testLogA: Log = (message, userId="none") => {
  console.log(message, userId)
}

type Reservation = {
  id: number
}
//A function type annotation with overloaded call signature 
type Reserve = {
  (from: Date, to: Date, destination: string): Reservation
  (from: Date, destination: string): Reservation
}

//At the call-site, we account for the fact that the second param may be to _or_ destination
let reserve: Reserve = (
  from: Date,
  toOrDestination: Date | string,
  destination?: string
) => {
  if (toOrDestination instanceof Date && destination !== undefined) {
    // Book a one-way trip
    return {id: 1}
  } else if (typeof toOrDestination === 'string') {
    // Book a round trip
    return {id: 2}
  }
  else {
    return {id: 3}
  }
}

//Be careful to only use const enum and only with string values, otherwise numbers can be assigned to them
const enum CustomElements {
  anchor = 'a',
  canvas = 'canvas',
  table = 'table',
  generic = 'generic'
}

type CreateElement = {
  (tag: CustomElements.anchor): 1
  (tag: CustomElements.canvas): 2
  (tag: CustomElements.table): 3
  (tag: CustomElements.generic): 4
}

//to overload function declaration, just repeat the function name with different signatures
function randomF(arg: number): string;
function randomF(arg: string): number;
function randomF(arg: any): any {
  if(typeof arg === 'number'){
    return 'a number'
  }
  return 1010
}

console.log( randomF('a string') )
console.log( randomF(20) )

//Annotating properties that are assigned to functions:
type WarnUser = {
  (warning: string): void
  //Add the property annotation using this syntax
  wasCalled: boolean
}

function warnUser(warning: string) {
  if (warnUser.wasCalled) {
    return
  }
  warnUser.wasCalled = true
  console.log(warning)
}
warnUser.wasCalled = false

warnUser('warn once')
warnUser('warn once')

//### GENERIC PARAMETERS
type Filter = {
  (array: number[], f: (item: number) => boolean): number[]
  (array: string[], f: (item: string) => boolean): string[]
  (array: object[], f: (item: object) => boolean): object[]
}

function filter(myarray: unknown[], f: (arg0: unknown)=> unknown[]): unknown[] {
  let result: unknown[] = []
  for (let i = 0; i < myarray.length; i++) {
    let item = myarray[i]
    if (f(item)) {
      result.push(item)
    }
  }
  return result
}

let names = [
  {firstName: 'beth'},
  {firstName: 'caitlyn'},
  {firstName: 'xin'}
]

//The problem:
// let result = filter(
//   names,
//   _ => _.firstName.startsWith('b')
// ) //TS Error: Object is of type unkown

// result[0].firstName // Error TS2339: Property 'firstName' does not exist on type 'object'.

type FilterGeneric = {
  //Given a Type T, this signature takes Param1: array of T's and Param2: function that expects its first param to be T and RETURNS an array of T's (T[])
  //Typescript infers T from what we pass in the first argument as `array`
  <T>(array: T[], f: (item: T) => boolean): T[]
}

let genfilter: FilterGeneric = (array, f) => {
  let result = []
  for (let i = 0; i < array.length; i++) {
    let item = array[i]
    if (f(item)) {
      result.push(item)
    }
  }
  return result
}

console.log( genfilter([1, 2, 3], _ => _ > 2) )
console.log( genfilter(['aaa', 'aaaa', 'a'], _ => _.length > 2) )

let gennames = [
  {firstName: 'beth'},
  {firstName: 'caitlyn'},
  {firstName: 'xin'}
]
//Here, T is inferred as {firstname: string}
console.log( genfilter(gennames, _ => _.firstName[0] in {'b':1,'x':1}) )

//Annotate the Promise's generic parameter
let promise = new Promise<number>(resolve =>
  resolve(45)
)
promise.then(result => // number
  console.log( result * 2 )
)

type MyEvent<T> = {
  target: T
  type: string
}


type TimedEvent<T> = {
//can pass inferences
  event: MyEvent<T>
  from: Date
  to: Date
}

function triggerEvent<T>(t_event: TimedEvent<T>): MyEvent<T> {
  //some stuff for timed events
  return t_event.event
}

let mytimed = triggerEvent({ // T is Element | null
  event: {
    target: Promise.resolve(1),
    type: 'mouseover'
  },
  from: new Date(),
  to: new Date(),
})

let mytimedb = triggerEvent<Promise<number> | null>({ // T is Element | null
  event: {
    target: Promise.resolve(2),
    type: 'mouseover'
  },
  from: new Date(),
  to: new Date(),
})

//### Subtypes/Bounded Polymorphism: Use type annotations as "Upper Bounds" for other annotations
type TreeNode = {
  value: string
}
//We say that LeafNode has an "upper bound" of TreeNode or that LeafNode is a "Subtype" of tree node
type LeafNode = TreeNode & {
  isLeaf: true
}
type InnerNode = TreeNode & {
  children: [TreeNode] | [TreeNode, TreeNode]
}

//Here we say T has an upper bound of TreeNode. That is, T can be either a TreeNode, or a subtype of TreeNode.
function mapNode<T extends TreeNode>(
  node: T,
  f: (value: string) => string
): T {
  return {
    ...node,
    //1. Without the extends in the annotation above, mapNode would throw a compiletime error, because you can't read .value
    //on an _unbounded type_ (user could pass a number)
    //2. It also helps preserve the Type information as it passes trhough the function: Typing the return as just "TreeNode" would lose info
    value: f(node.value)
  }
}

//Add multiple constraints as upper bound of Shape
type HasSides = {numberOfSides: number}
type SidesHaveLength = {sideLength: number}

function logPerimeter<
  Shape extends HasSides & SidesHaveLength
>(s: Shape): Shape {
  console.log(s.numberOfSides * s.sideLength)
  return s
}

//Annotate this type Square as a combination of constraints
type Square = HasSides & SidesHaveLength
let square: Square = {numberOfSides: 4, sideLength: 3}
logPerimeter(square) // Square, logs "12"

//## PRESERVING TYPE INFO IN VARIADIC FUNCTIONS

function fill(length: number, value: string): string[] {
  return Array.from({length}, () => value)
}

//Here, T stands in for "an array of args that are not known until the func is called"
//...and R is "The type of thing the provided function will return"
function call<T extends unknown[], R>(
  //Without the "extends unkown" above, TS will insist that a rest param must be an array type
  f: (...args: T) => R,
  //Here, TS will infer a _tuple_ for T based on what was passed in...
  ...args: T
): R {
  //And it can compare that tuple to what R expects
  return f(...args)
}

let fill_1_result = call(fill, 10, 'a') //string[] : preserved by R above
//let fill_2_result = call(fill, 10) //TS Error: Expected 3 arguments but got 2

//## DEFAULTS FOR GENERIC TYPES
type SomePromiseThing<P extends Promise<unknown> = Promise<number>> = {
  promise: P
  metainfo: string
}

//If you want the P to resolve as a string, you must be explicit, because Promise<number> is the default
let promise_1_test: SomePromiseThing<Promise<string>> = {
  promise: Promise.resolve('aa'), //Promise<string> bc of the annotation above
  metainfo: 'blahblahblah'
}

//But if you want to use the Type Dec's default, you don't need to annotate
let promise_2_test: SomePromiseThing = {
  promise: Promise.resolve(2), //Promise<number>
  metainfo: 'blahblahblah'
}

function testis<T> (...args: T[]): boolean {
  const fst: T = args[0];
  let ret: boolean = true;
  args.forEach((v: T, i)=>{ if(!(v === fst)){ ret = false } });
  return ret;
}

console.log(testis(1,1), testis(1,1,1), testis(1,1,2))
//console.log(testis(1,1,'1')) //TS: Type "1" is not assignable to "number"
