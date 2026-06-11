// function to validate student information
function getStudentInfo(event) {
    event.preventDefault();
    let studentName = document.getElementById('for-student-name').value;
    let registrationNumber = document.getElementById('for-registration-num').value;
    let semesterNumber = document.getElementById('for-semester-num').value;
    let cgpa = document.getElementById('for-cgpa').value;
    let creditHours = document.getElementById('for-credit-hours').value;
    let valid = true;
    
    document.querySelector('.validate-name').innerHTML = "";
    document.querySelector('.validate-regNum').innerHTML = "";
    document.querySelector('.validate-cgpa').innerHTML = "";
    document.querySelector('.validate-credits').innerHTML = "";

    if (studentName === "") {
        document.querySelector('.validate-name').innerHTML = "Student Name is mandatory.";
        valid = false;
    }
    else if (/\d/.test(studentName)) {
        document.querySelector('.validate-name').innerHTML = "Student Name can't have numbers.";
        valid = false;
    }

    let firstChar = registrationNumber[0]?.toLowerCase();
    if (registrationNumber === "") {
        document.querySelector('.validate-regNum').innerHTML = "Registration Number is mandatory.";
        valid = false;
    }
    else if (registrationNumber.length !== 11 || (firstChar !== 's' && firstChar !== 'f')) {
        document.querySelector('.validate-regNum').innerHTML = "Invalid Registration Number.";
        valid = false;
    }

    if (semesterNumber !== '1st') {
        if (cgpa === "") {
            document.querySelector('.validate-cgpa').innerHTML = "CGPA is mandatory.";
            valid = false;
        }
        else if (cgpa < 2 || cgpa > 4) {
            document.querySelector('.validate-cgpa').innerHTML = "Invalid CGPA.";
            valid = false;
        }
    }

    if (semesterNumber !== '1st') {
        if (creditHours === "") {
            document.querySelector('.validate-credits').innerHTML = "Credit Hours is mandatory.";
            valid = false;
        }
        else if (creditHours < 0 || creditHours > 120) {
            document.querySelector('.validate-credits').innerHTML = "Invalid Credit Hours.";
            valid = false;
        }
    }

    if (valid) {
        document.querySelector('.js-student-info').style.display='none';
        document.querySelector('.js-choose-buttons').style.display='flex';
    }
}

//function to display Grade Calculator
function showGradeCalculator(event){
    event.preventDefault();
    document.querySelector('.js-choose-buttons').style.display='none';
    document.querySelector('.grade-calculator').style.display='flex';
}

// function to display GPA Calculator
function showGPACalculator(event){
    event.preventDefault();
    document.querySelector('.js-choose-buttons').style.display='none';
    document.querySelector('.gpa-calculator').style.display='flex';
}