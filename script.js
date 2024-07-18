let personCount = 1;

function addPerson() {
    personCount++;
    const contributionsDiv = document.getElementById('contributions');
    const newPersonDiv = document.createElement('div');
    newPersonDiv.classList.add('person-input');
    newPersonDiv.innerHTML = `
        <label for="name${personCount}">Name: </label>
        <input type="text" id="name${personCount}" required>
        <label for="amount${personCount}">Amount: </label>
        <input type="number" id="amount${personCount}" required>`;
    contributionsDiv.appendChild(newPersonDiv);
}

function splitExpense() {
    let totalAmount = 0;
    let amounts = [];
    let names = [];
    for (let i = 1; i <= personCount; i++) {
        const name = document.getElementById(`name${i}`).value;
        const amount = parseFloat(document.getElementById(`amount${i}`).value);
        if (!isNaN(amount) && name.trim() !== "") {
            totalAmount += amount;
            amounts.push(amount);
            names.push(name);
        } else {
            document.getElementById('error').innerText = 'Please enter valid names and amounts.';
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
            detailedResult += `<li>${names[i]} should ${diff >= 0 ? 'receive' : 'pay'} $${Math.abs(diff).toFixed(2)}</li>`;
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
        <div class="person-input">
            <label for="name1">Name: </label>
            <input type="text" id="name1" required>
            <label for="amount1">Amount: </label>
            <input type="number" id="amount1" required>
        </div>`;
    personCount = 1;
    document.getElementById('result').innerText = '';
    document.getElementById('error').innerText = '';
    document.getElementById('detailedResult').innerHTML = '';
}
