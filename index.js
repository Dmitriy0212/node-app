import express from 'express';
import fs from 'fs';
import { addTitle } from './mods/addtitle.js';
import { editTitle } from './mods/editpost.js';
import { addData } from './mods/home.js';
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

app.post('/post', (req, res) => {
    res.json(addTitle(req.body))
});

app.get('/edit', (req, res) => {
    res.render('edit')
});

app.post('/post/edit', (req, res) => {
    editTitle(req.body)
    res.redirect('/edit')

    /*editTitle(req.body)
    res.redirect('/edit')
    res.json(editTitle(req.body))*/
});

app.post('/sear', (req, res) => {
    console.log(req)
})

/*
app.get('/', (req, res) => {
    fs.readFile('./userniks/taitls.txt', 'utf8', function (err, data) {
        if (err) {
            console.log('Ошибка чтения названия тайтла');
        }
        fs.writeFile('./userniks/taitls.txt', '', function (err) {
            if (err) {
                console.log('Ошибка записи названия тайтла');
            }
        });
    });
    fs.readFile('./userniks/lengthtrue.txt', 'utf8', function (err) {

        let mas15 = []
        let a
        fs.readdirSync('./tatles').map(itam => {
            mas15.push(itam)
        })
        a = mas15.length
        if (err) {
            fs.writeFile('./userniks/lengthtrue.txt', String(a), function (err) {
                if (err) {
                    console.log('Ошибка создания базы');
                }
            });
        }
        fs.writeFile('./userniks/lengthtrue.txt', String(a), function (err) {
            if (err) {
                console.log('Ошибка создания базы');
            }
        });
        fs.writeFile('./userniks/lengtharr.txt', String(Math.round((a) / 2)), function (err) {
            if (err) {
                console.log('Ошибка создания базы');
            }
        });
    });

    const base = './tatles/';
    let path = '';
    let mas = []
    fs.readdirSync(base + path).map(itam => {
        mas.push(itam)
    })
    let resalt = fs.readFileSync('./userniks/length.txt', 'utf-8')
    let resalt1 = fs.readFileSync('./userniks/i_item.txt', 'utf-8')
    let resalt2 = fs.readFileSync('./userniks/lengthtrue.txt', 'utf-8')
    let resalt3 = fs.readFileSync('./userniks/lengtharr.txt', 'utf-8')
    let data1 = { files: mas, files1: Number(resalt), files2: Number(resalt1), files3: Number(resalt2), files4: Number(resalt3) }



    res.render('home', data1)
});

app.get('/home1', (req, res) => {
    res.render('home1')
});

app.get('/registration', (req, res) => {
    res.render('registration')
});

app.get('/registration1', (req, res) => {
    res.render('registration1')
});

app.get('/registration2', (req, res) => {
    res.render('registration2')
});

app.get('/registration3', (req, res) => {
    res.render('registration3')
});

app.get('/searchandoutput', (req, res) => {
    let resalt = fs.readFileSync('./userniks/secharr.txt', 'utf-8')
    let mas = resalt.split('/');
    let data = { test: mas }
    res.render('searchandoutput', data)
})

app.get('/output', (req, res) => {
    const base = './tatles/';
    let path = '';
    let mas = []
    fs.readdirSync(base + path).map(itam => {
        mas.push(itam)
    })
    let data1 = { files: mas }
    console.log(data1)
    res.render('output', data1)
})

app.post('/registr', (req, res) => {
    fs.readFile('./userniks/lengthtrue.txt', 'utf8', function (err) {
        const base = './tatles/';
        let path = '';
        let mas = []
        let a
        fs.readdirSync(base + path).map(itam => {
            mas.push(itam)
        })
        a = Math.round((mas.length) / 2)
        fs.readFile('./userniks/lengtharr.txt', 'utf8', function (err) {
            fs.writeFile('./userniks/lengtharr.txt', String(a), function (err) {
                if (err) {
                    console.log('Ошибка создания базы');
                }
            });
        })
    })
    let titlname = req.body.titlname;
    let titlsison = req.body.titlsison;
    let titlserial = req.body.titlserial;
    let titltextbox = req.body.titltextbox;
    if (titlname === "" || titlsison === "" || titlserial === "" || titltextbox === "") {
        return res.redirect('/registration2')
    }

    fs.readFile('./userniks/verification.txt', 'utf8', function (err, data) {
        console.log(data);
        if (data == '') {
            fs.writeFile('./userniks/verification.txt', titlname + '/', function (err, data) {
                if (err) {
                    console.log('Ошибка создания базы');
                }
                fs.mkdir('./tatles/' + titlname, () => {
                    fs.writeFile('./tatles' + '/' + titlname + '/' + titlname + '.txt', titlname, function (err) {
                        if (err) {
                            console.log('ошибка');
                        }
                    })
                    fs.writeFile('./tatles' + '/' + titlname + '/' + titlname + ' описание' + '.txt', titltextbox, function (err) {
                        if (err) {
                            console.log('ошибка');
                        }
                    })
                    fs.writeFile('./tatles' + '/' + titlname + '/' + titlname + ' ' + titlsison + ' сезон' + '.txt', titlsison, function (err) {
                        if (err) {
                            console.log('ошибка');
                        }
                    })
                    fs.writeFile('./tatles' + '/' + titlname + '/' + titlname + ' ' + titlserial + ' серия' + '.txt', titlserial, function (err) {
                        if (err) {
                            console.log('ошибка');
                        }
                    })

                    fs.mkdir('./tatles/' + titlname + '/' + titlname + ' ' + 'picture', () => { })
                })
                return res.redirect('/')
                console.log('1');
            })
        }
        else if (data !== '') {
            fs.readFile('./userniks/verification.txt', 'utf8', function (err, data) {
                if (err) {
                    console.log('Ошибка создания базы');
                }
                let mas = data.split('/');
                for (let i = 0; i < mas.length; i++) {
                    if (mas[i] == titlname) {
                        console.log('Такой тайтл уже добавлен!');
                        return res.redirect('/registration1');
                    }
                    else if (i == mas.length - 1) {
                        fs.readFile('./userniks/verification.txt', 'utf8', function (err, data) {
                            fs.writeFile('./userniks/verification.txt', data + titlname + '/', function (err, data) {
                                if (err) {
                                    console.log('Ошибка создания базы');
                                }
                                fs.mkdir('./tatles/' + titlname, () => {
                                    fs.writeFile('./tatles' + '/' + titlname + '/' + titlname + '.txt', titlname, function (err) {
                                        if (err) {
                                            console.log('ошибка');
                                        }
                                    })
                                    fs.writeFile('./tatles' + '/' + titlname + '/' + titlname + ' описание' + '.txt', titltextbox, function (err) {
                                        if (err) {
                                            console.log('ошибка');
                                        }
                                    })
                                    fs.writeFile('./tatles' + '/' + titlname + '/' + titlname + ' ' + titlsison + ' сезон' + '.txt', titlsison, function (err) {
                                        if (err) {
                                            console.log('ошибка');
                                        }
                                    })
                                    fs.writeFile('./tatles' + '/' + titlname + '/' + titlname + ' ' + titlserial + ' серия' + '.txt', titlserial, function (err) {
                                        if (err) {
                                            console.log('ошибка');
                                        }
                                    })

                                    fs.mkdir('./tatles/' + titlname + '/' + titlname + ' ' + 'picture', () => { })
                                })

                            })
                            return res.redirect('/')
                        })
                    }
                }
            })
        }
    })
})

app.post('/registr1', (req, res) => {
    fs.readFile('./userniks/lengthtrue.txt', 'utf8', function (err) {
        const base = './tatles/';
        let path = '';
        let mas = []
        let a
        fs.readdirSync(base + path).map(itam => {
            mas.push(itam)
        })
        a = Math.round((mas.length) / 2)
        fs.readFile('./userniks/lengtharr.txt', 'utf8', function (err) {
            fs.writeFile('./userniks/lengtharr.txt', String(a), function (err) {
                if (err) {
                    console.log('Ошибка создания базы');
                }
            });
        })
    })
    let titlname = req.body.titlname;
    let titlsison = req.body.titlsison;
    let titlserial = req.body.titlserial;
    let titltextbox = req.body.titltextbox;
    if (titlname === "" || titlsison === "" || titlserial === "" || titltextbox === "") {
        return res.redirect('/registration2')
    }
    fs.readFile('./userniks/verification.txt', 'utf8', function (err, data) {
        if (err) {
            console.log('Ошибка создания базы');
        }
        else {
            let mas = data.split('/');
            for (let i = 0; i < mas.length; i++) {
                if (mas[i] == titlname) {
                    console.log('Такой тайтл уже добавлен!');
                    return res.redirect('/registration1');
                }
                else if (i == mas.length - 1) {
                    fs.readFile('./userniks/verification.txt', 'utf8', function (err, data) {
                        fs.readFile('./userniks/verification.txt', 'utf8', function (err, data) {
                            fs.writeFile('./userniks/verification.txt', data + titlname + '/', function (err, data) {
                                if (err) {
                                    console.log('Ошибка создания базы');
                                }
                                fs.mkdir('./tatles/' + titlname, () => {
                                    fs.writeFile('./tatles' + '/' + titlname + '/' + titlname + '.txt', titlname, function (err) {
                                        if (err) {
                                            console.log('ошибка');
                                        }
                                    })
                                    fs.writeFile('./tatles' + '/' + titlname + '/' + titlname + ' описание' + '.txt', titltextbox, function (err) {
                                        if (err) {
                                            console.log('ошибка');
                                        }
                                    })
                                    fs.writeFile('./tatles' + '/' + titlname + '/' + titlname + ' ' + titlsison + ' сезон' + '.txt', titlsison, function (err) {
                                        if (err) {
                                            console.log('ошибка');
                                        }
                                    })
                                    fs.writeFile('./tatles' + '/' + titlname + '/' + titlname + ' ' + titlserial + ' серия' + '.txt', titlserial, function (err) {
                                        if (err) {
                                            console.log('ошибка');
                                        }
                                    })

                                    fs.mkdir('./tatles/' + titlname + '/' + titlname + ' ' + 'picture', () => { })
                                })

                            })
                            return res.redirect('/')
                        })
                    })
                }
            }
        }
    })
})
app.post('/search', (req, res) => {
    let tatlname = req.body.tatlname;
    let mas1 = [];
    const base = './tatles/';
    let path = '';
    let mas = [];
    fs.readdirSync(base + path).map(itam => {
        mas.push(itam)
        if ((itam.toLowerCase()).includes(tatlname.toLowerCase()) == true) {
            console.log(itam + '1')
        }
    })
    fs.readFile('./userniks/secharr.txt', 'utf8', function (err, dat) {
        if (tatlname == "") {
            console.log('Пустая сторока поиска');
            return res.redirect('/')
        }
        else if (mas.length == 0) {
            return res.redirect('/home1')
        }
        else if (mas.length > 0) {
            for (let i = 0; i < mas.length; i++) {
                if ((i + 1) == mas.length) {
                    console.log('6')
                    if (mas1.length == 0) {
                        console.log('Тайтла нет в базе');
                        return res.redirect('/home1')
                    }
                    else if (mas1.length > 0) {
                        fs.readFile('./userniks/secharr.txt', 'utf8', function (err, data4) {
                            data4 = ''
                            for (let j = 0; j < mas1.length; j++) {
                                console.log(data4);
                                fs.writeFile('./userniks/secharr.txt', data4 = data4 + String(mas1[j]) + '/', function (err) {
                                    if (err) {
                                        console.log('Ошибка создания базы');
                                    }
                                    console.log(data4);
                                });
                            }
                            return res.redirect('/searchandoutput')
                        })
                    }
                }
                else if ((mas[i].toLowerCase()).includes(tatlname.toLowerCase()) == true) {
                    console.log('5')
                    console.log(i)
                    console.log(mas.length)
                    mas1.push(mas[i]);
                    console.log(mas1)
                }

            }
        }
    })

})

app.post('/searchoutput', (req, res) => {
    res.redirect('/users')
})

app.get('/users', (req, res) => {

    console.log('16')
    let mas = []
    let mas1 = []
    let data1
    const base = './tatles/';
    let path = '';
    function isFolder(path) {
        return fs.lstatSync(path).isDirectory() && fs.existsSync(path);
    }
    fs.readFile('./userniks/taitls.txt', 'utf8', function (err, data) {
        if (err) {
            console.log('Ошибка чтения названия тайтла');
        }
        path = data
        fs.readdirSync(base + path).map(itam => {
            mas.push(itam)
        })



        if (isFolder(base + path)) {
            let files = fs.readdirSync(base + path).map(itam2 => {
                const isDir = fs.lstatSync(base + path + '/' + itam2).isDirectory();
                if (!isDir) {
                    let resalt = fs.readFileSync(base + data + '/' + itam2, 'utf-8')
                    mas1.push(resalt)
                }

            })
            console.log(mas1)
            data1 = { path1: mas1, files4: mas13 }
            return mas1, res.render('users', data1);
        }


    });


})
app.post('/beck', (req, res) => {
    fs.readFile('./userniks/length.txt', 'utf8', function (err, data) {
        if (Number(data) == 2) {
            res.redirect('/')
        }
        else if (Number(data) > 2) {
            fs.readFile('./userniks/length.txt', 'utf8', function (err, data) {
                fs.readFile('./userniks/i_item.txt', 'utf8', function (err, data1) {
                    if ((data - data1) == 1) {
                        fs.writeFile('./userniks/length.txt', String(data = Number(data) - 1), function (err) {
                            if (err) {
                                console.log('Ошибка создания базы');
                            }
                        });
                        fs.writeFile('./userniks/i_item.txt', String(data = Number(data1) - 2), function (err) {
                            if (err) {
                                console.log('Ошибка создания базы');
                            }
                        });
                        res.redirect('/')
                    }
                    else {
                        fs.readFile('./userniks/i_item.txt', 'utf8', function (err, data1) {
                            fs.writeFile('./userniks/i_item.txt', String(data = Number(data1) - 2), function (err) {
                                if (err) {
                                    console.log('Ошибка создания базы');
                                }
                            });
                        })
                        fs.writeFile('./userniks/length.txt', String(data = Number(data) - 2), function (err) {
                            if (err) {
                                console.log('Ошибка создания базы');
                            }
                        });
                        res.redirect('/')
                    }
                })
            })
        }
    });

});
app.post('/gou', (req, res) => {
    const base = './tatles/';
    let path = '';
    let mas = []
    let a
    let b
    fs.readdirSync(base + path).map(itam => {
        mas.push(itam)
    })
    console.log(mas.length)
    a = mas.length
    fs.readFile('./userniks/length.txt', 'utf8', function (err, data) {
        if (Number(data) == a) {
            res.redirect('/')
        }
        else if (Number(data) < a) {
            if ((a - data) == 1) {
                fs.readFile('./userniks/i_item.txt', 'utf8', function (err, data3) {
                    fs.writeFile('./userniks/i_item.txt', String(data3 = Number(data3) + 2), function (err) {
                        if (err) {
                            console.log('Ошибка создания базы');
                        }
                    });
                })
                fs.readFile('./userniks/length.txt', 'utf8', function (err, data4) {
                    fs.writeFile('./userniks/length.txt', String(data4 = Number(data4) + 1), function (err) {
                        if (err) {
                            console.log('Ошибка создания базы');
                        }
                    });
                })

                res.redirect('/')

            }
            else {
                fs.readFile('./userniks/i_item.txt', 'utf8', function (err, data1) {
                    fs.writeFile('./userniks/i_item.txt', String(data = Number(data1) + 2), function (err) {
                        if (err) {
                            console.log('Ошибка создания базы');
                        }
                    });
                })
                fs.writeFile('./userniks/length.txt', String(data = Number(data) + 2), function (err) {
                    if (err) {
                        console.log('Ошибка создания базы');
                    }
                });
                res.redirect('/')
            }

        }
    });
});

app.post('/arai', (req, res) => {
    let peig = req.body.peig;
    fs.readFile('./userniks/lengtharr.txt', 'utf8', function (err, data) {
        if (Number(peig) == 1) {
            fs.readFile('./userniks/i_item.txt', 'utf8', function (err, data3) {
                fs.writeFile('./userniks/i_item.txt', String(data3 = 0), function (err) {
                    if (err) {
                        console.log('Ошибка создания базы');
                    }
                });
            })
            fs.readFile('./userniks/length.txt', 'utf8', function (err, data4) {
                fs.writeFile('./userniks/length.txt', String(data4 = 2), function (err) {
                    if (err) {
                        console.log('Ошибка создания базы');
                    }
                });
            })
            res.redirect('/')
        }
        else if (Number(peig) == Number(data)) {
            fs.readFile('./userniks/lengthtrue.txt', 'utf8', function (err, data1) {
                if ((Number(data1) % 2) == 0) {
                    fs.readFile('./userniks/length.txt', 'utf8', function (err, data4) {
                        fs.writeFile('./userniks/length.txt', String(data4 = data1), function (err) {
                            if (err) {
                                console.log('Ошибка создания базы');
                            }
                            fs.readFile('./userniks/i_item.txt', 'utf8', function (err, data3) {
                                fs.writeFile('./userniks/i_item.txt', String(data3 = (Number(data1) - 2)), function (err) {
                                    if (err) {
                                        console.log('Ошибка создания базы');
                                    }
                                });
                            })
                        });
                    })
                    console.log('парные страницы');
                    res.redirect('/')
                }
                if ((Number(data1) % 2) !== 0) {
                    fs.readFile('./userniks/length.txt', 'utf8', function (err, data4) {
                        fs.writeFile('./userniks/length.txt', String(data4 = data1), function (err) {
                            if (err) {
                                console.log('Ошибка создания базы');
                            }
                            fs.readFile('./userniks/i_item.txt', 'utf8', function (err, data3) {
                                fs.writeFile('./userniks/i_item.txt', String(data3 = (Number(data1) - 1)), function (err) {
                                    if (err) {
                                        console.log('Ошибка создания базы');
                                    }
                                });
                            })
                        });
                    })
                    console.log('не парные страницы');
                    res.redirect('/')
                }
            })

        }
        else {
            fs.readFile('./userniks/length.txt', 'utf8', function (err, data4) {
                fs.writeFile('./userniks/length.txt', String(data4 = Number(peig) * 2), function (err) {
                    if (err) {
                        console.log('Ошибка создания базы');
                    }
                    fs.readFile('./userniks/i_item.txt', 'utf8', function (err, data3) {
                        fs.writeFile('./userniks/i_item.txt', String(data3 = (Number(data4) - 2)), function (err) {
                            if (err) {
                                console.log('Ошибка создания базы');
                            }
                        });
                    })
                });
            })
            res.redirect('/')
        }
    })
});
*/
const PORT = process.env.PORT || 3000;
const HOST = 'localhost';

app.listen(PORT, () => {
    console.log(`Server run: http://${HOST}:${PORT}`)
})