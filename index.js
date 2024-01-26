const axios = require("axios");
const player = require("sound-play");
const path = require("path");
const DEPARTMENT_CODES = require("./department_codes.json");

//cs 102 -> 115406

// https://w1h0d63b0m.execute-api.eu-central-1.amazonaws.com/dev/api/v1/departements/12/courses?semester=20232  bu cs için
// https://w1h0d63b0m.execute-api.eu-central-1.amazonaws.com/dev/api/v1/departements/${department_code}/courses?semester=20232

const get_courses = (department_code) => {
  axios
    .get(
      `https://w1h0d63b0m.execute-api.eu-central-1.amazonaws.com/dev/api/v1/departements/${department_code}/courses?semester=20232`
    )
    .then((response) => {
      console.log(`PK CODE: ${response.data}`);
    })
    .catch((error) => {
      console.log(error);
    });
};

// eg. CS 102
const get_pk_from_code = async (course_code) => {
  const [ABR, CODE] = course_code.split(" ");
  const department_code = DEPARTMENT_CODES[ABR];
  await axios
    .get(
      `https://w1h0d63b0m.execute-api.eu-central-1.amazonaws.com/dev/api/v1/departements/${department_code}/courses?semester=20232`
    )
    .then((response) => {
      const courses = response.data.courses;
      for (let i = 0; i < courses.length; i++) {
        if (courses[i].code == course_code) {
          console.log(courses[i].pk);
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const find_index = (sections, section_number) => {
  for (let i = 0; i < sections.length; i++) {
    if (section_number == sections[i].section_number) {
      return i;
    }
  }
};

const check = (pk, section_number) => {
  axios
    .get(
      `https://w1h0d63b0m.execute-api.eu-central-1.amazonaws.com/dev/api/v1/courses/${pk}`
    )
    .then((response) => {
      const index = find_index(response.data.sections, section_number);
      const section = response.data.sections[index];
      const quata = section.total_available_quata;
      if (quata === 0) {
        console.log(`${response.data.code}-${section_number} Quota: ${quata}`);
        return false;
      } else {
        console.log(`${response.data.code}-${section_number} Quota: ${quata}`);
        const filePath = path.join(__dirname, "pipe.mp3");
        player.play(filePath);
        return true;
      }
    })
    .catch((error) => {
      throw error;
    });
};
async function main() {
  get_pk_from_code("HIST 200");
  setInterval(() => {
    check(115685, 19);
  }, 5000);
  return;
}

main();
