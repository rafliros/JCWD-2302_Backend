// Stepbonacci
// Ex. Input Params:
//          step: 3; max: 10;
//     Output:
//          [0, 3, 3, 6, 9]
//     Input Params:
//          step: 1; max: 5;
//     Output:
//          [0, 1, 1, 2, 3, 5]
function Stepbonacci(step, max){
    let output = [0, step]

    for(let i=2; i<=max; i++){
        let numberToPush = output[i-2] + output[i-1]

        if(numberToPush <= max){
            output.push(numberToPush)
        }else{
            break;
        }
    }
    console.log(output)
}
Stepbonacci(1, 5)


// Given an array of integers, give point for each integer based on the following:
//      - Add 1 point for even number
//      - Add 3 point for odd number, except number=3
//      - Add 5 point for number=3

// Ex.  input   : [1, 2, 3, 4, 5]
//      result  : 13
//      input   : [25, 30, 55]
//      result  : 7
//      input   : [3, 3, 3]
//      result  : 15

function SumPointInteger(arr){
    let totalPoint = 0 // 3 + 1 + 5 ...

    arr.forEach(value => {
        if(value % 2 === 0){
            totalPoint += 1
        }else if(value % 2 !== 0 && value !== 3){
            totalPoint += 3
        }else{
            totalPoint += 5
        }
    })

    console.log(totalPoint)
}

SumPointInteger([1, 2, 3, 4, 5])

