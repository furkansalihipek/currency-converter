const api = "https://api.exchangerate-api.com/v4/latest/TRY";

function getData(api) {
    fetch(api)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            const TRY = data.rates.TRY;
            const USD = TRY / data.rates.USD;
            const EUR = TRY / data.rates.EUR;
            const GBP = TRY / data.rates.GBP;
            const GEL = TRY / data.rates.GEL;
            const JPY = TRY / data.rates.JPY;
            const AUD = TRY / data.rates.AUD;
            const CAD = TRY / data.rates.CAD;
            const CHF = TRY / data.rates.CHF;
            const CNY = TRY / data.rates.CNY;
            const RUB = TRY / data.rates.RUB;
            const SEK = TRY / data.rates.SEK;
            const NOK = TRY / data.rates.NOK;

            setData(USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY, RUB, SEK, NOK, GEL);
        })
        .catch(error => console.log(error));
}

function setData(USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY, RUB, SEK, NOK, GEL) {
    document.getElementById("dolar-value").textContent = USD.toFixed(2);
    document.getElementById("euro-value").textContent = EUR.toFixed(2);
    document.getElementById("sterlin-value").textContent = GBP.toFixed(2);
    document.getElementById("gel-value").textContent = GEL.toFixed(2);
    document.getElementById("yen-value").textContent = JPY.toFixed(2);
    document.getElementById("aud-value").textContent = AUD.toFixed(2);
    document.getElementById("cad-value").textContent = CAD.toFixed(2);
    document.getElementById("chf-value").textContent = CHF.toFixed(2);
    document.getElementById("cny-value").textContent = CNY.toFixed(2);
    document.getElementById("rub-value").textContent = RUB.toFixed(2);
    document.getElementById("sek-value").textContent = SEK.toFixed(2);
    document.getElementById("nok-value").textContent = NOK.toFixed(2);
}

getData(api);
setInterval(() => {
    getData(api);
}, 30000);

const input = document.getElementById("input");
const output = document.getElementById("output");
const currencyFrom = document.getElementById("currency-from");
const currencyTo = document.getElementById("currency-to");

function changeCurrency() {
    const selectedCurrencyFrom = currencyFrom.value;
    const selectedCurrencyTo = currencyTo.value;
    const inputValue = parseFloat(input.value);

    fetch(api)
        .then(res => res.json())
        .then(data => {
            const rates = data.rates;

            if (selectedCurrencyFrom === "TRY") {
                output.value = (inputValue / rates[selectedCurrencyTo]).toFixed(2);
            } else {
                const baseValue = inputValue * rates[selectedCurrencyFrom];
                output.value = (baseValue / rates[selectedCurrencyTo]).toFixed(2);
            }
        })
        .catch(error => console.log(error));
}

input.addEventListener("input", changeCurrency);
currencyFrom.addEventListener("change", changeCurrency);
currencyTo.addEventListener("change", changeCurrency);