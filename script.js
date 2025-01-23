let numbers = []
let locks = []

function check(a, b, c) {
    let isa = (numbers[a].value != "")
    let isb = (numbers[b].value != "")
    let isc = (numbers[c].value != "")
    let valuea = parseFloat(numbers[a].value)
    let valueb = parseFloat(numbers[b].value)
    let valuec = parseFloat(numbers[c].value)

    if (isa && isb && !isc) {
        numbers[c].value = valuea + valueb
        numbers[c].disabled = true
        locks[c].disabled = true
    }
    if (isa && !isb && isc) {
        numbers[b].value = valuec - valuea
        numbers[b].disabled = true
        locks[b].disabled = true
    }
    if (!isa && isb && isc) {
        numbers[a].value = valuec - valueb
        numbers[a].disabled = true
        locks[a].disabled = true
    }
}

function calc() {
    for (let i = 0; i < 9; i++) {
        if (!locks[i].checked) {
            numbers[i].value = ""
        }
        numbers[i].disabled = false
        locks[i].disabled = false
    }
    console.log("calc")
    check(0, 1, 2)
    check(3, 4, 5)
    check(6, 7, 8)
    check(0, 3, 6)
    check(1, 4, 7)
    check(2, 5, 8)
    check(0, 1, 2)
    check(3, 4, 5)
    check(6, 7, 8)
    for (let i = 0; i < 9; i++) {
        if (numbers[i].value < 0) {
            numbers[i].classList.add('negative');
        } else {
            numbers[i].classList.remove('negative');
        }
    }
}

for (let i = 0; i < 9; i++) {
    let number = document.getElementById("number" + (i + 1).toString())
    let lock = document.getElementById("lock" + (i + 1).toString())
    numbers[i] = number
    locks[i] = lock
    number.addEventListener("input", () => {
        lock.checked = (number.value != "")
        calc()
    })
    lock.addEventListener("input", () => {
        if (lock.checked) {
            lock.checked = false
            number.focus()
        } else {
            number.value = ""
        }
        calc()
    })
}
