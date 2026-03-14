const BASE_URL = "http://localhost:8000";
const genderMap = {
  MALE: "ชาย",
  FEMALE: "หญิง",
  OTHER: "อื่นๆ",
};
const genderReverseMap = {
  ชาย: "MALE",
  หญิง: "FEMALE",
  อื่นๆ: "OTHER",
};
let selectedUserId = null;
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");

    console.log("User ID:", userId);

    if (!userId) {
      alert("No user id");
      return;
    }

    selectedUserId = userId;

    const res = await axios.get(`${BASE_URL}/user/${userId}`);
    const { user } = res.data;

    console.log("response:", user);

    const firstname = document.querySelector('input[name="firstname"]');
    firstname.value = user.firstname ?? "";
    document.querySelector('input[name="lastname"]').value =
      user.lastname ?? "";
    document.querySelector('input[name="age"]').value = user.age ?? "";
    document.querySelector('textarea[name="description"]').value =
      user.description ?? "";
    // interests
    if (user.interests) {
      const interestsArray = user.interests.split(",");

      document
        .querySelectorAll('input[name="interest"]')
        .forEach((checkbox) => {
          if (interestsArray.includes(checkbox.value)) {
            checkbox.checked = true;
          }
        });
    }
    // gender
    const thaiGender = genderMap[user.gender];

    if (thaiGender) {
      document.querySelectorAll('input[name="gender"]').forEach((radio) => {
        radio.checked = radio.value === thaiGender;
      });
    }
  } catch (err) {
    console.error(err);
    alert("โหลดข้อมูลผู้ใช้ไม่สำเร็จ");
  }
});

async function updateData() {
  try {
    const firstname = document.querySelector('[name="firstname"]').value;
    const lastname = document.querySelector('[name="lastname"]').value;
    const age = document.querySelector('[name="age"]').value;
    const description = document.querySelector('[name="description"]').value;

    const genderThai = document.querySelector(
      'input[name="gender"]:checked',
    )?.value;
    const gender = genderReverseMap[genderThai];

    const interestsArray = [
      ...document.querySelectorAll('input[name="interest"]:checked'),
    ].map((i) => i.value);

    const interests = interestsArray.join(",");

    const payload = {
      firstname,
      lastname,
      age,
      gender,
      interests,
      description,
    };

    // validate
    const errors = validateData({
      ...payload,
      interests: interestsArray,
    });

    if (errors.length > 0) {
      showMessage(errors.join(", "), "error");
      return;
    }

    await axios.put(`${BASE_URL}/user/${selectedUserId}`, payload);

    showMessage("อัปเดตข้อมูลสำเร็จ");
    setTimeout(() => {
      window.location.href = "user.html";
    }, 2000);
  } catch (error) {
    console.error(error);
    showMessage("อัปเดตข้อมูลไม่สำเร็จ", "error");
    setTimeout(() => {
      window.location.href = "user.html";
    }, 2000);
  }
}
function showMessage(message, type = "success") {
  const alertBox = document.getElementById("alert-message");

  alertBox.style.visibility = "visible";
  alertBox.innerText = message;

  if (type === "error") {
    alertBox.style.color = "red";
  } else {
    alertBox.style.color = "green";
  }
}
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

  if (!data.interests || data.interests.length === 0) {
    errors.push("กรุณาเลือกความสนใจอย่างน้อยหนึ่งข้อ");
  }

  return errors;
};
