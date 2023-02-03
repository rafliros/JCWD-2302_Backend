// 1. Ex. [11, 22, 33, 44, 55] ---> Output: 5
//        [111, 22, 33] ---> Output: 0

function A(arr){
    let point = 0

    for(let i=0; i<arr.length; i++){
        if(arr[i] >= 111){
            point = 0
            return point
        }else if(arr[i] % 11 === 0){
            point++
        }
    }

   return point
}

// console.log(A([11, 22, 33, 44, 55]))
// console.log(A([11, 22, 33, 111, 55]))



function B(arr){
    let arrPointDigitSatu = [] // [8]
    let arrPointAnotherSatu = [] // [100, 3, 5, ...]
    for(let i=0; i<arr.length; i++){ // Untuk nge-loop dan ngedapetin masing-masing angka dari dalam array
        let point = 0
        // Right Side
        console.log(`Posisi Angka Sekarang: ${arr[i]}`)
        for(let r=1; r<=arr[i]; r++){ // Untuk mendapatkan angka di sisi kanan
            if(arr[i+r] !== undefined){
                point += arr[i+r]
            }else{
                break;
            }
        }
        
        // Left Side
        for(let r=1; r<=arr[i]; r++){ // Untuk mendapatkan angka di sisi kiri 
            if(arr[i-r] !== undefined){
                point += arr[i-r]
            }else{
                break;
            }
        }
        
        if(arr[i] === 1){
            arrPointDigitSatu.push(point)
        }else{
            arrPointAnotherSatu.push(point) // [8, 16, 23, 8, 22, 21]
        }
        
    }
    console.log(arrPointDigitSatu)
    console.log(arrPointAnotherSatu)
    let result = false
    for(let i=0; i<arrPointDigitSatu.length; i++){
        for(let j=0; j<arrPointAnotherSatu.length; j++){
            if(arrPointDigitSatu[i] >= arrPointAnotherSatu[j]){
                result = false 
            }
        }
    }
    result = true 
    return result
}

console.log(B([ 4, 3, 5, 10, 1, 5, 9, 1]))