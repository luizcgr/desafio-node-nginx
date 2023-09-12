const moniker = require("moniker");
const mysql = require("mysql2/promise");
const express = require("express");
const app = express();

const pool = mysql.createPool({
  host: "mysql",
  user: "root",
  password: "123",
  database: "nodedb",
});

const startServer = async () => {
  await pool.query(
    `
    create table if not exists people (
      id int not null AUTO_INCREMENT,
      name varchar(255) NOT NULL,
      primary key (id)
    );
  `
  );
  console.log("Database up");

  app.get("/", async (req, res) => {
    const name = moniker.choose();
    await pool.execute(`insert into people (name) values (?)`, [name]);
    const [rows, fields] = await pool.execute(
      "select * from people order by id desc"
    );

    const names = rows.map((row) => `<li>${row.name}</li>`).join("");
    const table = `
      <ul>${names}</ul>
    `;

    res.status(200).send(`
      <h1>FullCycle Rocks!!</h1>
      ${table}
    `);
  });

  app.listen(3000, () => {
    console.log("Server up");
  });
};

startServer();
