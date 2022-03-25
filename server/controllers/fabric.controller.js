const Fabric = require("../models/fabric.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
    const fabric = new Fabric({
        FabricTypeId: req.body.FabricTypeId,
        Color: req.body.Color,
        PatternId: req.body.PatternId,
        Yardage: req.body.Yardage,
        Width: req.body.Width,
        FabricSourceId: req.body.FabricSourceId,
        ScrapStatus: req.body.ScrapStatus,
        ProjectId: req.body.ProjectId
    });
    Fabric.create(fabric, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "A problem occurred while creating the fabric."
        });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
  Fabric.getAll((err, data) => {
      if (err)
        res.status(500).send({
            message:
                err.message || "A problem occured while retrieving your stash."
        });
      else res.send(data);
  });
};

exports.findById = (req, res) => {
    Fabric.getById(req.params.id, (err, data) => {
        if (err)
          res.status(500).send({
              message:
                  err.message || "A problem occured while retrieving your stash."
          });
        else res.send(data);
    }); 
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      Fabric.updateById(
        req.params.id,
        new Fabric(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Fabric with id ${req.params.id} was not found.`
              });
            } else {
              res.status(500).send({
                message: "Error updating fabric with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
};

exports.delete = (req, res) => {
    Fabric.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Fabric with id ${req.params.id} was not found.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete fabric with id " + req.params.id
            });
          }
        } else res.send({ message: `Fabric was deleted successfully!` });
      });
};