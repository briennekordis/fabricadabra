import '../App.css';
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import FabricDataService from "../services/fabricServices";
import SettingsDataService from "../services/settingServices";

function Stash() {
  let details = {};
  const [stash, setStash] = useState([]);
  const [types, setTypes] = useState([]);
  const [sources, setSources] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [fabric, setFabric] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detailsShow, setDetailsShow] = useState(false);
  const [warningShow, setWarningShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [responseShow, setResponseShow] = useState(false);
  const [responseContent, setResponseContent] = useState({});
  const [modalInfo, setModalInfo] = useState([]);
  const widthFormat = new Intl.NumberFormat({ maximumFractionDigits: 0 });

  useEffect(() => {
    getStash();
    getTypes();
    getSources();
    getPatterns();
  }, []);

  const handleCloseDetails = () => { setDetailsShow(false); }
  const handleCloseWarning = () => {
    setWarningShow(false);
    setResponseShow(true);
  }
  const handleCloseEdit = () => {
    setEditShow(false);
  }
  const handleCloseAdd = () => {
    setAddShow(false);
  }
  const handleCloseResponse = () => {
    setResponseShow(false);
    getStash();
  }

  const buildFabric = (id) => {
    return {
      FabricId: parseInt(id),
      FabricTypeId: parseInt(document.getElementById("formFabricTypeId").value),
      Color: document.getElementById("formColor").value,
      PatternId: parseInt(document.getElementById("formPatternId").value),
      Yardage: parseFloat(document.getElementById("formYardage").value),
      Width: parseFloat(document.getElementById("formWidth").value),
      FabricSourceId: parseInt(document.getElementById("formFabricSourceId").value),
      ScrapStatus: document.getElementById("formScrapStatus").checked,
    }
  }

  // Get all fabric 
  const getStash = async () => {
    try {
      const response = await FabricDataService.getAll();
      setStash(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setStash(null);
    } finally {
      setLoading(false);
    }
  };
  const getTypes = async () => {
    try {
      const typeResponse = await SettingsDataService.getAllTypes();
      setTypes(typeResponse.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setTypes(null);
    } finally {
      setLoading(false);
    }
  };

  const getSources = async () => {
    try {
      const sourceResponse = await SettingsDataService.getAllSources();
      setSources(sourceResponse.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSources(null);
    } finally {
      setLoading(false);
    }
  };

  const getPatterns = async () => {
    try {
      const patternResponse = await SettingsDataService.getAllPatterns();
      setPatterns(patternResponse.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setPatterns(null);
    } finally {
      setLoading(false);
    }
  };

  // Get fabric by id
  const showDetails = async (id) => {
    try {
      const response = await FabricDataService.get(id);
      details = await response.data[0];
      setModalInfo(details);
      setDetailsShow(true);
      setError(null);
    } catch (err) {
      setError(err.message);
      setFabric(null);
    } finally {
      setLoading(false);
    }
  }

  const DetailsModal = () => {
    return (
      <Modal show={detailsShow} onHide={function () { handleCloseDetails() }} id="stashDetailsModal">
        <Modal.Header closeButton>
          <Modal.Title>Fabric Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="detailsModal">
            <div className="form-group">
              <p><span>Fabric Type: </span>{modalInfo.FabricType}</p>
              <p><span>Color(s): </span>{modalInfo.Color}</p>
              <p><span>Pattern: </span>{modalInfo.PatternDesc}</p>
              <p><span>Yardage: </span> {modalInfo.Yardage}</p>
              <p><span>Width: </span>{widthFormat.format(modalInfo.Width)}"</p>
              <p><span>Source: </span>{modalInfo.SourceName}</p>
              <p><span>Scrap: </span><input type="checkbox" readOnly className="form-check-input" id="details-scrap-checkbox" checked={modalInfo.ScrapStatus} /></p>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button id="editButton" onClick={function () { showEdit() }}>Edit</Button>
          <Button id="deleteButton" onClick={function () { showWarning() }}>Delete</Button>
          <Button id="closeButton" onClick={function () { handleCloseDetails() }}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };


  //Delete fabric by id
  const deleteFabric = async (id) => {
    try {
      const response = await FabricDataService.remove(id);
      console.log(response);
    } catch (err) {
      setError(err.message);
      setFabric(null);
    } finally {
      setLoading(false);
    }
    handleCloseWarning();
  }

  const showWarning = () => {
    setDetailsShow(false);
    setWarningShow(true);
  }

  const WarningModal = () => {
    console.log(modalInfo.FabricId);
    return (
      <Modal show={warningShow} onHide={function () { handleCloseWarning() }}>
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete {modalInfo.PatternDesc} {modalInfo.Color} {modalInfo.FabricType}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button id="closeButton" onClick={function () { handleCloseWarning() }}>Cancel</Button>
          <Button id="confirmButton" onClick={function () { deleteFabric(modalInfo.FabricId) }}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  //Update fabric by id
  const editFabric = async (id) => {
    const modFabric = buildFabric(id);
    console.log(modFabric);
    try {
      const response = await FabricDataService.update(parseInt(id), modFabric);
      handleCloseEdit();
    } catch (err) {
      setError(err.message);
      setFabric(null);
    } finally {
      setLoading(false);
    }
    setResponseShow(true);
  }

  const showEdit = () => {
    setDetailsShow(false);
    setEditShow(true);
  }

  const EditModal = () => {
    return (
      <Modal show={editShow} onHide={function () { handleCloseEdit() }}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Fabric</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="editFabricForm">
            <div className="form-group">
              <label>Fabric Type:</label>
              <select className="form-select" id="formFabricTypeId" defaultValue={modalInfo.FabricTypeId}>{types.map(type => (
                <option key={type.FabricTypeId} value={type.FabricTypeId}>{type.FabricType}</option>
              ))}
              </select>
              <label>Color(s):</label>
              <input className="form-control" defaultValue={modalInfo.Color} id="formColor" />
              <label>Pattern:</label>
              <select className="form-select" id="formPatternId" defaultValue={modalInfo.PatternId}>{patterns.map(pattern => (
                <option key={pattern.PatternId} value={pattern.PatternId}>{pattern.PatternDesc}</option>
              ))}
              </select>
              <label>Yardage:</label>
              <input className="form-control" defaultValue={modalInfo.Yardage} id="formYardage" />
              <label>Width:</label>
              <input className="form-control" defaultValue={modalInfo.Width} id="formWidth" />
              <br />
              <label>Source:</label>
              <select className="form-select" id="formFabricSourceId" defaultValue={modalInfo.FabricSourceId}>{sources.map(source => (
                <option key={source.FabricSourceId} value={source.FabricSourceId}>{source.SourceName}</option>
              ))}
              </select>
              <br />
              <div className="form-check">
                <label>Scrap:</label>
                <input type="checkbox" className="form-check-input" defaultChecked={modalInfo.ScrapStatus} id="formScrapStatus" />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button id="closeButton" onClick={function () { handleCloseEdit() }}>Cancel</Button>
          <Button id="confirmButton" onClick={function () { editFabric(modalInfo.FabricId) }}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  // Add type
  const showAdd = () => {
    setAddShow(true);
  }

  const addFabric = async () => {
    const fabricBuild = buildFabric(0);
    const response = await FabricDataService.create(fabricBuild);
    console.log(response);
    if (response.data.success) {
      setResponseContent({
        title: "Success",
        body: "Fabric was successfully added"
      });
      handleCloseAdd();
    } else {
      setResponseContent({
        title: "There was a problem processing the request",
        status: `${response.data.errno}: ${response.data.code}`,
        body: response.data.message
      });
    }
    setResponseShow(true);
  }

  const AddModal = () => {
    return (
      <Modal show={addShow} onHide={function () { handleCloseAdd() }}>
        <Modal.Header closeButton>
          <Modal.Title>Add Fabric</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="addFabricForm">
            <div className="form-group">
              <label>Fabric Type:</label>
              <select className="form-select" id="formFabricTypeId" placeholder="Select...">{types.map(type => (
                <option key={type.FabricTypeId} value={type.FabricTypeId}>{type.FabricType}</option>
              ))}
              </select>
              <label>Color(s):</label>
              <input className="form-control" id="formColor" />
              <label>Pattern:</label>
              <select className="form-select" id="formPatternId">{patterns.map(pattern => (
                <option key={pattern.PatternId} value={pattern.PatternId}>{pattern.PatternDesc}</option>
              ))}
              </select>
              <label>Yardage:</label>
              <input className="form-control" id="formYardage" />
              <label>Width:</label>
              <input className="form-control" id="formWidth" />
              <br />
              <label>Source:</label>
              <select className="form-select" id="formFabricSourceId">{sources.map(source => (
                <option key={source.FabricSourceId} value={source.FabricSourceId}>{source.SourceName}</option>
              ))}
              </select>
              <br />
              <div className="form-check">
                <label>Scrap:</label>
                <input type="checkbox" className="form-check-input" id="formScrapStatus" />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button id="closeButton" onClick={function () { handleCloseAdd() }}>Cancel</Button>
          <Button id="confirmButton" onClick={function () { addFabric(modalInfo.FabricId) }}>Add</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const ResponseModal = () => {
    return (
      <Modal show={responseShow} onHide={function () { handleCloseResponse() }}>
        <Modal.Header closeButton>
          <Modal.Title>{responseContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{responseContent.status}</h4>
          <p>{responseContent.body}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button id="closeButton" onClick={function () { handleCloseResponse() }}>OK</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function Fabric({ fabric: { FabricId, FabricType, Color, PatternDesc, Yardage, Width } }) {
    return (
      <tr key={FabricId} onClick={function () { showDetails(FabricId) }}>
        <td>{FabricType}</td>
        <td>{Color}</td>
        <td>{PatternDesc}</td>
        <td className="text-end">{Yardage}</td>
        <td className="text-end">{widthFormat.format(Width)}"</td>
      </tr>
    );
  }

  return (
    <>
      <div id="stashOps">
        <i className="bi bi-plus-square-fill" id="addFabricIcon" type="button" onClick={() => { showAdd() }}></i>
      </div>
      <div id="stashTable">
        <table className="table table-bordered table-striped" id="fabricTable">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Fabric Type</th>
              <th scope="col">Color(s)</th>
              <th scope="col">Pattern</th>
              <th scope="col" id="yardageCol" className="text-end">Yardage</th>
              <th scope="col" id="widthCol" className="text-end">Width</th>
            </tr>
          </thead>
          <tbody>
            {stash.map(fabric => <Fabric key={fabric.FabricId} fabric={fabric} />)}
          </tbody>
        </table>
      </div>
      <div>
        {detailsShow ? <DetailsModal /> : null}
      </div>
      <div>
        {warningShow ? <WarningModal /> : null}
      </div>
      <div>
        {editShow ? <EditModal /> : null}
      </div>
      <div>
        {addShow ? <AddModal /> : null}
      </div>
      <div>
        {responseShow ? <ResponseModal /> : null}
      </div>

    </>
  );
}

export default Stash;
