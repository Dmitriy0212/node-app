import fs from 'fs';
export function addData() {
    try {
        const data = JSON.parse(fs.readFileSync('./jsonfile/basejson.json', 'utf8')).titles
        return data ;
    } catch (err) {
        console.log('Ошибка создания поста', err);
    }
}