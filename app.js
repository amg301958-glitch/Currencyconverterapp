async function convertCurrency() {
    // Get Currency from input
    let amount = document.getElementById("amount").value;
    let from = document.getElementById("fromCurrency").value;
    let to = document.getElementById("toCurrency").value;
    let resultDiv = document.getElementById("result");

    // Input Validation check
    if (!amount || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    resultDiv.innerHTML = "<p>Calculating live exchange rates...</p>";

    //  API URL
    const url = `https://api.frankfurter.dev/v2/rate/${from}/${to}`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.rate ) {
            let rate = data.rate;
            let totalExchange = (amount * rate).toFixed(2);

            
            resultDiv.innerHTML = `
                <p><strong>${amount} ${from}</strong> = ${totalExchange} ${to}<br>
                <small style="color:#777; font-size:12px;">1 ${from} = ${rate.toFixed(4)} ${to}</small></p>
            `;
        } else {
            resultDiv.innerHTML = `<p style="color:red; border-left-color:red;">Error fetching exchange data.</p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p style="color:red; border-left-color:red;">Network Error! Please try again.</p>`;
    }
}
