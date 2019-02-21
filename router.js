const Profile = require('./profile.js');
const renderer = require('./renderer.js')
const querystring = require('querystring');
const commonHeaders = { 'Content-Type': 'text/html' };
function home(request, response) {
  if (request.url === '/') {
      if(request.method.toLowerCase()==="get"){
    response.writeHead(200, commonHeaders);
    renderer.view("header",{},response);
    renderer.view("search",{},response);
    renderer.view("footer",{},response);
    response.end();}else{
        //if url =="/" && POST

        //get the post data from body
        //extract username
        //redirect
        request.on('data', function(postBody){
            let query = querystring.parse(postBody.toString());
            response.writeHead(303, {"Location" : "/"+query.username});
            response.end();
            
        })


    }
  }
}

function user(request, response) {
  const username = request.url.replace('/', '');
  if (username.length > 0) {
    response.writeHead(200,commonHeaders);
    renderer.view("header",{},response);
    
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
    renderer.view('profile',values,response);
    renderer.view('footer',{},response);
    response.end();
    });
    /**On error;
     * If a parsing, network or HTTP error occurs an
     * error object is passed in to the handler or callback
     **/
    studentProfile.on('error', e => {
    renderer.view('error',{errorMessage:e.message},response);
    renderer.view("search",{},response);
    renderer.view('footer',{},response);
    response.end();
    });
  }
}

module.exports.home = home;
module.exports.user = user;
