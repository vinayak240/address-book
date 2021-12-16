const jsonServer = require("json-server");
const bodyParser = require("body-parser");
const cors = require("cors");
const { isAuthenticated, createResponse } = require("./utils");
const server = jsonServer.create();
const router = jsonServer.router("./data/addresses.json");

server.use(jsonServer.defaults());
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.post("/auth/login", (req, res) => {
  const { Username, Password } = req.body;
  if (isAuthenticated({ Username, Password }) === false) {
    const status = 401;
    const msg = "Incorrect Username or Password";
    res.status(status).json({ status, msg });
    return;
  }

  const response = createResponse(Username);
  res.status(200).json(response);
});

server.use("/api", router);

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`[PID: ${process.pid}] STARTED Address book service at ${PORT}`);
});
