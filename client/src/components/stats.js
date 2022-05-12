import React from "react";

function Stats() {
    return (
        <div>
            <h1>Stash Stats</h1>
            <table className="table table-bordered table-striped" id="statsTable">
                <thead className="thead-dark">
                    <tr>
                        <th>Total Yardage in Stash</th>
                        <th>Number of Individual Fabrics in Stash</th>
                    </tr>
                </thead>
                <tbody>
                        <td>Sum</td>
                        <td>Count</td>
                </tbody>           
            </table>
            <table className="table table-bordered table-striped" id="statsTable">
                <thead className="thead-dark">
                    <tr>
                        <th>Fabric Type</th>
                        <th>Count of Fabric Type</th>
                        <th>Total Yardage of Fabric Type</th>
                    </tr>
                </thead>
                <tbody>
                        <td>Name</td>
                        <td>Count</td>
                        <td>Sum</td>
                </tbody>           
            </table>
            <table className="table table-bordered table-striped" id="statsTable">
                <thead className="thead-dark">
                    <tr>
                        <th>Source Name</th>
                        <th>Count of Fabrics from Source</th>
                    </tr>
                </thead>
                <tbody>
                        <td>Source Name</td>
                        <td>Count</td>
                </tbody>           
            </table>

        </div>

    )
}

export default Stats;