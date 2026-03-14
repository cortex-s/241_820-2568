const BASE_URL = "http://localhost:8000";

const genderTranslate = { ชาย: "MALE", หญิง: "FEMALE", อื่นๆ: "OTHER" };
const validateData = (data) => {
  let errors = [];

  if (!data.firstname) {
    errors.push("กรุณากรอกชื่อ");
  }

  if (!data.lastname) {
    errors.push("กรุณากรอกนามสกุล");
  }

  if (!data.age) {
    errors.push("กรุณากรอกอายุ");
  }

  if (!data.gender) {
    errors.push("กรุณาเลือกเพศ");
  }

  if (data.interests.length === 0) {
    errors.push("กรุณาเลือกความสนใจอย่างน้อยหนึ่งข้อ");
  }

  return errors;
};
async function submitData() {
  const alertMessage = document.getElementById("alert-message");

  const firstname = document
    .querySelector('input[name="firstname"]')
    .value.trim();
  const lastname = document
    .querySelector('input[name="lastname"]')
    .value.trim();
  const age = document.querySelector('input[name="age"]').value;

  const genderInput = document.querySelector('input[name="gender"]:checked');
  const gender = genderInput
    ? genderInput.nextSibling.textContent.trim()
    : null;

  const interests = [];

  try {
    // if (!firstname || !lastname || !age || !gender) {
    //   throw new Error("กรุณากรอกข้อมูลให้ครบถ้วน");
    // }

    document
      .querySelectorAll('input[name="interest"]:checked')
      .forEach((item) => {
        interests.push(item.value);
      });

    // if (interests.length === 0) {
    //   throw new Error("กรุณาเลือกความสนใจอย่างน้อยหนึ่งข้อ");
    // }

    const description =
      document.querySelector('textarea[name="description"]').value.trim() ||
      null;

    const userData = {
      firstname,
      lastname,
      age,
      gender: genderTranslate[gender],
      interests,
      description,
    };

    const errors = validateData(userData);
    if (errors.length > 0) {
      throw {
        response: { data: { message: "Validation Error", error: errors } },
      };
    }

    const r = await axios.post(`${BASE_URL}/user`, userData);

    if (r.data) {
      alertMessage.style.color = "green";
      alertMessage.textContent = "User created successfully!";
      alertMessage.style.visibility = "visible";
      clearInput();
    }
  } catch (error) {
    alertMessage.style.color = "red";
    alertMessage.style.visibility = "visible";

    let message = "";
    let errList = [];

    if (error.response) {
      message = error.response.data.message || "Error";
      const err = error.response.data.error;

      if (Array.isArray(err)) {
        errList = err;
      } else if (err) {
        errList = [err];
      }
    } else {
      errList = [error.message];
    }

    const listHTML = errList.map((e) => `<li>${e}</li>`).join("");

    alertMessage.innerHTML = `
    <div>${message}</div>
    <ul>${listHTML}</ul>
  `;
  }
}
function clearInput() {
  // clear text inputs
  document.querySelector('input[name="firstname"]').value = "";
  document.querySelector('input[name="lastname"]').value = "";
  document.querySelector('input[name="age"]').value = "";

  // clear gender (radio)
  document
    .querySelectorAll('input[name="gender"]')
    .forEach((item) => (item.checked = false));

  // clear interests (checkbox)
  document
    .querySelectorAll('input[name="interest"]')
    .forEach((item) => (item.checked = false));

  // clear description
  document.querySelector('textarea[name="description"]').value = "";

  // delay 3 seconds แล้วค่อยซ่อน
  const alertMessage = document.getElementById("alert-message");
  setTimeout(() => {
    alertMessage.textContent = "";
    alertMessage.style.visibility = "hidden";
  }, 3000);
}
