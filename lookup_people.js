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
    
    for (i in res.rows) {
    	let j = 0;
    	j++
    	console.log(
    		`Searching... 
    	Found ${res.rows.length} person(s) by the name '${query}': 
    	- ${j} ${res.rows[i].first_name} ${res.rows[i].last_name}, born '${res.rows[i].birthdate}'`)
    }
    client.end()
})


