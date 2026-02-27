import http from 'http';
const port = process.env.PORT || 5501
const storage = []
const server = http.createServer((req, res) => {
    if (req.url === '/roll' && req.method === 'GET'){

        let number = ``;
        let msg = '';
        let result = '';
        if (storage.length !== 3){
            number = Math.floor(Math.random() * 6) + 1;
            storage.push(number);
        }
        else if (storage.length === 3){
            msg = "You already rolled 3 times";
            let total = storage.reduce((sum, num) => sum + num, 0);
            if (total === 11){
                result = "true";
            }
            else{
                result = "false";
            }
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({number,msg, result}));
    }
    else if (req.url === '/reset' && req.method === 'GET'){
        storage = []
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