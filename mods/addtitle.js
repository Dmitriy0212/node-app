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
            tegs: addTegs(body.postTegs),
            yearCreat: body.postyearCreat,
            genre: addGenre(body.genre)
        };
        function addTegs(postTegs) {
            try {
                if (postTegs == '') {
                    return []
                }
                if (postTegs !== '') {
                    if (postTegs.includes(' ')) {
                        return postTegs.split(' ')
                    }
                    let a = []
                    a.push(postTegs)
                    return a
                }
            } catch (err) {
                console.log('Ошибка создания поста', err);
            }
        }
        function addGenre(genre) {
            try {
                if (genre == '') {
                    return []
                }
                if (genre !== '') {
                    if (genre.includes(' ')) {
                        return genre.split(' ')
                    }
                    let a = []
                    a.push(genre)
                    return a
                }
            } catch (err) {
                console.log('Ошибка создания поста', err);
            }
        }
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