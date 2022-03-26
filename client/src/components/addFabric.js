import '../App.css';
import { useState } from "react";
import FabricDataService from "../services/fabricServices";
import { Card } from "react-bootstrap";

function AddFabric() {
  const initialFabricState = {
      FabricTypeId: null,
      Color: "",
      PatternId: null,
      Yardage: null,
      Width: null,
      FabricSourceId: null,
      ScrapStatus: false,
      ProjectId: null
  };

  const [fabric, setFabric] = useState(initialFabricState)
  const [submitted, setSubmitted] = useState(false);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setFabric({ ...fabric, [name]: value });
  };

    const saveFabric = () => {
      let data = {
          FabricTypeId: fabric.FabricTypeId,
          Color: fabric.Color,
          PatternId: fabric.FabricPatternId,
          Yardage: fabric.Yardage,
          Width: fabric.Width,
          FabricSourceId: fabric.FabricSourceId,
          ScrapStatus: fabric.ScrapStatus,
          ProjectId: fabric.ProjectId
      };
      FabricDataService.create(data).then(response => {
        setFabric({
            FabricId: response.data.fabricId,
            FabricTypeId: response.data.fabricTypeId,
            Color: response.data.color,
            PatternId: response.data.fabricPatternId,
            Yardage: response.data.yardage,
            Width: response.data.width,
            FabricSourceId: response.data.fabricSourceId,
            ScrapStatus: response.data.scrapStatus,
            ProjectId: response.data.projectId
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
    };

    const newFabric = () => {
      setFabric(initialFabricState);
      setSubmitted(false);
    };

  return (
    <Card style={{ backgroundColor: "lightgray", color: "black", width: "400px" }}>
    <Card.Header>Add a Fabric</Card.Header>
    <Card.Body>
        {submitted ? ( 
            <>
                <h5>Success! <br/>
                  Fabric has been added to stash.</h5>
                <button type="submit" className="btn btn-light" onClick={newFabric}>Add another fabric</button> 
                    </>
                    ):( 
                    <>
                <form id="add-fabric-form">
                    <div className="form-group">
                        <label>Fabric Type:</label>
                        <input type="number" className="form-control" name="FabricTypeId" onChange={handleInputChange}/>
                        <label>Fabric Color(s):</label>
                        <input type="text" className="form-control" name="Color" onChange={handleInputChange}/>
                        <label>Fabric Pattern:</label>
                        <input type="number" className="form-control" name="FabricPatternId" onChange={handleInputChange}/>
                        <label>Yardage:</label>
                        <input type="number" className="form-control" id="yardage" name="Yardage" onChange={handleInputChange}/>
                        <label>Width:</label>
                        <input type="number" className="form-control" id="width" name="Width" onChange={handleInputChange}/>
                        <label>Fabric Source:</label>
                        <input type="number" className="form-control" name="FabricSourceId" onChange={handleInputChange}/>
                        <label>Intended Project:</label>
                        <input type="text" className="form-control" id="projectId" name="ProjectId" onChange={handleInputChange}/>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="scrap-checkbox" name="ScrapStatus" onChange={handleInputChange}/>
                        <label className="form-check-label">This fabric is a scrap.</label>
                    </div>
                    <br />
                    <button type="button" id="confirmButton" className="btn btn-info" onClick={saveFabric}>Add Fabric</button>
                </form>
                    </> 
                    )}
            </Card.Body>
        </Card>
  );
  
}

export default AddFabric;