const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_FILE = `${__dirname}/greeter.proto`;
const def = protoLoader.loadSync(PROTO_FILE);
const helloProto = grpc.loadPackageDefinition(def).helloworld;

function main() {
    const client = new helloProto.Greeter(
        'localhost:50051',
        grpc.credentials.createInsecure()
    );
    client.sayHello({ name: 'Piotr' }, (err, response) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Greeting:', response);
    });
}

main();
