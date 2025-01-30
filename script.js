let numbers = []
let locks = []
let n = []

function setText(id, a, b) {
    value = a / b
    object = document.getElementById(id)
    if (isNaN(value)) {
        object.innerText = ""
    } else {
        equal = "≈"
        if (Number.isInteger(value * 100)) {
            number = (value * 100) + '%'
            equal = "="
        } else if (Math.abs(value) < 0.01) {
            number = (value * 100).toPrecision(3) + '%'
        } else {
            number = (value * 100).toFixed(2) + '%'
        }
        object.innerHTML = a + "/" + b + " " + equal + " <b>" + number + "</b>"
    }
}

function check(a, b, c) {
    let isa = (numbers[a].value != "")
    let isb = (numbers[b].value != "")
    let isc = (numbers[c].value != "")

    if (isa && isb && !isc) {
        n[c] = n[a] + n[b]
        numbers[c].value = n[c]
        numbers[c].disabled = true
        locks[c].disabled = true
    }
    if (isa && !isb && isc) {
        n[b] = n[c] - n[a]
        numbers[b].value = n[b]
        numbers[b].disabled = true
        locks[b].disabled = true
    }
    if (!isa && isb && isc) {
        n[a] = n[c] - n[b]
        numbers[a].value = n[a]
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
        n[i] = parseFloat(numbers[i].value)
    }
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

    setText("PA", n[6], n[8])
    setText("P!A", n[7], n[8])
    setText("PB", n[2], n[8])
    setText("P!B", n[5], n[8])

    setText("PAnB", n[0], n[8])
    setText("PAn!B", n[3], n[8])
    setText("P!AnB", n[1], n[8])
    setText("P!An!B", n[4], n[8])

    setText("PAuB", n[8] - n[4], n[8])
    setText("PAu!B", n[8] - n[1], n[8])
    setText("P!AuB", n[8] - n[3], n[8])
    setText("P!Au!B", n[8] - n[0], n[8])

    setText("PAB", n[0], n[6])
    setText("PA!B", n[3], n[6])
    setText("P!AB", n[1], n[7])
    setText("P!A!B", n[4], n[7])
    setText("PBA", n[0], n[2])
    setText("PB!A", n[1], n[2])
    setText("P!BA", n[3], n[5])
    setText("P!B!A", n[4], n[5])
}

function swapCells(a, b) {
	av = numbers[a].value
	numbers[a].value = numbers[b].value
	numbers[b].value = av
	ac = locks[a].checked
	locks[a].checked = locks[b].checked
	locks[b].checked = ac
}

function swap() {
	av = A.value
	A.value = B.value
	B.value = av
	updateNames()
	swapCells(1, 3)
	swapCells(2, 6)
	swapCells(5, 7)
	calc()
}

function updateNames() {
    for (element of document.getElementsByClassName("A")) {
        element.innerText = A.value
    }
    for (element of document.getElementsByClassName("B")) {
        element.innerText = B.value
    }
}

let A = document.getElementById("A")
let B = document.getElementById("B")
A.addEventListener("input", updateNames)
B.addEventListener("input", updateNames)
updateNames()

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
