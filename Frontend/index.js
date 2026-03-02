const genderTranslate = { ชาย: "MALE", หญิง: "FEMALE", อื่นๆ: "OTHER" };

async function submitData() {
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
    document
      .querySelectorAll('input[name="interest"]:checked')
      .forEach((item) => {
        interests.push(item.value);
      });

    const description = document
      .querySelector('textarea[name="description"]')
      .value.trim();

    if (!firstname || !lastname || !age || !gender) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const userData = {
      firstname,
      lastname,
      age,
      gender: genderTranslate[gender] || "OTHER",
      interests,
      description,
    };
    let alertMessage = document.getElementById("alert-message");
    const r = await axios.post("http://localhost:8000/user", userData);
    if (r.data) {
      alertMessage.style.color = "green";
      alertMessage.textContent = "User created successfully!";
      alertMessage.style.visibility = "visible";
    }
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
      alertMessage.style.color = "red";
      alertMessage.textContent = `Error: ${error.response.data.message} | ${error.response.data.error}`;
      alertMessage.style.visibility = "visible";
    }
  }
}
