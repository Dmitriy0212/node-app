
import https from"https";  // для организации https
import express from 'express';
import fs from 'fs';
import { addTitle } from './mods/addtitle.js';
import { editTitle } from './mods/editpost.js';
import { addData } from './mods/home.js';
import { getOnePost } from './mods/getonepost.js';
import multer from 'multer';
import cors from 'cors';
const app = express();


app.set('view engine', 'ejs');

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static('pabl'));

app.use(cors());
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        console.log(file)
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });
app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});


const PORT = process.env.PORT || 4444;
const HOST = 'localhost';


// прочитайте ключи
const key = fs.readFileSync("ca.key");
const cert = fs.readFileSync("ca.crt");

// создайте HTTPS-сервер
const server = https.createServer({ key, cert }, app);

// добавьте тестовый роут
app.get('/', (req, res) => {
    res.json(addData())
});

app.post('/add', (req, res) => {
    addTitle(req.body)
    res.json(addData())
});

app.get('/post', function (req, res) {
    let id = req.query.id;
    console.log(id)
    res.json(getOnePost(id))
});

app.post('/post/edit', (req, res) => {
    editTitle(req.body)
    res.redirect('/edit')
});

server.listen(PORT, () => {
    console.log(`Server run: https://${HOST}:${PORT}`)
});