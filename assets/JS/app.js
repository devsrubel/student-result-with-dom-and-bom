/**
 * Use data table here...
 * const studentsTable = document.getElementById("students_list");

 * $(document).ready( function () {
    $('#myTable').DataTable();
   } );
 */

//    Start JS...
const addNewForm = document.getElementById("student_addNew_form");
const addResult = document.getElementById("addResult");
const msg = document.querySelector('.msg');
const editMsg = document.querySelector('.editMsg');
const result_alert = document.querySelector('.result_alert');
const edit_result_alert = document.querySelector('.edit_result_alert');
const createModalClose = document.querySelector('.createModalClose');
const editModalClose = document.querySelector('.editModalClose');
const editResultModalClose = document.querySelector('.editResultModalClose');
const addResultModalClose = document.querySelector('.addResultModalClose');
const students_content_list = document.getElementById("students_content_list");
const singleStudentViewInfo = document.getElementById("singleStudentViewInfo");
const resultSingleViewPart = document.getElementById("resultSingleViewPart");
const deleteUser = document.querySelector(".deleteUser");
const edit_student_form = document.getElementById("edit_student_form");
const editResult = document.getElementById("editResult");

// Show all data here...
const showAllStudents = (key) =>{
    // Get all students here...
    const allStudents = getLsData(key);

    // Take empty value here...
    let studentsList = "";
    
    // Now use condition here...
    if (allStudents.length > 0) {
        allStudents.reverse().map(({id,name,roll,reg,photo,result},index) => {
            const addShowResult = (data, id) =>{
                if (data) {
                    return `<button data-bs-toggle="modal" data-bs-target="#editResultModal" editResultId="${id}" class="btn btn-primary w-100">Edit Result</button>`
                } else {
                    return `<button data-bs-toggle="modal" data-bs-target="#addResultModal" addResultId="${id}" class="btn btn-info w-100">Add Result</button>`
                }
            }
            studentsList += `
            <tr>
                <td>${index + 1}</td>
                <td>
                    <img dataId="${id}" data-bs-target="#single_student_view" data-bs-toggle="modal" class="shadow" src="${imageView(photo)}" alt="${name}">
                </td>
                <td>${name}</td>
                <td>${roll}</td>
                <td>${reg}</td>
                <td>
                    <div class="result_button d-flex gap-2">${addShowResult(result, id)}</div>
                </td>
                <td>
                    <div class="actions d-flex gap-2">
                        <button dataId="${id}" data-bs-target="#single_student_view" data-bs-toggle="modal" class="btn btn-primary w-100"><i class="bi bi-eye"></i></button>
                        <button editModal=${id} data-bs-target="#editStudent" data-bs-toggle="modal" class="btn btn-warning w-100"><i class="bi bi-pen"></i></button>
                        <button deleteStudent="${id}" class="btn btn-danger deleteUser w-100"><i class="bi bi-trash2"></i></button>
                    </div>
                </td>
            </tr>`
        });
    } else {
        studentsList = `
        <tr>
            <td colspan="7">
                <p class="m-0 text-center" style="font-size: 20px;">Data Not Found</p>
            </td>
        </tr>`;
    }
    students_content_list.innerHTML = studentsList;
}

showAllStudents("students");

// Add data here...
if (addNewForm) {
    addNewForm.onsubmit = (e) =>{
        e.preventDefault();

        // Get form data here...
        const data = new FormData(e.target);
        // Convert to object here...
        const formData = Object.fromEntries(data.entries());
        // Distructre formData here...
        const {name,email,roll,reg,photo} = formData;

        // Check validation here...
        if (!name || !email || !roll || !reg) {
            msg.innerHTML = setAlert("All Fields Are Required!");
        } else if(!emailValidation(email)){
            msg.innerHTML = setAlert("Invalid Email! Type Right Email.")
        } else if(!numberValidation(roll)){
            msg.innerHTML = setAlert("Invalid Roll Type! It will be a Number.")
        } else if(!numberValidation(reg)){
            msg.innerHTML = setAlert("Invalid Registration Type! It Will be a Number.")
        }else {
            // Get data for id here...
            let students = getLsData("students");
            // Get student id here...
            let getId = Math.floor(Math.random() * 1000) + Date.now();

            // Set data in array here...
            students.push({
                id : Number(getId),
                name,
                email,
                roll,
                reg, 
                photo : photo ? photo : "https://i.ibb.co/Bt34sh7/student-avatar.jpg", 
                timeStamps : Date.now(),
                result : null
            })

            // Now set data in localStorage here...
            setLsData("students", students);

            // Data reset Now here...
            e.target.reset();

            // Reset data again here...
            showAllStudents("students");

            // Close popup now here...
            createModalClose.click();
        }
    }
}

