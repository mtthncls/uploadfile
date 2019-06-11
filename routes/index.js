const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/', limits: { fileSize: 3000000 } });
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
            <form method="POST" enctype="multipart/form-data" action="monupload">
                <input type="file" name="monfichier" multiple accept="image/png">
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

app.post('/monupload', upload.array('monfichier', 3), function (req, res, next) {
    for (let i = 0; i < req.files.length; i++)
        fs.rename(req.files[i].path, 'public/images/' + req.files[i].originalname, function (err) {
            if (err) {
                res.send(`Problème durant le déplacement + ${err}`);
            } else {
                res.send('Fichier(s) uploadé(s) avec succès');
            }
        })

})
