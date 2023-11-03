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

app.get('/', (req, res) => {
    res.json(addData())
});

app.post('/add', (req, res) => {
    addTitle(req.body)
    res.json(addData())
});

app.get('/post', function (req, res) {
    let id = req.query.id;
    res.json(getOnePost(id))
});

app.post('/post/edit', (req, res) => {
    editTitle(req.body)
    res.redirect('/edit')
});

const PORT = process.env.PORT || 8080;
const HOST = 'localhost';

app.listen(PORT, () => {
    console.log(`Server run: http://${HOST}:${PORT}`)
})