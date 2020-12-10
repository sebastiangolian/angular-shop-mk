const { exec } = require("child_process");
const ftp = require("basic-ftp")
require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();

let environment = ""
let version = ""
let package = ""
const NAME = "angular-shop-mk"
const PASS = "123456"
const DIR = "c:/ftp/angular-shop-mk"
const FTP_HOST = "s55.hekko.pl"
const FTP_USER = "seba@sklep.martynaklewinowska.online"
const FTP_PASS = "Jakiestamhaslo2@"

//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
process.argv.forEach(val => {
    if(val.includes("environment")) environment = val.replace("environment=","")
    if(val.includes("version")) version = val.replace("version=","")
    if(environment && version) {
        package = `${NAME}_v_${version}_${environment}`
    }
});

build()
//upload()

function build() {
    console.info('------ build -------');
    var build = `ng build --c=${environment}`

    if(environment == "test") {
        build = `ng build --c=testing --progress --aot --optimization --build-optimizer --named-chunks=false --output-hashing=all --source-map=false --vendor-chunk=false`
    }
    if(environment == "prod") {
        build = `ng build --prod`
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
        upload()
    });
 }

async function upload() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: FTP_HOST,
            user: FTP_USER,
            password: FTP_PASS,
            secure: true
        })

        console.log(await client.list())
        await client.uploadFromDir("dist")
    }
    catch(err) {
        console.log(err)
    }
    client.close()
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