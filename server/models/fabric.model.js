const sql = require("./db.js");

const Fabric = function (fabric) {
    this.FabricId = fabric.FabricId;
    this.FabricTypeId = fabric.FabricTypeId;
    this.Color = fabric.Color;
    this.PatternId = fabric.PatternId;
    this.Yardage = fabric.Yardage;
    this.Width = fabric.Width;
    this.FabricSourceId = fabric.FabricSourceId;
    this.ScrapStatus = fabric.ScrapStatus;
};

Fabric.create = (newFabric, result) => {
    sql.query("INSERT INTO Fabrics SET ?", newFabric, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        console.log("Created fabric: ", { id: res.insertId, ...newFabric });
        result(null, { success: true, id: res.insertId, ...newFabric });
    });
};

Fabric.getAll = (result) => {
    let query =
        "SELECT * " +
        "FROM Fabrics f " +
        "INNER JOIN FabricTypes t " +
        "ON f.FabricTypeId = t.FabricTypeId " +
        "INNER JOIN FabricPatterns p " +
        "ON f.PatternId = p.PatternId " +
        "INNER JOIN FabricSources s " +
        "ON f.FabricSourceId = s.FabricSourceId;";
    sql.query(query, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log("Fabrics: ", res);
        result(null, res);
    });
};

Fabric.getById = (id, result) => {
    let query =
        "SELECT * " +
        "FROM Fabrics f " +
        "INNER JOIN FabricTypes t " +
        "ON f.FabricTypeId = t.FabricTypeId " +
        "INNER JOIN FabricPatterns p " +
        "ON f.PatternId = p.PatternId " +
        "INNER JOIN FabricSources s " +
        "ON f.FabricSourceId = s.FabricSourceId ";
    query += `WHERE FabricId = ${id};`

    sql.query(query, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log("Fabrics: ", res);
        result(null, res);
    });
};

Fabric.updateById = (id, fabric, result) => {
    sql.query(
        "UPDATE Fabrics " +
        "SET FabricTypeId = ?, " +
        "Color = ?, " +
        "PatternId = ?, " +
        "Yardage = ?, " +
        "Width = ?, " +
        "FabricSourceId = ?, " +
        "ScrapStatus = ?, " +
        "WHERE FabricId = ? ",
        [fabric.FabricTypeId,
        fabric.Color,
        fabric.PatternId,
        fabric.Yardage,
        fabric.Width,
        fabric.FabricSourceId,
        fabric.ScrapStatus,
            id],
        (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("Updated fabric: ", { id: id, ...fabric });
            result(null, { id: id, ...fabric });
        }
    );
};

Fabric.remove = (id, result) => {
    sql.query(
        "DELETE FROM Fabrics WHERE FabricId = ?", id, (err, res) => {
            if (err) {
                console.log("Error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log(`Fabric with the id ${id} was deleted.`);
            result(null, res);
        }
    );
};

module.exports = Fabric;