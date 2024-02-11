const getTodaysDate = () => {
    let today = new Date;
    console.log(today);
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    let yyyy = today.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
}

const getTime = () => {
    let today = new Date;
    let hh = today.getHours();
    let min = today.getMinutes();
    let ss = today.getSeconds();
    if (hh < 10) {
        hh = '0' + hh;
    }
    if (min < 10) {
        min = '0' + min;
    }
    if (ss < 10) {
        ss = '0' + ss;
    }
    return `${hh}:${min}:${ss}`;
}
const changeDateFormat = (date) => {
    let arr = date.split('-');
    let yyyy = arr[2];
    let mm = arr[1];
    let dd = arr[0];

    return `${yyyy}-${mm}-${dd}`;
}
exports.getTodaysDate = getTodaysDate;
exports.getTime = getTime;
exports.changeDateFormat = changeDateFormat;