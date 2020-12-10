const { exec } = require("child_process");

let environment = ""
let version = ""
let package = ""
const NAME = "angular-shop-mk"
const PASS = "123456"
const DIR = "c:/ftp/angular-shop-mk"

process.argv.forEach(val => {
    if(val.includes("environment")) environment = val.replace("environment=","")
    if(val.includes("version")) version = val.replace("version=","")
    if(environment && version) {
        package = `${NAME}_v_${version}_${environment}`
        build()
    }
});


function build() {
    console.info('------ build -------');
    var build = `ng build --c=${environment} --outputPath=${package}`

    if(environment == "test") {
        build = `ng build --c=testing --aot --optimization --build-optimizer --named-chunks=false --output-hashing=all --source-map=false --vendor-chunk=false --outputPath=${package}`
    }
    if(environment == "prod") {
        build = `ng build --prod --outputPath=${package}`
    }

    exec(build, (error, stdout, stderr) => {
        if (error) {
            console.error(`${error.message}`);
            return;
        }
        if (stderr) {
            console.error(` ${stderr}`);
        }
        console.info(`${stdout}`);
        compressing()
    });
 }

 function compressing() {
    console.info('------ compressing -------');
    exec(`7z a ${package}.7z ${package} -p${PASS} -mhe=on`, (error, stdout, stderr) => {
        if (error) {
            console.error(`${error.message}`);
            return;
        }
        if (stderr) {
            console.info(`${stderr}`);
        }
        console.info(`${stdout}`);
        rmdir()
    });
 }

 function rmdir() {
    console.info('------ rmdir -------');
    exec(`rmdir /q /s ${package}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`${error.message}`);
            return;
        }
        if (stderr) {
            console.info(`${stderr}`);
        }
        console.info(`${stdout}`);
        move()
    });
 }

 function move() {
    console.info('------ move -------');
    exec(`move /Y ${package}.7z ${DIR}/${package}.7z`, (error, stdout, stderr) => {
        if (error) {
            console.error(`${error.message}`);
            return;
        }
        if (stderr) {
            console.info(`${stderr}`);
        }
        console.info(`${stdout}`);
    });
 }