// Tricky part here...
let studentId = null;

// Add result here...
if (addResult) {
    addResult.onsubmit = (e) =>{
        e.preventDefault();

        // Get form data here...
        const data = new FormData(e.target);
        // Convert to object here...
        const resultData = Object.fromEntries(data.entries());
        // Distructre formData here...
        const {bangla,english,math,physics,chemistry,religion} = resultData;
        

        // Check validation here...

        if (!bangla || !english || !math || !physics || !chemistry || !religion) {
            result_alert.innerHTML = setAlert("All Fields Are Required!");
        } else if(!numberValidation(bangla)){
            result_alert.innerHTML = setAlert("Invalid Bangla Number Type! It will be a Number.")
        } else if(!numberValidation(english)){
            result_alert.innerHTML = setAlert("Invalid English Number Type! It Will be a Number.")
        } else if(!numberValidation(math)){
            result_alert.innerHTML = setAlert("Invalid Math Number Type! It will be a Number.")
        } else if(!numberValidation(physics)){
            result_alert.innerHTML = setAlert("Invalid Physics Number Type! It Will be a Number.")
        } else if(!numberValidation(chemistry)){
            result_alert.innerHTML = setAlert("Invalid Chemistry Number Type! It will be a Number.")
        } else if(!numberValidation(religion)){
            result_alert.innerHTML = setAlert("Invalid Religion Number Type! It Will be a Number.")
        }else {
            // Get data for id here...
            let allStudents = getLsData("students");
            
            // Get single student here...
            let singleStudent = allStudents.find(data => data.id == studentId);

            // Take empty array here...
            let resultArray = [];

            // Push result in a student here...
            resultArray.push({bangla,english,math,physics,chemistry,religion});

            // Now set result in student result key here...
            singleStudent.result = resultArray;

            // Now get index here...
            let index = allStudents.findIndex(data => data.id == studentId);

            // Replace student data here....
            allStudents[index] = singleStudent;

            // Now set data in localStorage here...
            setLsData("students", allStudents);

            // Data reset Now here...
            e.target.reset();

            // Reset data again here...
            showAllStudents("students");

            // Close popup now here...
            addResultModalClose.click();
        }
    }
}

// Update data here...
if (edit_student_form) {
    edit_student_form.onsubmit = (e) =>{
        e.preventDefault();

        // Get form data here...
        const data = new FormData(e.target);
        // Convert to object here...
        const formData = Object.fromEntries(data.entries());
        // Distructre formData here...
        const {name,email,id,roll,reg,photo} = formData;

        // Check validation here...
        if (!name || !email || !roll || !reg) {
            editMsg.innerHTML = setAlert("All Fields Are Required!");
        } else if(!emailValidation(email)){
            editMsg.innerHTML = setAlert("Invalid Email! Type Right Email.")
        } else if(!numberValidation(roll)){
            editMsg.innerHTML = setAlert("Invalid Roll Type! It will be a Number.")
        } else if(!numberValidation(reg)){
            editMsg.innerHTML = setAlert("Invalid Registration Type! It Will be a Number.")
        }else {
            // Take a confirmation msg here...
            const confi = confirm("Are you sure to change this data?");

            if (confi) {
                // Get data for id here...
                let allStudents = getLsData("students");
                
                // Now replace data here...
                allStudents[allStudents.findIndex(data => Number(data.id) === Number(id))] = {
                    ...allStudents[allStudents.findIndex(data => Number(data.id) === Number(id))],
                    id : Number(id),name,email,roll,reg,photo : photo ? photo : "https://i.ibb.co/Bt34sh7/student-avatar.jpg"
                }
                // Now set data in localStorage here...
                setLsData("students", allStudents);

                // Data reset Now here...
                e.target.reset();

                // Reset data again here...
                showAllStudents("students");

                // Close popup now here...
                editModalClose.click();
            } else {
                // Close popup now here...
                editModalClose.click();
            }

        }
    }
}

