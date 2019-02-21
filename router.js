const Profile = require('./profile.js');

function home(request, response) {
  if (request.url === '/') {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Header \n');
    response.write('Search \n');
    response.end('Footer \n');
  }
}

function user(request, response) {
  const username = request.url.replace('/', '');
  if (username.length > 0) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Header \n');
    // get Json
    const studentProfile = new Profile(username);

    /**
     * On end:
     * When the JSON body is fully recieved the
     * the "end" event is triggered and the full body
     * is given to the handler or callback
     **/
    studentProfile.on('end', profileJSON => {
      //show profile

      //store what we need
      const values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      };
      //response;
      response.write(
        `${values.username} has ${values.badges} badges and ${
          values.javascriptPoints
        } javascript points \n`
      );
      response.end('Footer \n');
    });
    /**On error;
     * If a parsing, network or HTTP error occurs an
     * error object is passed in to the handler or callback
     **/
    studentProfile.on('error', e => {
      response.write(e.message + '\n');
      response.end('Footer \n');
    });
  }
}

module.exports.home = home;
module.exports.user = user;
