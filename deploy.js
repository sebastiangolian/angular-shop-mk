const { exec } = require("child_process");
var http = require('http');
var FtpDeploy = require("ftp-deploy");
var ftpDeploy = new FtpDeploy();

let environment = ""
let version = ""

var config = require('./deploy-config.json')

process.argv.forEach(val => {
    if (val.includes("environment")) environment = val.replace("environment=", "")
    if (val.includes("version")) version = val.replace("version=", "")
});

build()

function build() {
    console.info('------ build -------');
    var build = `ng build --c=${environment}`

    if (environment === "test") {
        build = `ng build --c=testing --progress --aot --optimization --build-optimizer --named-chunks=false --output-hashing=all --source-map=false --vendor-chunk=false`
    }
    if (environment === "prod") {
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
    var ftpConfig = {
        user: config.user,
        password: config.pass,
        host: config.host,
        port: 21,
        localRoot: __dirname + "/dist",
        remoteRoot: "/",
        include: ["*", "**/*"],
        deleteRemote: true,
        forcePasv: true
    };

    ftpDeploy
        .deploy(ftpConfig)
        .then(res => {
            console.info("finished:", res)
            deployHttp()
        })
        .catch(err => console.error(err));
}

function deployHttp() {
    http.request({
        host: 'deploy.sklep.martynaklewinowska.online',
        path: '/'
    }).end();
}