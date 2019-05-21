const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

// client.query('SELECT * FROM famous_people', (err, res) => {
//     console.log(err, res.rows)
// })
client.connect();

const query = process.argv.slice(2)[0]

client.query("SELECT * FROM famous_people WHERE first_name=$1 OR last_name=$1", [query], (err, res) => {
    if (err) {
        console.log("ERR:", err)
        return false
    }
    console.log(res.rows)
    client.end()
})


