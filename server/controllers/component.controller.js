const Component = require("../models/Component.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
    const component = new Component({
        ComponentName: req.body.ComponentName
    });
    Component.create(component, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "A problem occurred while creating the project component."
        });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Component.getAll((err, data) => {
        if (err)
          res.status(500).send({
              message:
                  err.message || "A problem occured while retrieving your project components."
          });
        else res.send(data);
    });
  };
  
  exports.findById = (req, res) => {
    Component.getById(req.params.id, (err, data) => {
        if (err)
          res.status(500).send({
              message:
                  err.message || "A problem occured while retrieving project components."
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
      Component.updateById(
        req.params.id,
        new Component(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Project component with id ${req.params.id} was not found.`
              });
            } else {
              res.status(500).send({
                message: "Error updating project component with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
};

exports.delete = (req, res) => {
    Component.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Project component with id ${req.params.id} was not found.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete project component with id " + req.params.id
            });
          }
        } else res.send({ message: `Project component was deleted successfully!` });
      });
};