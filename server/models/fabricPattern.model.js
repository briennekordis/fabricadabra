const sql = require("./db.js");

const FabricPattern = function(fabricPattern) {
    this.PatternId = fabricPattern.PatternId;
    this.PatternDesc = fabricPattern.PatternDesc;
}

FabricPattern.create = (newFabricPattern, result) => {
    sql.query("INSERT INTO FabricPatterns SET ?", newFabricPattern, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      console.log("Created fabric pattern: ", { id: res.insertId, ...newFabricPattern });
      result(null, { id: res.insertId, ...newFabricPattern });
    });
  };

  FabricPattern.getAll = (result) => {
    let query = 
        "SELECT * " +
        "FROM FabricPatterns;" 
    sql.query(query, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log("Fabric patterns: ", res);
        result(null, res);
    });
};

FabricPattern.getById = (id, result) => {
    let query =
        "SELECT * " +
        "FROM FabricPatterns "
    query += `WHERE PatternId = ${id};`

    sql.query(query, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log("Fabric patterns: ", res);
        result(null, res);
    });
};

FabricPattern.updateById = (id, fabricPattern, result) => {
    sql.query(
        "UPDATE FabricPatterns " +
        "SET PatternDesc = ? " +
        "WHERE PatternId = ?;",
        [fabricPattern.PatternDesc,
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
            console.log("Updated fabric pattern: ", {id: id, ...fabricPattern });
            result(null, { id: id, ...fabricPattern });
        }
    );
};

FabricPattern.remove = (id, result) => {
    sql.query(
        "DELETE FROM FabricPatterns WHERE PatternId = ?", id, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log(`Fabric pattern with the id ${id} was deleted.`);
            result(null, res);
        }
    );
};

module.exports = FabricPattern;