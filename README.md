# Bilkent Course Reg Info System

> aka SUS (Sesli Uyarı Sistemi)

## Kurulum

1. Node.js indir.
2. repositoryi indir.
3. `npm install .` komutunu çalıştır.
4. hazır. sanırım.
5. denemek için `node index.js` ile çalıştır.

## Nasıl Çalışır Step-by-Step instructions

1. "main" functionını bul.
2. `get_pk_from_code("")` fonksiyonunu bul ve "" içine ders kodunu yaz (eg. CS 102)
3. consoleda çıkan pk kodunu al ve `check(pk_code, section)` fonksiyonunda pk_code yerine yaz. section yerine de sectionı yaz.
4. çalıştır.
5. Program her 5 saniyede bir kontrol edecek ve boş yer varsa sesli uyaracaktır.

## Örnek main function

```js
async function main() {
  get_pk_from_code("HIST 200"); // buradan çıkan pk code 115685
  setInterval(() => {
    check(115685, 19);
  }, 5000);
  return;
}
```
