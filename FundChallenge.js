// 1. Forward Alphabet
// Ex.  text    : 'y'
//      move    : 5
//      output  : 'd'
// Ex.  text    : 'pizza'
//      move    : 3
//      output  : 'slccd'
function forwardAlphabet(text, move){
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'
    
    let output = ''
    for(let i=0; i < text.length; i++){
        let indexMove = alphabet.indexOf(text[i]) + move
        if(indexMove > 25){
            indexMove = (alphabet.indexOf(text[i]) + move-1) - 25
            output += alphabet[indexMove]
        }else{
            output += alphabet[indexMove]
        }
    }

    console.log(output)
}

forwardAlphabet('pizza', 3)

// 2. Remove Duplicate Numbers
// Ex.  arrNumbers  : [3, 5, 3, 1, 2, 5]
//      output      : [3, 5, 1, 2]
function DuplicateNumbers(arrNumbers){
    let output = []

    for(let i=0; i<arrNumbers.length; i++){
        !output.includes(arrNumbers[i])? output.push(arrNumbers[i]) : null
    }

    console.log(output)
}

DuplicateNumbers([3, 5, 3, 1, 2, 5])