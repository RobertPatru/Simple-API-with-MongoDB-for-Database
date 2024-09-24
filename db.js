const { MongoClient, ServerApiVersion } = require("mongodb");

const url =
	"mongodb+srv://robertpatru17:<your_password>@cluster0.kqadq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(url, {
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
