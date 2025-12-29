const connectDB = require("./db");
const seedTasks = require("./seed");

let ready;

function init() {
  if (!ready) {
    ready = (async () => {
      await connectDB(process.env.MONGO_URI);
      await seedTasks();
      console.log("MongoDB connected & seeded");
    })();
  }
  return ready;
}

module.exports = init;
