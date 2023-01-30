// Drawing Pattern
// Ex. params(p, t) ---> params(5, 3)
//     output:   * * *
//             * * *
//           * * *

function JG(p, t){
    let output = ''
    let count = t
    for(let i=t; i>0; i--){
        for(let j=1; j<=p; j++){
            
            if((j === i || j >= i) && count > 0){
                
                output += '*'
                count--
            }else{
                output += ' '
            }

            if(count === 0){
                break;
            }
        }
        count = t
        output += '\n'
    }
    console.log(output)
}

JG(10, 5)