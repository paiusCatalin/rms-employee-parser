const fs = require('fs');
const CsvXlsxToJsonParser = require('./csv-xls-parser');
const PdfToJsonParser = require('./pdf-parser');

const createEmployeeJson = async (excelFile, pdfFile, destinationFile) => {
    const mergeExcelWithPdfData = (jsonFromExcel, jsonFromPdf) => {
        jsonFromPdf.forEach(pdfElement => {
            const index = jsonFromExcel.findIndex(excelElement => pdfElement.id == excelElement.id);
            if (index > -1) {
                jsonFromExcel[index] = { ...jsonFromExcel[index], ...pdfElement };
            } else {
                jsonFromExcel.push(jsonFromPdf);
            }
        });
        return jsonFromExcel;
    };

    const jsonFromExcel = CsvXlsxToJsonParser.parseFile({
        sourceFile: excelFile,
        sheets: ['Sheet1'],
        header: { rows: 1 },
        columnToKey: {
            A: 'nr',
            B: 'name',
            C: 'email',
            D: 'MSteamsID',
            E: 'phone',
            F: 'dateOfBirt'
        }
    });

    const jsonFromPdf = await PdfToJsonParser.parseFile(pdfFile);

    const fullJsonData = mergeExcelWithPdfData(jsonFromExcel.Sheet1, jsonFromPdf);

    fs.writeFile(destinationFile, JSON.stringify(fullJsonData), (error, data) => {
        if (error) {
            console.log(error);
        }
    });
};

var EmployeeParser = module.exports = {
    parse: (excelFile, pdfFile, destinationFile) => createEmployeeJson(excelFile, pdfFile, destinationFile)
};