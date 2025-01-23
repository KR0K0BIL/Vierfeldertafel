let numbers = []
let locks = []

function calc() {
    console.log("calc")
}

for (let i=0; i<9; i++) {
    let number = document.getElementById("number" + (i+1).toString())
    let lock = document.getElementById("lock" + (i+1).toString())
    numbers[i] = number
    locks[i] = lock
    number.addEventListener("input", calc)
    lock.addEventListener("input", calc)
}