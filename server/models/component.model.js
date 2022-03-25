const sql = require("./db.js");

const Component = function(component) {
    this.ComponentId = component.ComponentId;
    this.ComponentName = component.ComponentName;
    this.ProjectId = component.ProjectId;
}

Component.create = (newComponent, result) => {
    sql.query("INSERT INTO Components SET ?", newComponent, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      console.log("Created project component: ", { id: res.insertId, ...newComponent });
      result(null, { id: res.insertId, ...newComponent });
    });
  };

  Component.getAll = (result) => {
    let query = 
        "SELECT * " +
        "FROM Components;" 
    sql.query(query, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log("Project components: ", res);
        result(null, res);
    });
};

Component.getById = (id, result) => {
    let query =
        "SELECT * " +
        "FROM Components "
    query += `WHERE ComponentId = ${id};`

    sql.query(query, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log("Project components: ", res);
        result(null, res);
    });
};

Component.updateById = (id, component, result) => {
    sql.query(
        "UPDATE Components " +
        "SET ComponentName = ? " +
        "WHERE ComponentId = ?;",
        [component.ComponentName,
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
            console.log("Updated project component: ", {id: id, ...component });
            result(null, { id: id, ...component });
        }
    );
};

Component.remove = (id, result) => {
    sql.query(
        "DELETE FROM Components WHERE ComponentId = ?", id, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log(`Project component with the id ${id} was deleted.`);
            result(null, res);
        }
    );
};

module.exports = Component;