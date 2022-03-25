const Project = require("../models/project.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
    console.log(req.body);
    const project = new Project({
        ProjectId: req.body.ProjectId,
        ProjectName: req.body.ProjectName,
        StatusId: req.body.StatusId
    });
    Project.create(project, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "A problem occurred while creating the project."
        });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
  Project.getAll((err, data) => {
      if (err)
        res.status(500).send({
            message:
                err.message || "A problem occured while retrieving your projects."
        });
      else res.send(data);
  });
};

exports.findById = (req, res) => {
    Project.getById(req.params.id, (err, data) => {
        if (err)
          res.status(500).send({
              message:
                  err.message || "A problem occured while retrieving your projects."
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
      console.log(req.body);
      Project.updateById(
        req.params.id,
        new Project(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Project with id ${req.params.id} was not found.`
              });
            } else {
              res.status(500).send({
                message: "Error updating project with id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
};

exports.delete = (req, res) => {
    Project.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Project with id ${req.params.id} was not found.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete project with id " + req.params.id
            });
          }
        } else res.send({ message: `Project was deleted successfully!` });
      });
};