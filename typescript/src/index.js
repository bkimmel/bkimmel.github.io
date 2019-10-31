console.log('Hello TypeScript!');
var a = 1 + 2;
var b = a + 3;
var c = {
    apple: a,
    banana: b
};
var d = c.apple * 4;
var h = 'hhh';
var hh = d + h;
function squareOf(n) {
    return n * n;
}
squareOf(2); // evaluates to 4
var myArray = [
    {
        abc: 1
    },
    {
        abc: 2
    }
];
var myArrayb = [
    {
        abc: 1
    },
    {
        abc: 2
    }
];
var g = []; // any[]
g.push(1); // number[]
g.push('red'); // (string | number)[]
var myTuple = [
    { abc: 123 },
    { abc: 456 }
];
