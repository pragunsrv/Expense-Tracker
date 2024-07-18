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
        <input type="number" id="amount${personCount}" required>
        <label for="share${personCount}">Share (%): </label>
        <input type="number" id="share${personCount}" value="100" required>`;
    contributionsDiv.appendChild(newPersonDiv);
}

function splitExpense() {
    const date = document.getElementById('expenseDate').value;
    const description = document.getElementById('expenseDescription').value;
    if (date === '' || description.trim() === '') {
        document.getElementById('error').innerText = 'Please enter a valid date and description.';
        return;
    }

    let totalAmount = 0;
    let amounts = [];
    let names = [];
    let shares = [];
    let totalShare = 0;

    for (let i = 1; i <= personCount; i++) {
        const name = document.getElementById(`name${i}`).value;
        const amount = parseFloat(document.getElementById(`amount${i}`).value);
        const share = parseFloat(document.getElementById(`share${i}`).value);
        if (!isNaN(amount) && !isNaN(share) && name.trim() !== "") {
            totalAmount += amount;
            amounts.push(amount);
            names.push(name);
            shares.push(share);
            totalShare += share;
        } else {
            document.getElementById('error').innerText = 'Please enter valid names, amounts, and shares.';
            document.getElementById('result').innerText = '';
            document.getElementById('detailedResult').innerHTML = '';
            return;
        }
    }

    if (totalAmount > 0) {
        let detailedResult = '';
        for (let i = 0; i < amounts.length; i++) {
            const expectedContribution = (totalAmount * shares[i]) / totalShare;
            const diff = amounts[i] - expectedContribution;
            detailedResult += `<li>${names[i]} should ${diff >= 0 ? 'receive' : 'pay'} $${Math.abs(diff).toFixed(2)}</li>`;
        }
        document.getElementById('result').innerText = `Total amount: $${totalAmount.toFixed(2)} | Date: ${date} | Description: ${description}`;
        document.getElementById('error').innerText = '';
        document.getElementById('detailedResult').innerHTML = detailedResult;
    } else {
        document.getElementById('error').innerText = 'Please enter valid amounts.';
    }
}

function resetFields() {
    document.getElementById('expenseDate').value = '';
    document.getElementById('expenseDescription').value = '';
    document.getElementById('contributions').innerHTML = `
        <div class="person-input">
            <label for="name1">Name: </label>
            <input type="text" id="name1" required>
            <label for="amount1">Amount: </label>
            <input type="number" id="amount1" required>
            <label for="share1">Share (%): </label>
            <input type="number" id="share1" value="100" required>
        </div>`;
    personCount = 1;
    document.getElementById('result').innerText = '';
    document.getElementById('error').innerText = '';
    document.getElementById('detailedResult').innerHTML = '';
}
