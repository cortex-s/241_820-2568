const genderTranslate = { ชาย: "MALE", หญิง: "FEMALE", อื่นๆ: "OTHER" };

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
    if (!firstname || !lastname || !age || !gender) {
      throw new Error("กรุณากรอกข้อมูลให้ครบถ้วน");
    }

    document
      .querySelectorAll('input[name="interest"]:checked')
      .forEach((item) => {
        interests.push(item.value);
      });

    if (interests.length === 0) {
      throw new Error("กรุณาเลือกความสนใจอย่างน้อยหนึ่งข้อ");
    }

    const description =
      document.querySelector('textarea[name="description"]').value.trim() ||
      null;

    const userData = {
      firstname,
      lastname,
      age,
      gender: genderTranslate[gender] || "OTHER",
      interests,
      description,
    };

    const r = await axios.post("http://localhost:8000/user", userData);

    if (r.data) {
      alertMessage.style.color = "green";
      alertMessage.textContent = "User created successfully!";
      alertMessage.style.visibility = "visible";
    }
  } catch (error) {
    console.log(error);

    alertMessage.style.color = "red";
    alertMessage.style.visibility = "visible";

    if (error.response) {
      alertMessage.textContent = `${error.response.data.message} | ${error.response.data.error}`;
    } else {
      alertMessage.textContent = error.message;
    }
  }
}
