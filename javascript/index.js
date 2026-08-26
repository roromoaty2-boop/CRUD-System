let student = [];

student.push({
  id: 1,
  name: "Ahmed",
  age: 22,
  course: "JavaScript",
  status: "Active",
});

const nameInput = document.querySelector(".Name");
const ageInput = document.querySelector(".Age");
const courseInput = document.querySelector(".course");
const statusInput = document.querySelector(".status");

const addBtn = document.querySelector(".add");
const doneBtn = document.querySelector(".done");
const cancelBtn = document.querySelector(".cancel");

const searchInput = document.querySelector(".search");

const newStudent = document.querySelector(".data");

let editId = null;

function add() {
  const name = nameInput.value.trim();
  const age = Number(ageInput.value);
  const course = courseInput.value.trim();
  const status = statusInput.value;

  if (name === "" || ageInput.value === "" || course === "") {
    alert("Please fill all fields");
    return;
  }

  if (age < 18) {
    alert("Student must be 18 or older");
    return;
  }

  student.push({
    id: student.length + 1,
    name: name,
    age: age,
    course: course,
    status: status,
  });

  clearInputs();
  display(student);
}

addBtn.onclick = add;

function display(data = student) {
  newStudent.innerHTML = "";

  data.map((item) => {
    newStudent.innerHTML += `
      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.course}</td>
        <td>${item.status}</td>
        <td>
          <button class="edit" onclick="editStudent(${item.id})">
            Edit
          </button>

          <button class="delete" onclick="deleteStudent(${item.id})">
            Delete
          </button>
        </td>
      </tr>
    `;
  });
}

function deleteStudent(id) {
  student = student.filter((item) => {
    return item.id !== id;
  });

  display(student);
}

function editStudent(id) {
  const studentToEdit = student.find((item) => {
    return item.id === id;
  });

  if (!studentToEdit) {
    return;
  }

  nameInput.value = studentToEdit.name;
  ageInput.value = studentToEdit.age;
  courseInput.value = studentToEdit.course;
  statusInput.value = studentToEdit.status;

  editId = id;

  addBtn.style.display = "none";
  doneBtn.style.display = "block";
  cancelBtn.style.display = "block";
}

doneBtn.onclick = function () {
  const name = nameInput.value.trim();
  const age = Number(ageInput.value);
  const course = courseInput.value.trim();
  const status = statusInput.value;

  if (name === "" || ageInput.value === "" || course === "") {
    alert("Please fill all fields");
    return;
  }

  if (age < 18) {
    alert("Student must be 18 or older");
    return;
  }

  const studentToEdit = student.find((item) => {
    return item.id === editId;
  });

  if (!studentToEdit) {
    return;
  }

  studentToEdit.name = name;
  studentToEdit.age = age;
  studentToEdit.course = course;
  studentToEdit.status = status;

  clearInputs();

  display(student);

  editId = null;

  addBtn.style.display = "block";
  doneBtn.style.display = "none";
  cancelBtn.style.display = "none";
};

cancelBtn.onclick = function () {
  clearInputs();

  editId = null;

  addBtn.style.display = "block";
  doneBtn.style.display = "none";
  cancelBtn.style.display = "none";
};

searchInput.oninput = function () {
  const searchValue = searchInput.value.toLowerCase();

  const result = student.filter((item) => {
    return item.name.toLowerCase().includes(searchValue);
  });

  display(result);
};

function clearInputs() {
  nameInput.value = "";
  ageInput.value = "";
  courseInput.value = "";
  statusInput.value = "Active";
}

display();
