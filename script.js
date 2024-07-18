let personCount = 1;

function addPerson() {
    personCount++;
    const contributionsDiv = document.getElementById('contributions');
    const newPersonDiv = document.createElement('div');
    newPersonDiv.innerHTML = `<label for="amount${personCount}">Amount by Person ${personCount}: </label><input type="number" id="amount${personCount}" required>`;
    contributionsDiv.appendChild(newPersonDiv);
}

function splitExpense() {
    let totalAmount = 0;
    for (let i = 1; i <= personCount; i++) {
        const amount = parseFloat(document.getElementById(`amount${i}`).value);
        if (!isNaN(amount)) {
            totalAmount += amount;
        } else {
            document.getElementById('error').innerText = 'Please enter valid amounts.';
            document.getElementById('result').innerText = '';
            return;
        }
    }

    if (totalAmount > 0) {
        const amountPerPerson = totalAmount / personCount;
        document.getElementById('result').innerText = `Each person should pay: $${amountPerPerson.toFixed(2)}`;
        document.getElementById('error').innerText = '';
    } else {
        document.getElementById('error').innerText = 'Please enter valid amounts.';
    }
}

function resetFields() {
    document.getElementById('contributions').innerHTML = `
        <div>
            <label for="amount1">Amount by Person 1: </label>
            <input type="number" id="amount1" required>
        </div>`;
    personCount = 1;
    document.getElementById('result').innerText = '';
    document.getElementById('error').innerText = '';
}
