function getMonthSerialNumber(monthName) {
    let monthSerialNumber;
    switch (monthName.toLowerCase()) {
        case "jan":
            monthSerialNumber = '01';
            break;
        case "feb":
            monthSerialNumber = '02';
            break;
        case "mar":
            monthSerialNumber = '03';
            break;
        case "apr":
            monthSerialNumber = '04';
            break;
        case "may":
            monthSerialNumber = '05';
            break;
        case "jun":
            monthSerialNumber = '06';
            break;
        case "jul":
            monthSerialNumber = '07';
            break;
        case "aug":
            monthSerialNumber = '08';
            break;
        case "sep":
            monthSerialNumber = '09';
            break;
        case "oct":
            monthSerialNumber = '10';
            break;
        case "nov":
            monthSerialNumber = '11';
            break;
        case "dec":
            monthSerialNumber = '12';
            break;
        default:
            monthSerialNumber = -1; // If an invalid month name is provided
            break;
    }
    return monthSerialNumber;
}

export default function DateFormatterChange(DATE) {
    if (DATE?.[0]) {

        const startDate = DATE[0]._d
        const endDate = DATE[1]._d

        const toStringStartDate =` ${startDate.trim()}`;
        const toStringEndDate = `${endDate}`;

        const splitedStartDate = toStringStartDate.split(' ')
        const splitedEndDate = toStringEndDate.split(' ')

        const startMM = splitedStartDate[2]
        const startDD = splitedStartDate[3].length === 3 ? splitedStartDate[3] : `0${splitedStartDate[3]}`
        const startYYYY = splitedStartDate[4]

        const endMM = splitedEndDate[1]
        const endDD = splitedEndDate[2].length === 2 ? splitedEndDate[2] : `0${splitedEndDate[2]}`
        const endYYYY = splitedEndDate[3]

        const convertedStartMonth = getMonthSerialNumber(startMM.toLowerCase());
        const convertedEndMonth = getMonthSerialNumber(endMM.toLowerCase());

        console.log(splitedStartDate);

        return [`${startYYYY}-${convertedStartMonth}-${startDD}`,`${endYYYY}-${convertedEndMonth}-${endDD}`]
    }
}