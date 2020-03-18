const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const DB = require('./client/src/dbmaker');
const recursive = require('./client/node_modules/recursive-readdir');
const { promisify } = require('util');
const Recursive_scanP = promisify(recursive);

function recursive_scan_and_insert(path_dir) {
    return Recursive_scanP(path_dir).then(files => {
        return Promise.all(files.map(elements => {
            let params = [elements];
            return DB("GET", "INSERT INTO filelist_t VALUES (NULL, ?, NOW(), 0, 0)", params).then(function(res) {
                console.log("data input");
            });
        }));
    });
};

app.post('/db', async (req, res) => {
    try {
        let object_path = 'e:/jav';
        await recursive_scan_and_insert(object_path);
        await DB("GET", "INSERT INTO filelist (id, path, addeddate, isdeleted, ismodified) SELECT NULL, filelist_t.path, filelist_t.addeddate, filelist_t.isdeleted, filelist_t.ismodified FROM filelist_t LEFT JOIN filelist ON filelist.path = filelist_t.path WHERE filelist.id IS NULL").then(function(res) {
            console.log('data moved');
        });
        await DB("GET", "DELETE FROM filelist_t").then(function(res) {
            console.log('tempdata deleted')
        });
        res.send(res);
    } catch(e) {
        console.log(e);
        res.status(500).send('Server Error');
    }
});

app.get('/db', (req, res) => {
    DB("GET", "SELECT * FROM filelist").then(function(res2) {
        res.send(res2.row);
    }).catch(err => {
        console.log(err);
        res.status(500).send("server error");
    });
});

app.listen(port, () => console.log('${port}번 포트 열림'));
