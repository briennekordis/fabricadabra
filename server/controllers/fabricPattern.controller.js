const FabricPattern = require("../models/fabricPattern.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
    const fabricPattern = new FabricPattern({
        PatternDesc: req.body.PatternDesc
    });
    FabricPattern.create(fabricPattern, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "A problem occurred while creating the fabric pattern."
        });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    FabricPattern.getAll((err, data) => {
        if (err)
          res.status(500).send({
              message:
                  err.message || "A problem occured while retrieving your fabric patterns."
          });
        else res.send(data);
    });
  };
  
  exports.findById = (req, res) => {
    FabricPattern.getById(req.params.id, (err, data) => {
        if (err)
          res.status(500).send({
              message:
                  err.message || "A problem occured while retrieving fabric patterns."
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
      FabricPattern.updateById(
        req.params.id,
        new FabricPattern(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Fabric pattern with id ${req.params.id} was not found.`
              });
            } else {
              res.status(500).send({
                message: "Error updating fabric pattern with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
};

exports.delete = (req, res) => {
    FabricPattern.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Fabric pattern with id ${req.params.id} was not found.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete fabric pattern with id " + req.params.id
            });
          }
        } else res.send({ message: `Fabric pattern was deleted successfully!` });
      });
};