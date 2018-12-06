const excelToJson = require('convert-excel-to-json');

const processEmployees = fullJsonData => {
    const processEmailAndGetID = email => email.split('@')[0].toUpperCase();

    const updateDateAndPlaceOfBirt = (jsonData, birthData) => {
        const info = birthData.split(', ');
        jsonData.dateOfBirt = info[0];
        jsonData.placeOfBirt = info.length > 1 ? info[1] : '';
    };

    fullJsonData.Sheet1.forEach((element, index) => {
        if (element.email) {
            fullJsonData.Sheet1[index].id = processEmailAndGetID(element.email);
        }
        if (element.dateOfBirt) {
            updateDateAndPlaceOfBirt(fullJsonData.Sheet1[index], element.dateOfBirt);
        }
    });
    return fullJsonData;
};

const CsvXlsxToJsonParser = module.exports = {
    parseFile: params => {
        let result = excelToJson(params);
        return processEmployees(result);
    }
};