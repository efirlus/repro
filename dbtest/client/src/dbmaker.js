const mysql = require('mysql2/promise');
const { db_info } = require('./database');
const pool = mysql.createPool(db_info);

const DB = async(type, sql, params) => {
    try {
        let result = {};
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows] = await connection.query(sql, params);
            if (type == "GET") result.row = rows;
            result.state = true;
            connection.release();
            return result;
        } catch (err) {
            console.log('쿼리 에러');
            result.state = false;
            result.error = err;
            connection.release();
            return result;
        }
    } catch (err) {
        console.log('데이터베이스 에러');
        result.state = false;
        result.error = err;
        return result;
    }
}

module.exports = DB;


/*

{
    "row":
    [{
        "id":1,
        "path":"/nas/samba/fancam/ohmygirl.mkv",
        "addeddate":"2020-03-13T21:03:03.000Z",
        "isdeleted":0,
        "ismodified":null
    },{
        "id":2,"path":"/nas/samba/fancam/fromis9.mkv","addeddate":"2020-03-13T21:04:18.000Z","isdeleted":0,"ismodified":null
    }],
    "state":true
}
*/