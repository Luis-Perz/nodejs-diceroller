import http from 'http';
const port = process.env.PORT || 5501
let storage = []
const server = http.createServer((req, res) => {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET'
    }

    if (req.url === '/roll' && req.method === 'GET'){
        let number = '';
        let msg = '';
        if (storage.length !== 3){
            number = Math.floor(Math.random() * 6) + 1;
            console.log(number)
            storage.push(number);
        }
        if (storage.length === 3){
            msg = "You already rolled 3 times";
        }

        res.writeHead(200, headers);
        res.end(JSON.stringify({number, msg}));
    }
    else if (req.url === '/result' && req.method === 'GET'){
        let result = '';
        let total = storage.reduce((sum, num) => sum + num, 0);
        if (total === 11){
            result = "true";
        }
        else{
            result = "false";
        }
        res.writeHead(200, headers);
        res.end(JSON.stringify({result}));
    }
    else if (req.url === '/reset' && req.method === 'GET'){
        storage = [];
        res.writeHead(200, headers);
        res.end();
    }
    else{
        res.writeHead(404,{'Content-Type': 'text/plain'});
        res.end('Not Found')
    }
})
server.listen(port, function(error){
    if (error){
        console.log('Something went wrong', error)

    }
    else{
        console.log('Server is listening on port ' + port)
    }
})