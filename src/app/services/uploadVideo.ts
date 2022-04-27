import multer from "multer";
import path from "path";
import { Request, Response } from "express";
 const storage = multer.diskStorage({
     destination: function (req:Request, file:any, callback:any){
         callback(null, './uploads');
     }, 
     filename: function(req:Request, file:any, callback:any){
         console.log(file); 
         callback(null, file.originalname)
     }
 }); 

const upload = multer({storage: storage}).array('uploads'); 
  
function videoupload(req:Request, res:Response) {
     upload(req, res, function(err) {
         if(err) {
             console.log('Error Occured'); 
             return; 
         }
         console.log(req.file);
         res.end('Your file Uploaded'); 
         console.log('Video Uploaded'); 
     })
}
 
