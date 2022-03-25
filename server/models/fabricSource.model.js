const sql = require("./db.js");

const FabricSource = function(fabricSource) {
    this.FabricSourceId = fabricSource.FabricSourceId;
    this.SourceName = fabricSource.SourceName;
}

FabricSource.create = (newFabricSource, result) => {
    sql.query("INSERT INTO FabricSources SET ?", newFabricSource, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      console.log("Created fabric source: ", { id: res.insertId, ...newFabricSource });
      result(null, { id: res.insertId, ...newFabricSource });
    });
  };

  FabricSource.getAll = (result) => {
    let query = 
        "SELECT * " +
        "FROM FabricSources;" 
    sql.query(query, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log("Fabric sources: ", res);
        result(null, res);
    });
};

FabricSource.getById = (id, result) => {
    let query =
        "SELECT * " +
        "FROM FabricSources "
    query += `WHERE FabricSourceId = ${id};`

    sql.query(query, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log("Fabric sources: ", res);
        result(null, res);
    });
};

FabricSource.updateById = (id, fabricSource, result) => {
    sql.query(
        "UPDATE FabricSources " +
        "SET SourceName = ? " +
        "WHERE FabricSourceId = ?;",
        [fabricSource.SourceName,
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
            console.log("Updated fabric source: ", {id: id, ...fabricSource });
            result(null, { id: id, ...fabricSource });
        }
    );
};

FabricSource.remove = (id, result) => {
    sql.query(
        "DELETE FROM FabricSources WHERE FabricSourceId = ?", id, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log(`Fabric source with the id ${id} was deleted.`);
            result(null, res);
        }
    );
};

module.exports = FabricSource;