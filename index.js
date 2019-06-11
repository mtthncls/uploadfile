const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });
const fs = require('fs');

app.get('/', (request, response) => {
    response.send(`<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
        </head>
        
        <body>
            <form method="POST" enctype="multipart/form-data" action="uploaddufichier">
                <input type="file" name="monfichier" multiple>
                <button> envoyer </button>
            </form>
            <script src="index.js"></script>
        </body>
        
        </html>`);
});

app.listen(port, (err) => {
    if (err) {
        throw new Error('Something bad happened...');
    }

    console.log(`Server is listening on ${port}`);
});

app.post('/uploaddufichier', upload.single('monfichier', 3), function (req, res, next) {

    fs.rename(req.file.path, 'public/images/' + req.file.originalname, function (err) {
        console.log(`${req.file.path}`)
        if (err) {
            res.send(`problème durant le déplacement + ${err}`);
        } else {
            res.send(`Fichier uploadé avec succès ${req.file.path}`);
        }
    });
})
