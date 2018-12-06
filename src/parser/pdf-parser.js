const fs = require('fs');
const pdf = require('pdf-parse');

const parseTextFromPdf = text => {
    const processedLine = line => line.replace('▪', '').replace('  ', ' ');

    const processId = pageContent => {
        if (pageContent.length === 0) { return ''; }
        const startIndex = pageContent[0].indexOf('(') + 1;
        const endIndex = pageContent[0].indexOf(')');
        return pageContent[0].substring(startIndex, endIndex);
    };

    const processMultiLineBullet = pageContent => {
        if (pageContent.length === 0) { return ''; }
        const excludedChars = ['“', '"', '▪'];
        const firstChar = pageContent.length > 1 ? pageContent[1].replace(' ', '')[0] : '';
        const hasMultiLines = pageContent.length > 1 && !excludedChars.includes(firstChar);
        if (hasMultiLines) {
            this.removalCounter = 2;
            return processedLine(pageContent[0] + ' ' + pageContent[1]);
        }
        return pageContent[0].replace('▪', '');
    };

    const processSingleLineBullet = pageContent => {
        if (pageContent.length === 0) { return ''; }
        return pageContent[0].replace('▪', '');
    };

    const processMotto = pageContent => {
        if (pageContent.length === 0) { return ''; }
        return pageContent.join(' ');
    };

    const processPage = pageContent => {
        let props = {};
        this.removalCounter = 1;

        props.id = processId(pageContent);
        pageContent.splice(0, this.removalCounter);

        props.position = processMultiLineBullet(pageContent);
        pageContent.splice(0, this.removalCounter);
        this.removalCounter = 1;

        props.project = processSingleLineBullet(pageContent);
        pageContent.splice(0, this.removalCounter);

        props.employedTime = processMultiLineBullet(pageContent)
        pageContent.splice(0, this.removalCounter);
        this.removalCounter = 1;

        props.motto = processMotto(pageContent);

        return props;
    };

    let processedPages = [];
    const pages = text.split('\n\n');
    pages.splice(0, 2);
    pages.forEach((page, index) => {
        processedPages.push(processPage(page.split('\n')));
    });

    return processedPages;
};

const PdfToJsonParser = module.exports = {
    parseFile: async filename => {
        const dataBuffer = fs.readFileSync(filename);
        await pdf(dataBuffer).then(async data => {
            this.result = parseTextFromPdf(data.text);
        });
        return this.result;
    }
};