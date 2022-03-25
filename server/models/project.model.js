const sql = require("./db.js");

const Project = function(project) {
    this.ProjectId = project.ProjectId;
    this.ProjectName = project.ProjectName;
    this.StatusId = project.StatusId;
};

Project.create = (newProject, result) => {
    sql.query("INSERT INTO Projects SET ?", newProject, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      console.log("Created project: ", { id: res.insertId, ...newProject });
      result(null, { id: res.insertId, ...newProject });
    });
  };

Project.getAll = (result) => {
    let query =
        "SELECT * " +
            "CASE WHEN StatusId = 1 THEN 'Planned' " +
                "WHEN StatusId = 2 THEN 'In progress' " +
                "WHEN StatusId = 3 THEN 'Completed' " +
                "ELSE 'Unknown' " +
            "END 'ProjectStatus' " +
        "FROM Projects;"
    sql.query(query, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log("Projects: ", res);
        result(null, res);
    });
};

Project.getById = (id, result) => {
    let query =
        "SELECT * " +
            "CASE WHEN StatusId = 1 THEN 'Planned' " +
                "WHEN StatusId = 2 THEN 'In progress' " +
                "WHEN StatusId = 3 THEN 'Completed' " +
                "ELSE 'Unknown' " +
            "END 'ProjectStatus' " +
        "FROM Projects "
    query += `WHERE ProjectId = ${id};`

    sql.query(query, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log("Projects: ", res);
        result(null, res);
    });
};

Project.updateById = (id, Project, result) => {
    sql.query(
        "UPDATE Projects " +
        "SET ProjectName = ?, " +
            "StatusId = ? " +
        "WHERE ProjectId = ? ",
        [Project.ProjectName,
         Project.StatusId,
         id],
        (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found"}, null);
                return;
            }
            console.log("Updated Project: ", {id: id, ...Project });
            result(null, { id: id, ...Project });
        }
    );
};

Project.remove = (id, result) => {
    sql.query(
        "DELETE FROM Projects WHERE ProjectId = ?", id, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log(`Project with the id ${id} was deleted.`);
            result(null, res);
        }
    );
};

module.exports = Project;