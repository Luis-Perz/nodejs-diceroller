import http from 'http';
const port = process.env.PORT || 8080

const server = http.createServer((req, res) => {
    if (req.url === '/roll' && req.method === 'GET'){
        let numStorage = []
        for(let i = 0; i < 3; i++){
            numStorage.push(Math.floor(Math.random() * 6) + 1);
        }
        let total = numStorage.reduce((sum, num) => sum + num, 0)
        let win = total === 11;

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({numStorage, total, win}));
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