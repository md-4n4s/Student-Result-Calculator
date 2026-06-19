//global variables
let studentName;
let registrationNumber;
let semesterNumber;
let cgpa;
let sgpa;
let creditHours=0;
let thisSemesterCreditHours=0;
let valid;
let subjectsInfo=[];
let gradePoints=0;

//function to display cgpa and sgpa on gpa calculator
function showGPA(){
    document.querySelector('.calculated-gpa').innerHTML = `
        <h5>SGPA: ${sgpa ? sgpa.toFixed(2) : "0.00"}</h5>
    `;
}

// function to validate student information
function getStudentInfo(event) {
    event.preventDefault();

    studentName = document.getElementById('for-student-name').value;
    registrationNumber = document.getElementById('for-registration-num').value;
    semesterNumber = document.getElementById('for-semester-num').value;
    cgpa = Number(document.getElementById('for-cgpa').value);
    creditHours = Number(document.getElementById('for-credit-hours').value);
    valid = true;
    
    document.querySelector('.validate-name').innerHTML = "";
    document.querySelector('.validate-regNum').innerHTML = "";
    document.querySelector('.validate-cgpa').innerHTML = "";
    document.querySelector('.validate-credits').innerHTML = "";

    if (studentName === "") {
        document.querySelector('.validate-name').innerHTML = "Student Name is mandatory.";
        valid = false;
    }

    if (registrationNumber === "") {
        document.querySelector('.validate-regNum').innerHTML = "Registration Number is mandatory.";
        valid = false;
    }

    if (semesterNumber !== '1st') {
        if (cgpa === 0) {
            document.querySelector('.validate-cgpa').innerHTML = "CGPA is mandatory.";
            valid = false;
        }
        else if (cgpa < 2 || cgpa > 4) {
            document.querySelector('.validate-cgpa').innerHTML = "Invalid CGPA.";
            valid = false;
        }
    }

    if (semesterNumber !== '1st') {
        if (creditHours === 0) {
            document.querySelector('.validate-credits').innerHTML = "Credit Hours is mandatory.";
            valid = false;
        }
        else if (creditHours < 0 || creditHours > 120) {
            document.querySelector('.validate-credits').innerHTML = "Invalid Credit Hours.";
            valid = false;
        }
    }

    if (valid) {
        switchSection(event, '.gpa-calculator');
    }

    if (semesterNumber === '1st'){
        cgpa=0;
        creditHours=0;
    }

    showGPA();
}

//function to switch page
function switchSection(event, sectionToShow) {
    event.preventDefault();

    document.querySelectorAll(
        '.js-student-info, .gpa-calculator'
    ).forEach(section => {
        section.style.display = 'none';
    });

    document.querySelector(sectionToShow).style.display = 'flex';
}

//function to add more subjects in GPA Calculator
function addMoreSubjects(event){
    event.preventDefault();

    const container = document.querySelector(".form-per-subject-container");
    const div = document.createElement("div");
    div.className = "form-per-subject input-container";
    div.innerHTML=`
        <input type="text" placeholder="e.g. Web Technologies" class="subject-name">
            <select class="grade-earned">
                <option>A</option>
                <option>A-</option>
                <option>B+</option>
                <option>B</option>
                <option>B-</option>
                <option>C+</option>
                <option>C</option>
                <option>C-</option>
            </select>
            <select class="subject-credit-hours">
                <option>1</option>
                <option>2</option>
                <option>3</option>
            </select>
            <button type="button" onclick="updateGPA(event,this);" class="js-update-gpa">Add</button>
    `;
    container.appendChild(div);
}

//function to update GPA
function updateGPA(event, current) {
    event.preventDefault();

    const form = current.closest('.form-per-subject');

    let subjectName = form.querySelector('.subject-name').value;
    let grade = form.querySelector('.grade-earned').value;
    let subjectCreditHours = Number(form.querySelector('.subject-credit-hours').value);
    let buttonState = form.querySelector('.js-update-gpa').innerHTML;

    let currentSubject = {
        Subject: subjectName,
        Grade: grade,
        Credits: subjectCreditHours
    };

    if (buttonState === "Add") {

        if (subjectName === "") {
            document.querySelector('.validate-subject-name').innerHTML =
                'Subject Name is Mandatory.';

            setTimeout(() => {
                document.querySelector('.validate-subject-name').innerHTML = '';
            }, 2000);

            return;
        }

        subjectsInfo.push(currentSubject);
        form.querySelector('.js-update-gpa').innerHTML = "Remove";
    }

    else if (buttonState === "Remove") {

        subjectsInfo = subjectsInfo.filter(s =>
            !(s.Subject === currentSubject.Subject &&
              s.Grade === currentSubject.Grade &&
              s.Credits === currentSubject.Credits)
        );

        form.querySelector('.js-update-gpa').innerHTML = "Add";
    }

    gradePoints = 0;
    thisSemesterCreditHours = 0;

    subjectsInfo.forEach(s => {
        const map = {
            "A": 4.00, "A-": 3.67,
            "B+": 3.33, "B": 3.00,
            "B-": 2.67,
            "C+": 2.33, "C": 2.00, "C-": 1.67
        };

        gradePoints += map[s.Grade] * s.Credits;
        thisSemesterCreditHours += s.Credits;
    });

    sgpa = thisSemesterCreditHours
        ? gradePoints / thisSemesterCreditHours
        : 0;

    showGPA();
}

//function to show generated result
function generateResult(event){
    event.preventDefault();
    document.querySelector('.generated-result-container').style.display='flex';
    showStudentInfo();
    showSubjectsInfo();
    showGPAInfo();
}

//function to hide generated result
function hideResult(event){
    event.preventDefault();
    document.querySelector('.generated-result-container').style.display='none';
}

//function to show student info on generated result
function showStudentInfo(){
    document.querySelector('.result-student-info').innerHTML=`
        <p><b>Name:</b> ${studentName}</p>
        <p><b>Reg Number:</b> ${registrationNumber}</p>
    `;
}
function showSubjectsInfo(){
    let object=``;
    for (let i=0;i<subjectsInfo.length;i++){
        object+=`
            <tr>
                <td>${subjectsInfo[i].Subject}</td>
                <td>${subjectsInfo[i].Grade}</td>
            </tr>
        `;
    }
    document.querySelector(".display-added-subjects").innerHTML=object;
}
function showGPAInfo(){
    cgpa=((cgpa*creditHours)+(sgpa*thisSemesterCreditHours))/(creditHours+thisSemesterCreditHours);
    document.querySelector(".js-calculated-gpa").innerHTML=`
        <p><b>SGPA:</b> ${sgpa.toFixed(2)}</p>
        <p><b>CGPA:</b> ${cgpa.toFixed(2)}</p>
    `;
}

//function to download result
async function downloadPDF() {
    const result = document.querySelector(".generated-result");
    const downloadBtn = document.querySelector(".download-button-container");
    downloadBtn.style.display = "none";
    const crossBtn = document.querySelector(".back-from-result");
    crossBtn.style.display = "none";

    const canvas = await html2canvas(result, {
        scale: 2
    });

    downloadBtn.style.display = "flex";
    crossBtn.style.display = "block";
    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = (canvas.height * pageWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
    pdf.save("Student-Result.pdf");
}   

showGPA();