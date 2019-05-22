var knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        database: 'test_db', 
        user: 'development',
        password: 'development'
    }
});

const query = process.argv.slice(2)[0];
console.log("QUERY", query)
knex.select('*').from('famous_people').where({first_name :  query}).asCallback((err, res) => {
	if (err) return console.log( err);
    console.log(
    	`Searching... 
    	Found ${res.length} person(s) by the name '${query}': `)
    for (i in res) {
    	
    	console.log(
    	`- ${Number(i) + 1} ${res[i].first_name} ${res[i].last_name}, born '${res[i].birthdate}'`)
    }
    knex.destroy();
})