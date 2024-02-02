import express from "express"
import path from "path"
import multer from "multer";

const router = express.Router()

const uploadDir = './public/img/';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage  });

router.post('/upload_One', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    const imagePath = '/api/smilebaby/public/img/' + req.file.filename;
    res.send(JSON.stringify({imagePath}));
});



export default router

