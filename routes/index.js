const router = require("express").Router();
const apiRoutes = require("./api");

//Api routes
router.use("/api", apiRoutes);

//Default route
router.use((req, res) => res.send("Wrong route!"));

module.exports = router;
