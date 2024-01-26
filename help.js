const axios = require("axios");
const DEPARTMENTS_URL = "https://w1h0d63b0m.execute-api.eu-central-1.amazonaws.com/dev/api/v1/departements";

const getPage = async (url) => {
    await axios.get(url).then((response) => {
        //console.log(response.data);
        const data = response.data;
        for (let i = 0; i < data.results.length; i++) {
            let departement = data.results[i];
            console.log(`"${departement.name_abbreviate}": ${departement.pk},`);
        }
        //console.log(data.next);
        if (!data.next) {
            return data.next;
        } else {
            getPage(data.next);
        }
    }).catch((err) => {
        throw err;
    });
}

async function main() {
    let next = DEPARTMENTS_URL;
    getPage(next);

}
main();