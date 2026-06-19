Student Result Calculator

Overview

Student Result Calculator is a web-based application that helps students calculate their SGPA (Semester Grade Point Average) and CGPA (Cumulative Grade Point Average) based on subjects, grades, and credit hours.

The application allows students to enter personal academic information, add subjects with grades, and generate a result sheet that can also be downloaded as a PDF.

---

Features

Enter student information

  * Student name
  * Registration number
  * Semester number
  * Previous CGPA
  * Earned credit hours

GPA calculation

  * Add multiple subjects
  * Select grade for each subject
  * Select subject credit hours
  * Automatic SGPA calculation

Result generation

  * Display student information
  * Display subjects and grades
  * Calculate final SGPA and CGPA

PDF download

  * Download generated result as PDF

---

Technologies Used

* HTML5 — Structure of the application
* CSS3 — Styling and layout
* JavaScript (Vanilla JS) — Application logic
* html2canvas — Convert result section into image
* jsPDF — Generate downloadable PDF

---

Grade Point Mapping

| Grade | Grade Points |
| ----- | ------------ |
| A     | 4.00         |
| A-    | 3.67         |
| B+    | 3.33         |
| B     | 3.00         |
| B-    | 2.67         |
| C+    | 2.33         |
| C     | 2.00         |
| C-    | 1.67         |

---

How It Works

1. Enter student academic details.
2. Click Submit.
3. Add subjects with grades and credit hours.
4. Click Add to include each subject in calculation.
5. View live SGPA calculation.
6. Click Generate Result.
7. Download result as PDF if needed.

---

Project Structure


project/
│
├── index.html   # Main webpage
├── index.css    # Styling
└── index.js     # Application logic


---

Installation

1. Clone repository

```bash
git clone <repository-url>
```

2. Open project folder

```bash
cd student-result-calculator
```

3. Run application
   Open `index.html` in any browser.

---

Future Improvements

* Add responsive mobile design
* Add grade editing after submission
* Store student records in database
* Add printable transcript format
* Add support for failed subjects

---

Author

Developed by Muhammad Anas
