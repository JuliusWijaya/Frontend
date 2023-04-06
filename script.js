const resetData = () => {
  document.getElementById("name").value = "";
  document.getElementById("school").value = "";
  document.getElementById("prodi").value = "";
  document.getElementById("button").innerText = "Simpan";
  document.getElementById("button").setAttribute("onclick", `saveData()`);
};

const editData = (id, name, school, prodi) => {
  document.getElementById("name").value = name;
  document.getElementById("school").value = school;
  document.getElementById("prodi").value = prodi;
  document.getElementById("button").innerText = "Update";
  document
    .getElementById("button")
    .setAttribute("onclick", `updateData(${id})`);
};

const updateData = async (id) => {
  let name = document.getElementById("name").value;
  let school = document.getElementById("school").value;
  let prodi = document.getElementById("prodi").value;
  let text = "Serius Data Mau Diupdate ?";
  if (confirm(text)) {
    await axios
      .patch(`http://localhost:3000/students/${id}`, {
        name: name,
        school: school,
        prodi: prodi,
      })
      .then((Response) => {
        console.log(Response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
};

const saveData = async () => {
  let name = document.getElementById("name").value;
  let school = document.getElementById("school").value;
  let prodi = document.getElementById("prodi").value;
  await axios
    .post(`http://localhost:3000/students/`, {
      name: name,
      school: school,
      prodi: prodi,
    })
    .then((Response) => {
      alert("Success save students");
      console.log(Response);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const deleteData = async (id) => {
  let text = "Serius Data Mau Dihapus ?";
  if (confirm(text)) {
    await axios
      .delete(`http://localhost:3000/students/${id}`)
      .then((Response) => {
        alert("Success delete students");
        console.log(Response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
};

const getData = async () => {
  await axios
    .get(`http://localhost:3000/students`)
    .then((Response) => {
      let bucket = ``;
      let students = Response.data;
      if (students.length > 0) {
        for (let i = 0; i < students.length; i++) {
          bucket += `
        <tr>
            <td>${i + 1}</td>
            <td>${students[i].name}</td>
            <td>${students[i].school}</td>
            <td>${students[i].prodi}</td>
            <td>
              <button onclick="editData('${students[i].id}', '${
            students[i].name
          }', '${students[i].school}', '${students[i].prodi}', )"
                >EDIT</button>
              <button onclick="deleteData(${students[i].id})">DELETE</button>
            </td>
        </tr>
        `;
        }
      } else {
        bucket += `
          <tr>
            <td colspan="5" style="text-align: center; color: red">Data Tidak Ditemukan</td>
          </tr>
        `;
      }
      document.getElementById("result").innerHTML = bucket;
    })

    .catch((error) => {
      let bucket = `
        <tr>
            <td colspan="5" style="text-align: center">${error.message}</td>        
        </tr>
      `;
      document.getElementById("result").innerHTML = bucket;
    });
};

getData();
