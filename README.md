# Döviz Çevirici

## Genel Bakış

Bu JavaScript uygulaması, bir API'den döviz kurlarını alır ve Türk Lirası (TRY) ile diğer para birimleri arasındaki dönüşüm oranlarını gösterir. Ayrıca kullanıcıların farklı para birimleri arasında dinamik olarak değer dönüştürmelerine olanak tanır.

## Özellikler

- ExchangeRate-API'den canlı döviz kurlarını alır.
- TRY'ye göre çeşitli para birimlerinin dönüşüm oranlarını gösterir.
- Kullanıcıların bir para biriminde bir miktar girmesine ve başka bir para biriminde karşılık gelen miktarı almasına olanak tanır.
- Her 30 saniyede bir döviz kurlarını otomatik olarak günceller.


# Kod Açıklaması

## API URL'i

```js
const api = "https://api.exchangerate-api.com/v4/latest/TRY";
```
- api adında bir sabit oluşturulur ve bu sabit TRY için en son döviz kurlarını sağlayan API'nin URL'sini tanımlar.

## Döviz Kurlarını Alma

```js
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
```

 ```js
function getData(api)
```
- API'dan veri çeken bir fonksiyon tanımlanır.

```js
 fetch(api)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
```

- Belirtilen URL'den HTTP isteiği gönderilir.
- İstek başarılı olduğu taktirde gelen cevap JSON formatına çevrilir.
- JSON verileri alınır ve konsola yazdırılır.

```js
const TRY = data.rates.TRY;
const USD = TRY / data.rates.USD;
const EUR = TRY / data.rates.EUR;
```

- JSON verilerinden TRY değeri alınır
- Dolar ve Euro değerlerini bulmak için birimlerin TRY değerine bölünür
- Diğer para birimleri içinde aynı işlem tekrarlanır

```js
setData(USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY, RUB, SEK, NOK, GEL); 
```

- Hesaplanan döviz kurlarını ekranda göstermek için setData fonksiyonunu çağırır.

```js
.catch(error => console.log(error));
```
- Hata alınması durumunda hata mesajı konsola yazdırılır.

## Verileri Ekrana Yazma

```js
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
```

- Döviz kurlarını ekranda göstermek için setData fonksiyonu tanımlanır.
- HTML elementleri seçilir ve içeriği güncellenir.

```js
setInterval(() => {
    getData(api);
}, 30000);
```

- Döviz kurlarını her 30 saniyede güncellenir.

## Döviz Dönüştürme

```js
const input = document.getElementById("input");
const output = document.getElementById("output");
const currencyFrom = document.getElementById("currency-from");
const currencyTo = document.getElementById("currency-to");
```

- HTML elementleri seçilir.

```js
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
```

- function changeCurrency(): Para birimlerini dönüştürmek için bir fonksiyon tanımlar.
- fetch(api): API'den döviz kurlarını almak için istek gönderir.
- if (selectedCurrencyFrom === "TRY"): Eğer seçilen para birimi TRY ise, doğrudan dönüşüm yapar.
- else { ... }: Eğer seçilen para birimi TRY değilse, önce baz değeri hesaplar ve ardından dönüşüm yapar.