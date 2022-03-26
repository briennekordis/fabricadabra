const sql = require("./db.js");

const FabricType = function(fabricType) {
    this.FabricTypeId = fabricType.FabricTypeId;
    this.FabricType = fabricType.FabricType;
}

FabricType.create = (newFabricType, result) => {
    sql.query("INSERT INTO FabricTypes SET ?", newFabricType, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      console.log("Created fabric type: ", { id: res.insertId, ...newFabricType });
      result(null, { id: res.insertId, ...newFabricType });
    });
  };

  FabricType.getAll = (result) => {
    let query = 
        "SELECT * " +
        "FROM FabricTypes " +
        "WHERE FabricTypeId <> 1 " +
        "ORDER BY FabricType;" 
    sql.query(query, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log("Fabric types: ", res);
        result(null, res);
    });
};

FabricType.getById = (id, result) => {
    let query =
        "SELECT * " +
        "FROM FabricTypes "
    query += `WHERE FabricTypeId = ${id};`

    sql.query(query, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log("Fabric types: ", res);
        result(null, res);
    });
};

FabricType.updateById = (id, fabricType, result) => {
    sql.query(
        "UPDATE FabricTypes " +
        "SET FabricType = ? " +
        "WHERE FabricTypeId = ?;",
        [fabricType.FabricType,
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
            console.log("Updated fabric type: ", {id: id, ...fabricType });
            result(null, { id: id, ...fabricType });
        }
    );
};

FabricType.remove = (id, result) => {
    sql.query(
        "DELETE FROM FabricTypes WHERE FabricTypeId = ?", id, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log(`Fabric type with the id ${id} was deleted.`);
            result(null, res);
        }
    );
};

module.exports = FabricType;

