class Element {
    constructor(name, buildYear) {
        this.name = name; 
        this.buildYear = buildYear;
    }

    calAge() {
        let age = new Date().getFullYear() - this.buildYear;
        return age;
    }
}

class Parks extends Element {
    constructor(name, buildYear, trees, area) {
        super(name, buildYear); 
        this.trees = trees; 
        this.area = area; 
    }

    calDensity () {
        let density = this.trees/this.area;
        return density; 
    }

}

class Street extends Element {
    constructor(name, buildYear, length, size = 3) {
        super(name, buildYear); 
        this.length = length;
        this.size = size;  
    }

    classify () {
            const streetSize = new Map(); 
            streetSize.set(1, 'tiny');
            streetSize.set(2, 'small');
            streetSize.set(3, 'normal');
            streetSize.set(4, 'big');
            streetSize.set(5, 'huge');
            console.log(`${this.name} is classified as ${streetSize.get(this.size)}`);
        }
}

let allParks = [new Parks('Woodlawn', 1983, 250, 1000), new Parks('Fernhill', 1965, 769, 2000), new Parks('Rose', 1932, 125, 1400)];

let allStreets = [new Street('Morgan', 1945, 500, 2), new Street('Alberta', 1955, 1000, 3), new Street('I5', 1960, 100000, 4), new Street('I205', 1976, 125000, 5)];

function calc (arr) {
    //reduces all elements in an array to a single value 
    const sum = arr.reduce((prev, cur, index) => prev + cur, 0); 

    return [sum, sum / arr.length];
}

function reportParks (p) {
    p.forEach(cur => console.log(`${cur.name} park has a tree denisty of ${cur.calDensity()}`)); 


    const ages = p.map(el => new Date().getFullYear() - el.buildYear);
    const [totalAge, avgAge] = calc(ages);
    console.log(`${p.length} parks have an averge age of ${avgAge}`);

    const i = p.map(el => el.trees).findIndex(el => el >= 700);
    console.log(`${p[i].name} hase more than 700 trees`);
}

function reportStreet(s) {
    console.log('-------STREETS REPORT');

    const [totalLength, avgLength] = calc(s.map(el => el.length));
    console.log(`${s.length} streets total length is ${totalLength},  and has an average length of ${avgLength}`);

    s.forEach(el => el.classify());
}

reportParks(allParks);
reportStreet(allStreets);