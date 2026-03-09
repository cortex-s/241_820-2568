const BASE_URL = "http://localhost:8000";

window.onload = async () => {
  const r = await axios.get(`${BASE_URL}/users`);

  let userList = document.getElementById("user-list");

  r.data.forEach((element) => {
    userList.innerHTML += `
      <li>
        <span>${element.firstname}</span>
        <div class="actions">
          <button class="edit" onclick="editUser(${element.id})">แก้ไข</button>
          <button class="delete" onclick="deleteUser(${element.id})">ลบ</button>
        </div>
      </li>
    `;
  });
};

/* ลบ user */
async function deleteUser(id){
  if(confirm("ต้องการลบ user นี้หรือไม่?")){
    await axios.delete(`${BASE_URL}/user/${id}`);
    location.reload();
  }
}

/* แก้ไข user */
function editUser(id){
  window.location.href = `edit.html?id=${id}`;
}