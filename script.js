function splitExpense() {
    const totalAmount = parseFloat(document.getElementById('totalAmount').value);
    const numPeople = parseInt(document.getElementById('numPeople').value);

    if (!isNaN(totalAmount) && !isNaN(numPeople) && numPeople > 0) {
        const amountPerPerson = totalAmount / numPeople;
        document.getElementById('result').innerText = `Each person should pay: $${amountPerPerson.toFixed(2)}`;
    } else {
        document.getElementById('result').innerText = 'Please enter valid values.';
    }
}
