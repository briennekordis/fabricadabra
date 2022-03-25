module.exports = app => {
    const fabrics = require("../controllers/fabric.controller.js");
    const fabricPatterns = require("../controllers/fabricPattern.controller.js");
    const fabricSources = require("../controllers/fabricSource.controller.js");
    const fabricTypes = require("../controllers/fabricType.controller.js");

    const projects = require("../controllers/project.controller.js");
    const components = require("../controllers/component.controller.js");

    const router = require("express").Router();

    app.use('/api', router);

    // Fabric Routes
    router.get("/fabrics/", fabrics.findAll);
    router.get("/fabrics/:id", fabrics.findById);
    router.post("/fabrics/", fabrics.create);
    router.put("/fabrics/:id", fabrics.update);
    router.delete("/fabrics/:id", fabrics.delete);

    // FabricPattern Routes
    router.get("/fabricPatterns/", fabricPatterns.findAll);
    router.get("/fabricPatterns/:id", fabricPatterns.findById);
    router.post("/fabricPatterns/", fabricPatterns.create);
    router.put("/fabricPatterns/:id", fabricPatterns.update);
    router.delete("/fabricPatterns/:id", fabricPatterns.delete);

    // FabricSource Routes
    router.get("/fabricSources/", fabricSources.findAll);
    router.get("/fabricSources/:id", fabricSources.findById);
    router.post("/fabricSources/", fabricSources.create);
    router.put("/fabricSources/:id", fabricSources.update);
    router.delete("/fabricSources/:id", fabricSources.delete);

    // FabricType Routes
    router.get("/fabricTypes/", fabricTypes.findAll);
    router.get("/fabricTypes/:id", fabricTypes.findById);
    router.post("/fabricTypes/", fabricTypes.create);
    router.put("/fabricTypes/:id", fabricTypes.update);
    router.delete("/fabricTypes/:id", fabricTypes.delete);  

    // Project Routes
    router.get("/projects/", projects.findAll);
    router.get("/projects/:id", projects.findById);
    router.post("/projects/", projects.create);
    router.put("/projects/:id", projects.update);
    router.delete("/projects/:id", projects.delete);

    // Component Routes
    router.get("/components/", components.findAll);
    router.get("/components/:id", components.findById);
    router.post("/components/", components.create);
    router.put("/components/:id", components.update);
    router.delete("/components/:id", components.delete);

};