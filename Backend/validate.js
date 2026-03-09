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

module.exports = { validateData };
