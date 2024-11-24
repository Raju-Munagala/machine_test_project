// const multer = require('multer');
// const path = require('path');

import { upload } from "../app.js";

// Configure Multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });


// Just adds image URL saved in local to the 
const uploadSingleImage = (req, res, next) => {
  const uploadHandler = upload.single('image');

  uploadHandler(req, res, (err) => {
    if (err) {
        return res.status(400).json({message : "Something went worng"})
    }
    else{
        req.f_image = req.file?.filename ?  `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : '';
    }
    return res.status(201).json({fileURL : `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`})
  });
};

export {uploadSingleImage}
