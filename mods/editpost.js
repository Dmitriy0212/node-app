import fs from 'fs';
export function editTitle(body) {
    try {
        const doc = {
            postTitle: body.postTitle,
            postPhotoUrl: body.postPhotoUrl,
            postDescription: body.postDescription,
            id: Number(body.id),
            tegs: body.postTegs,
            yearCreat: body.yearCreat,
            genre: body.genre
        };
        
        const text = JSON.parse(fs.readFileSync('./jsonfile/basejson.json', 'utf8'));
        text.titles.map((num, index) => {
            console.log(doc)
            console.log(num)
            if (num.id === doc.id) {
                if (doc.postTitle == undefined) {
                    doc.postTitle = text.titles[index].postTitle
                }
                if (doc.postPhotoUrl == undefined) {
                    doc.postPhotoUrl = text.titles[index].postPhotoUrl
                }
                if (doc.postDescription == undefined) {
                    doc.postDescription = text.titles[index].postDescription
                }
                if (doc.tegs == undefined) {
                    doc.tegs = text.titles[index].tegs
                }
                if (doc.yearCreat == undefined) {
                    doc.yearCreat = text.titles[index].yearCreat
                }
                if (doc.genre == undefined) {
                    doc.genre = text.titles[index].genre
                }
                if (doc.id == undefined) {
                    doc.id = text.titles[index].id
                }
                console.log(doc)
                text.titles.splice(index, 1, doc)
            }
        })
        fs.writeFileSync('./jsonfile/basejson.json', JSON.stringify(text));
        const posts = [];
        JSON.parse(fs.readFileSync('./jsonfile/basejson.json', 'utf8')).titles.map((num) => posts.push(num.postTitle));
        return posts;
    } catch (err) {
        console.log('Ошибка создания поста', err);
    }
}