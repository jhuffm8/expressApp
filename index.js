const express = require("express");
const app = express();
const port = 3100;
const fs = require("fs");

// app.get("/", (req, res) => {
//   res.send("Lets go");
// });

app.listen(port, () => {
  console.log(`Server running on port: ${port}`); // this function is listening for the server
});

// error handler
app.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

app.engine("alab", (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);

    // Here, we take the content of the template file,
    // convert it to a string, and replace sections of
    // it with the values being passed to the engine.
    const rendered = content
      .toString()
      .replaceAll("#title#", `${options.title}`)
      .replace("#content#", `${options.content}`)
      .replace('#link#', `${options.link}`)
      .replace('#name#', `${options.name}`)
    return callback(null, rendered);
  });
});

app.set("views", "./views"); // specify the views directory
app.set("view engine", "alab"); // register the template engine

app.get("/", (req, res) => {
  const options = {
    title: "Express AlAB",
    name: "Express",
    content:
      "What is your favorite color",

    link: "/unsubscribe",
  };

  res.render("index", options);
});




//unsubscribe view temp

  app.get("/unsubscribe", (req, res) => {

    res.render("unsub");
  });
  