// update result here....
if (editResult) {
    editResult.onsubmit = (e) =>{
        e.preventDefault();

        // Get form data here...
        const data = new FormData(e.target);
        // Convert to object here...
        const resultData = Object.fromEntries(data.entries());
        // Distructre formData here...
        const {bangla,english,math,physics,chemistry,religion,id} = resultData;

        // Check validation here...

        if (!bangla || !english || !math || !physics || !chemistry || !religion) {
            edit_result_alert.innerHTML = setAlert("All Fields Are Required!");
        } else if(!numberValidation(bangla)){
            edit_result_alert.innerHTML = setAlert("Invalid Bangla Number Type! It will be a Number.")
        } else if(!numberValidation(english)){
            edit_result_alert.innerHTML = setAlert("Invalid English Number Type! It Will be a Number.")
        } else if(!numberValidation(math)){
            edit_result_alert.innerHTML = setAlert("Invalid Math Number Type! It will be a Number.")
        } else if(!numberValidation(physics)){
            edit_result_alert.innerHTML = setAlert("Invalid Physics Number Type! It Will be a Number.")
        } else if(!numberValidation(chemistry)){
            edit_result_alert.innerHTML = setAlert("Invalid Chemistry Number Type! It will be a Number.")
        } else if(!numberValidation(religion)){
            edit_result_alert.innerHTML = setAlert("Invalid Religion Number Type! It Will be a Number.")
        }else {
            // Take a confirmation msg here...
            const confi = confirm("Are you sure to change this data?");
            if (confi) {
                // Get data for id here...
                let allStudents = getLsData("students");
                // Replace data here...
                allStudents[allStudents.findIndex(data => data.id === Number(id))].result[0]= {
                    ...allStudents[allStudents.findIndex(data => data.id === Number(id))].result[0],
                    bangla,english,math,physics,chemistry,religion
                }

                // Now set data in localStroage here...
                setLsData("students", allStudents);

                // Data reset Now here...
                e.target.reset();

                // Reload show result here...
                showAllStudents("students");

                // Close popup now here...
                editResultModalClose.click();
            } else {
                // Close popup now here...
                editResultModalClose.click();
            }
            
        }

    }
} else {
    
}

