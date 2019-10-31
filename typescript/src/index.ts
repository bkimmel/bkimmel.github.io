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