const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_FILE = `${__dirname}/greeter.proto`;
const def = protoLoader.loadSync(PROTO_FILE);
const helloProto = grpc.loadPackageDefinition(def).helloworld;

const host = '0.0.0.0';
const port = 50051;

function sayHello(call, cb) {
    console.log(call.request);
    cb(null, { greeting: 'Hello ' + call.request.name });
}

function main() {
    const server = new grpc.Server();
    server.addService(
        helloProto.Greeter.service,
        { sayHello }
    );
    server.bind(
        `${host}:${port}`,
        grpc.ServerCredentials.createInsecure()
    );
    server.start();
    console.log(
        `Server was started at ${host}:${port}`
    )
}

main();
