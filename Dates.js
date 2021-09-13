moment=require("moment");


class ConvertionDate {

    constructor(d) {
        this.date = new Date(d);
    }
    
    isoDate() {
        console.log(this.date.toISOString());
        return this.date.toISOString();
    }

    shortDate() {
        console.log(this.date.toLocaleDateString());
        return this.date;
    }

    longDate() {
        console.log(this.date.toDateString());
        return this.date.toDateString();
    }

    //lesson 4
    momentDate() {
        return moment().format();
    }
   
}

exports.ConvertionDate=ConvertionDate;