# vue-calculator

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Thoughts on calculator execution
### Stack
#### Ex 1
2+3*4=14 => 2+(3*4)=14 => push '2' -> push 'add' -> push '3' -> push 'mul' -> push '4'
1. push '2'
2. new OP
  2.1. pull '2'
  2.2 push 'add'
  2.3 push '2'
3. push '3'
4. new prio OP
  4.1 pull '3'
  4.2 push 'mul'
  4.3 push '3'
5. push '4'
6. Result R=[add, 2, mul, 3, 4]
7. R[0](R[1], R[2](R[3], R[4])) => add(2, mul(3, 4))
#### Ex 2
2+3*4*2=26 => add(2, mul(3, mul(4, 2)))
#### Ex 3
4*3*2+2=26 => mul(4, mul(3,2))...
### Every second
Each OP och FN shall define number of parameters and expected order. For example, multiply is using preceding number and following number of the OP it self.Hence, order of input gives index of OP and parameters are found -1 and +1 of self index.
#### Ex 1
2+3*4=14
0|2|4
 1 3
1. Select mul and divs on first round
2. index of mul is 3, factors are index 2 and 4 => mul([2], [4]) => mul(3,4)
3. insert result, replacing index 2,3,4 with result
4. 2+12=14
   0| 2
    1
5. OP found at index 1, terms are index 0 and 2 => add([0], [2]) => add(2,12)
6. insert result replacing index 0,1,2 with result
7. 14=14, one item left in array, we're done
#### Ex 2
4*3*2+2(=26)
0|2|4|6
 1 3 5
->mul([0],[2])
12*2+2
0 |2|4
  1 3
->mul([0],[2])
24+2
0 |2
  1
->add([0],[1])
#### Pseudo code
```
while (listOfInputs.length > 1) {
    if (indexOfMul or indexOfDiv) {
        newValue = OP(listOfInputs[indexOfMul-1],listOfInputs[indexOfMul+1])
        listOfInputs = listOfInputs.slice(indexOfMul-1, 3, newValue)
        continue;
    }
    if (indexOfAdd or indexOfSub) {
        continue;
    }
}
```

