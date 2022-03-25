const FabricType = require("../models/fabricType.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
    const fabricType = new FabricType({
        FabricType: req.body.FabricType
    });
    FabricType.create(fabricType, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "A problem occurred while creating the fabric type."
        });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    FabricType.getAll((err, data) => {
        if (err)
          res.status(500).send({
              message:
                  err.message || "A problem occured while retrieving your fabric types."
          });
        else res.send(data);
    });
  };
  
  exports.findById = (req, res) => {
    FabricType.getById(req.params.id, (err, data) => {
        if (err)
          res.status(500).send({
              message:
                  err.message || "A problem occured while retrieving fabric types."
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
      FabricType.updateById(
        req.params.id,
        new FabricType(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Fabric type with id ${req.params.id} was not found.`
              });
            } else {
              res.status(500).send({
                message: "Error updating fabric type with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
};

exports.delete = (req, res) => {
    FabricType.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Fabric type with id ${req.params.id} was not found.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete fabric type with id " + req.params.id
            });
          }
        } else res.send({ message: `Fabric type was deleted successfully!` });
      });
};