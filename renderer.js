
const fs = require('fs');

function view(templateName, values, response){
  
    //read from template file
    const fileContents = fs.readFileSync('./views/' + templateName + '.html');
    
    
    response.write(fileContents);
    
  //insert value in conent


  //write out response
}

module.exports.view = view;