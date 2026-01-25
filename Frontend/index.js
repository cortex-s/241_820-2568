function submitData() {
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
    gender,
    interests,
    description,
  };

  console.log("Form Data:", userData);

  alert(
    `ข้อมูลที่ส่ง:\n` +
      `ชื่อ: ${firstname}\n` +
      `นามสกุล: ${lastname}\n` +
      `อายุ: ${age}\n` +
      `เพศ: ${gender}\n` +
      `งานอดิเรก: ${interests.join(", ")}\n` +
      `คำอธิบาย: ${description}`,
  );
}
