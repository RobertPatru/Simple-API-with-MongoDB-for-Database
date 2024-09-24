const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
	"";

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function connect() {
	try {
		await client.connect();
		console.log("Conectat la MongoDB!");
		return client.db("numele_bazei_de_date");
	} catch (error) {
		console.error("Eroare la conectarea cu MongoDB", error);
	}
}

module.exports = { connect };
