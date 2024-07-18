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
    let amounts = [];
    for (let i = 1; i <= personCount; i++) {
        const amount = parseFloat(document.getElementById(`amount${i}`).value);
        if (!isNaN(amount)) {
            totalAmount += amount;
            amounts.push(amount);
        } else {
            document.getElementById('error').innerText = 'Please enter valid amounts.';
            document.getElementById('result').innerText = '';
            document.getElementById('detailedResult').innerHTML = '';
            return;
        }
    }

    if (totalAmount > 0) {
        const amountPerPerson = totalAmount / personCount;
        let detailedResult = '';
        for (let i = 0; i < amounts.length; i++) {
            const diff = amounts[i] - amountPerPerson;
            detailedResult += `<li>Person ${i + 1} should ${diff >= 0 ? 'receive' : 'pay'} $${Math.abs(diff).toFixed(2)}</li>`;
        }
        document.getElementById('result').innerText = `Each person should pay: $${amountPerPerson.toFixed(2)}`;
        document.getElementById('error').innerText = '';
        document.getElementById('detailedResult').innerHTML = detailedResult;
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
    document.getElementById('detailedResult').innerHTML = '';
}
