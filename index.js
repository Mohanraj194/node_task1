const express = require("express");
const fs = require("fs")
const app = express();

app.get("/", (req, res)=>{
    res.status(200).json({
        message : "root directory"
    })
  
});

var d = new Date();
var fileName = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + "_" +
d.getHours() + "-" + d.getMinutes()+ "-" + d.getSeconds()+'.txt';

var time_stamp = new Date().getTime();

app.post("/create-a-text-file", (req, res)=>{
 
    fs.writeFile('sample_folder/'+fileName, `Time stamp: ${time_stamp}`, function (err){
        if(err){
            console.log(err);
            res.end();
        }else{
            res.status(200).json({
                message : "Created text file - " + fileName +  " in the directory - sample_folder"
            });
        }
    })
  
});

app.get("/list-folder-content", (req, res)=>{
    let path = "sample_folder/"
    fs.readdir(path, (err, files)=>{
        if(err){
           console.log(err);
        }
        let htmlString = `<h3> list file and folder inside the root/sample_folder </h3><ul style='list-style:none'>`
        files.forEach((title)=>{
            if(fs.statSync(`${path}/${title}`).isFile()){
                htmlString += `<li> <img style='position: relative; top: 22px;width: 53px;margin: 6px;' src='https://cdn.iconscout.com/icon/free/png-256/google-docs-2038784-1721674.png' /> ${title}</li>`
            }else if(fs.statSync(`${path}/${title}`).isDirectory()){
                htmlString += `<li> <img style='position: relative; top: 22px; width: 53px;margin: 6px;' src='https://www.computerhope.com/jargon/f/folder.png' />${title}</li>`
            }           
         })
        htmlString += "</ul>";
        res.send(htmlString);
    })
});

let  PORT  = 3000;
app.listen(PORT, ()=>console.log(`Node file system API is running on port - ${PORT}`));
