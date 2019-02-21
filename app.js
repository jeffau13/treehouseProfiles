/* TODO:
1) Create web server
2) Handle HTTP GET / and POST eg Home
    if url === '/' && GET
        show search
    if url == '/' && POST
        redirect to /:username    
3) Handle HTTP route Get /: username eg: /jeffau
    if url == "/..."
        get json from treehouse
            on 'end'
                show profile
            on 'error'
                show error
4) Function that handles the reading of files and merge in value
    read from file, get a string
        merge values into string

*/

//1)

const http = require('http');
http
  .createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    setInterval(function() {
      response.write(new Date() + '\n');
    }, 1000);

    // response.end('Hello World \n');
  })
  .listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.1:1337');