// View / delete / edit / view result Single data here...
if (students_content_list) {
    students_content_list.onclick = (e) =>{

        // Show single student here....
        if (e.target.getAttribute("dataId")) {
            // Get id from attribute here...
            let id = e.target.getAttribute("dataId");

            // Get all student here...
            const allStudents = getLsData("students");

            // Get single student here...
            const singleStudent = allStudents.find(data => data.id == id);
            singleStudentViewInfo.innerHTML = `<div class="student_image text-center mb-3 mt-2">
            <img class="shadow-lg rounded-circle w-50 h-50" src="${imageView(singleStudent.photo)}" alt="">
            </div>
            <div class="student_info">
                <table class="table table-hover table-responsive table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Title Info</th>
                    </tr>
                </thead>
                <tbody class="align-middle">
                    <tr>
                    <td>1</td>
                    <td>Student ID</td>
                    <td>${singleStudent.id}</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Student Name</td>
                    <td>${singleStudent.name}</td>
                    </tr>
                    <tr>
                    <td>3</td>
                    <td>Student Email</td>
                    <td>developerrubel.me@gmail.com</td>
                    </tr>
                    <tr>
                    <td>4</td>
                    <td>Roll Number</td>
                    <td>001101</td>
                    </tr>
                    <tr>
                    <td>5</td>
                    <td>Registration Number</td>
                    <td>998801</td>
                    </tr>
                    <!-- <tr>
                    <td>6</td>
                    <td>Student Status</td>
                    <td><button class="btn btn-primary pointer-event-none">Active</button></td>
                    </tr> -->
                </tbody>
                </table>
            </div>`;
            
        }

        // Show result here....
        if (e.target.getAttribute("viewResultId")) {
            // Get id now here...
            const id = e.target.getAttribute("viewResultId");

            // Gell all students here...
            let allStudents = getLsData("students");

            // Get single student here...
            const singleStudent = allStudents.find(data => data.id == id);

            // Subject here..
            let bangla = singleStudent.result[0].bangla
            let english = singleStudent.result[0].english
            let math = singleStudent.result[0].math
            let physics = singleStudent.result[0].physics
            let chemistry = singleStudent.result[0].chemistry
            let religion = singleStudent.result[0].religion

            // const get gpa mark here...
            const gpaGrade = () =>{
                return resultGpa(bangla) + resultGpa(english) + resultGpa(math) + resultGpa(physics) + resultGpa(chemistry) + resultGpa(religion)
            }

            // Show result here...
            resultSingleViewPart.innerHTML = `<div class="modal-header d-flex justify-content-between align-items-center">
            <h4 class="m-0">Hi ${singleStudent.name}, Your result list in below.</h4>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            
          </div>`
            
        }

        // Edit student here...
        if (e.target.getAttribute("editModal")) {
            // Get ls data here...
            const allStudents = getLsData("students");
            const {name,email,id,reg,roll,photo} = allStudents.find(data => data.id == e.target.getAttribute("editModal"));

            edit_student_form.innerHTML = `<div class="mb-3">
            <input type="text" value="${name}" name="name" placeholder="Student Name" class="form-control">
            </div>
            <div class="mb-3">
                <input type="text" value="${email}" name="email" placeholder="Student Email" class="form-control">
            </div>
            <div hidden class="my-3">
                <input type="text" value="${id}" name="id" placeholder="Student Roll" class="form-control">
            </div>
            <div class="my-3">
                <input type="text" value="${roll}" name="roll" placeholder="Student Roll" class="form-control">
            </div>
            <div class="my-3">
                <input type="text" value="${reg}" name="reg" placeholder="Student Reg" class="form-control">
            </div>
            <div class="my-3 text-center">
                <lable class="d-block text-left">Old Photo</lable>
                <img src="${imageView(photo)}" alt="${name}" class="w-50 h-50 rounded-circle my-2 shadow-lg">
            </div>
            <div class="my-3">
                <input type="text" value="${imageView(photo)}" name="photo" placeholder="Student Photo URL" class="form-control">
            </div>
            <div class="mt-3">
                <input type="submit" value="Update Data" placeholder="Student Photo URL" class="form-control w-100 btn btn-primary">
            </div>`;
        }

        // Edit result here....
        if (e.target.getAttribute("editResultId")) {
            // Get id now here...
            const id = e.target.getAttribute("editResultId");

            // Gell all students here...
            let allStudents = getLsData("students");

            // Get single student here...
            const singleStudent = allStudents.find(data => data.id == id);

            // Subject here..
            let bangla = singleStudent.result[0].bangla
            let english = singleStudent.result[0].english
            let math = singleStudent.result[0].math
            let physics = singleStudent.result[0].physics
            let chemistry = singleStudent.result[0].chemistry
            let religion = singleStudent.result[0].religion

            editResult.innerHTML = `
            <div hidden class="my-3">
                <input type="text" value="${id}" name="id" class="form-control">
            </div>
            <div class="mb-3">
            <input type="text" name="bangla" value="${bangla}" placeholder="Bangla" class="form-control">
            </div>
            <div class="my-3">
                <input type="text" name="english" value="${english}" placeholder="English" class="form-control">
            </div>
            <div class="my-3">
                <input type="text" name="math" value="${math}" placeholder="Math" class="form-control">
            </div>
            <div class="my-3">
                <input type="text" name="physics" value="${physics}" placeholder="Physics" class="form-control">
            </div>
            <div class="my-3">
                <input type="text" name="chemistry" value="${chemistry}" placeholder="Chemistry" class="form-control">
            </div>
            <div class="my-3">
                <input type="text" name="religion" value="${religion}" placeholder="Religion" class="form-control">
            </div>
            <div class="my-3">
                <input type="submit" value="Update Result" class="w-100 btn btn-info">
            </div>`;
            
        }

        // Add result here...
        if (e.target.getAttribute("addResultId")) {
            studentId = e.target.getAttribute("addResultId");
        }

        // Delete single student here...
        if (e.target.getAttribute("deleteStudent")) {
            // Get id from attribute here...
            const id = e.target.getAttribute("deleteStudent");
            
            // Take a confirmation here...
            const confi = confirm("Are you sure to delete this data!");

            // Now use condition here...
            if (confi) {
                // Get ls data here...
                const allStudents = getLsData("students");
                
                // Update student here...
                const updateStudents = allStudents.filter(data => data.id != id);
                
                // Now again set data in localStorage here..
                setLsData("students", updateStudents);

                // Reset all data here...
                showAllStudents("students");
            }
        }
    }
}