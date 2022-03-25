const sql = require("./db.js");

const Fabric = function(fabric) {
    this.FabricId = fabric.FabricId;
    this.FabricTypeId = fabric.FabricTypeId;
    // this.FabricType = fabric.FabricType;
    this.Color = fabric.Color;
    this.PatternId = fabric.PatternId;
    // this.PatternDesc = fabric.PatternDesc;
    this.Yardage = fabric.Yardage;
    this.Width = fabric.Width;
    this.FabricSourceId = fabric.FabricSourceId;
    // this.SourceName = fabric.SourceName;
    this.ScrapStatus = fabric.ScrapStatus;
    this.ProjectId = fabric.ProjectId;
    // this.ProjectName = fabric.ProjectName;
    // this.StatusId = fabric.StatusId;
    // this.ProjectStatus = fabric.ProjectStatus;
}; 

Fabric.create = (newFabric, result) => {
    sql.query("INSERT INTO Fabrics SET ?", newFabric, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      console.log("Created fabric: ", { id: res.insertId, ...newFabric });
      result(null, { id: res.insertId, ...newFabric });
    });
  };

Fabric.getAll = (result) => {
    let query = 
        "SELECT *, " +
            "CASE WHEN StatusId = 1 THEN 'Planned' " +
                "WHEN StatusId = 2 THEN 'In progress' " +
                "WHEN StatusId = 3 THEN 'Completed' " +
                "ELSE 'Unknown' " +
            "END 'ProjectStatus' " +
        "FROM Fabrics f " +
            "INNER JOIN FabricTypes t " +
                "ON f.FabricTypeId = t.FabricTypeId " + 
            "INNER JOIN FabricPatterns p " +
                "ON f.PatternId = p.PatternId " +
            "INNER JOIN FabricSources s " +
                "ON f.FabricSourceId = s.FabricSourceId " +
            "LEFT OUTER JOIN Projects pr " +
                "ON f.ProjectId = pr.ProjectId;"
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
        "SELECT *, " +
            "CASE WHEN StatusId = 1 THEN 'Planned' " +
                "WHEN StatusId = 2 THEN 'In progress' " +
                "WHEN StatusId = 3 THEN 'Completed' " +
                "ELSE 'Unknown' " +
            "END 'ProjectStatus' " +
        "FROM Fabrics f " +
            "INNER JOIN FabricTypes t " +
                "ON f.FabricTypeId = t.FabricTypeId " + 
            "INNER JOIN FabricPatterns p " +
                "ON f.PatternId = p.PatternId " +
            "INNER JOIN FabricSources s " +
                "ON f.FabricSourceId = s.FabricSourceId " +
            "LEFT OUTER JOIN Projects pr " +
                "ON f.ProjectId = pr.ProjectId "
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
            "Yardage = ?, "  +
            "Width = ?, " +
            "FabricSourceId = ?, " +
            "ScrapStatus = ?, " +
            "ProjectId = ? " +
        "WHERE FabricId = ? ",
        [fabric.FabricTypeId,
         fabric.Color,
         fabric.PatternId,
         fabric.Yardage,
         fabric.Width,
         fabric.FabricSourceId,
         fabric.ScrapStatus,
         fabric.ProjectId,
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
            console.log("Updated fabric: ", {id: id, ...fabric });
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