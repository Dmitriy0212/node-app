import fs from 'fs';
import { rundomId } from './idgener.js';
export function addTitle(body) {
    try {
        const text = JSON.parse(fs.readFileSync('./jsonfile/basejson.json', 'utf8'));
        const doc = {
            postTitle: body.postTitle,
            postPhotoUrl: body.postPhotoUrl,
            postDescription: body.postDescription,
            id: rundomId(),
            tegs: body.postTegs,
            yearCreat: body.postyearCreat,
            genre: body.genre
        };
        function addTegs() {
            try {
                if (doc.tegs == '') {
                    return doc.tegs = []
                }
                if (doc.tegs !== '') {
                    return doc.tegs = doc.tegs.split(' ')
                }
            } catch (err) {
                console.log('Ошибка создания поста', err);
            }
        }
        addTegs()
        function addGenre() {
            try {
                if (doc.genre == '') {
                    return doc.genre = []
                }
                if (doc.genre !== '') {
                    return doc.genre = doc.genre.split(' ')
                }
            } catch (err) {
                console.log('Ошибка создания поста', err);
            }
        }
        addGenre()
        if (text.titles == undefined) {
            text.titles = []
        }
        text.titles.push(doc);
        fs.writeFileSync('./jsonfile/basejson.json', JSON.stringify(text));
        const posts = [];
        JSON.parse(fs.readFileSync('./jsonfile/basejson.json', 'utf8')).titles.map((num) => posts.push(num.postTitle));
        return posts;
    } catch (err) {
        console.log('Ошибка создания поста', err);
    }
}