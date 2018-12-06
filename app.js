const EmployeeParser = require('./parser/employee-parser');

const PDF_FILE_PATH = 'src/parser/source-files/RomSoft_Team_2018_10.pdf';
const EXCEL_FILE_PATH = 'src/parser/source-files/DATE_CONTACT_ECHIPA_RMS.xlsx';
const EMPLOYEES_JSON_FILE_PATH = 'src/parser/source-files/employees.json';

EmployeeParser.parse(EXCEL_FILE_PATH, PDF_FILE_PATH, EMPLOYEES_JSON_FILE_PATH);