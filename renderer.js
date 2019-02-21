
const fs = require('fs');


function mergeValues(values,content){
  //cycle over the keys
  for(var key in values){
    
    content= content.replace("{{" +key+"}}", values[key]);
  }
    //replace all {{key}} with values from values object
  return content;
    //returned merged content
}

function view(templateName, values, response){
  
    //read from template file
    let fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"});
    
    fileContents = mergeValues(values,fileContents);
    response.write(fileContents);
    
  //insert value in conent


  //write out response
}

module.exports.view = view;