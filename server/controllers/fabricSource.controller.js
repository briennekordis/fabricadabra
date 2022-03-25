const FabricSource = require("../models/fabricSource.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
    const fabricSource = new FabricSource({
        SourceName: req.body.SourceName
    });
    FabricSource.create(fabricSource, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "A problem occurred while creating the fabric source."
        });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    FabricSource.getAll((err, data) => {
        if (err)
          res.status(500).send({
              message:
                  err.message || "A problem occured while retrieving your fabric sources."
          });
        else res.send(data);
    });
  };
  
  exports.findById = (req, res) => {
    FabricSource.getById(req.params.id, (err, data) => {
        if (err)
          res.status(500).send({
              message:
                  err.message || "A problem occured while retrieving fabric sources."
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
      FabricSource.updateById(
        req.params.id,
        new FabricSource(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Fabric source with id ${req.params.id} was not found.`
              });
            } else {
              res.status(500).send({
                message: "Error updating fabric source with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
};

exports.delete = (req, res) => {
    FabricSource.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Fabric source with id ${req.params.id} was not found.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete fabric source with id " + req.params.id
            });
          }
        } else res.send({ message: `Fabric source was deleted successfully!` });
      });
};