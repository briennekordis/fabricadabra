import '../../App.css';
import "./settings.css";
import SettingsDataService from "../../services/settingServices";
import { React, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const PatternSettings = (props) => {
  let details = {};
  const [patterns, setPatterns] = useState([]);
  const [pattern, setPattern] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalInfo, setModalInfo] = useState([]);
  const [detailsShow, setDetailsShow] = useState(false);
  const [warningShow, setWarningShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [responseShow, setResponseShow] = useState(false);

  const handleCloseDetails = () => setDetailsShow(false);
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
    props.handleClose();
  }

  // Get pattern by id
  const showDetails = async (id) => {
    try {
      const response = await SettingsDataService.getPattern(id);
      details = await response.data[0];
      setModalInfo(details);
      setDetailsShow(true);
      setError(null);
    } catch (err) {
      setError(err.message);
      setDetailsShow(null);
    } finally {
      setLoading(false);
    }
  }

  function FabricPatterns({ pattern: { PatternId, PatternDesc } }) {
    return (
      <div>
        <a onClick={function () { showDetails(PatternId) }}>{PatternDesc}</a>
      </div>
    );
  }

  const DetailsModal = () => {
    return (
      <Modal show={detailsShow} onHide={function () { handleCloseDetails() }}>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="settingsDetails">
            <p><span>Fabric Pattern:</span> {modalInfo.PatternDesc}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button id="editButton" onClick={function () { showEdit() }}>Edit</Button>
          <Button id="deleteButton" onClick={function () { showWarning() }}>Delete</Button>
          <Button id="closeButton" onClick={function () { handleCloseDetails() }}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  // Delete pattern by id
  const deletePattern = async (id) => {
    try {
      const response = await SettingsDataService.removePattern(id);
      handleCloseWarning();
    } catch (err) {
      setError(err.message);
      setPatterns(null);
    } finally {
      setLoading(false);
    }
  }

  const showWarning = () => {
    setDetailsShow(false);
    setWarningShow(true);
  }

  const WarningModal = () => {
    return (
      <Modal show={warningShow} onHide={function () { handleCloseWarning() }}>
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete {modalInfo.PatternDesc}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button id="closeButton" onClick={function () { handleCloseWarning() }}>Cancel</Button>
          <Button id="confirmButton" onClick={function () { deletePattern(modalInfo.PatternId) }}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  // Update pattern by id
  const editPattern = async (id, modPattern) => {
    try {
      const response = await SettingsDataService.updatePattern(id, { PatternDesc: modPattern });
      console.log(response.data.message);
      handleCloseEdit();
    } catch (err) {
      setError(err.message);
      setPattern(null);
    } finally {
      setLoading(false);
    }
  }

  const showEdit = () => {
    setDetailsShow(false);
    setEditShow(true);
  }

  const EditModal = () => {
    return (
      <Modal show={editShow} onHide={function () { handleCloseEdit() }}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Fabric Pattern</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="detailsForm">
            <div className="form-group">
              <label>Fabric Pattern:</label>
              <input type="text" className="form-control" id="fabricPatternEdit" defaultValue={modalInfo.PatternDesc} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button id="closeButton" onClick={function () { handleCloseEdit() }}>Cancel</Button>
          <Button id="confirmButton" onClick={function () { editPattern(modalInfo.PatternId, document.getElementById("fabricPatternEdit").value) }}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const ResponseModal = () => {
    return (
      <Modal show={responseShow} onHide={function () { handleCloseResponse() }}>
        <Modal.Header closeButton>
          <Modal.Title>Response</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p></p>
        </Modal.Body>
        <Modal.Footer>
          <Button id="closeButton" onClick={function () { handleCloseResponse() }}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  // Add type
  const showAdd = () => {
    setAddShow(true);
  }

  const addPattern = async (newId, newPattern) => {
    try {
      const response = await SettingsDataService.createPattern({ "PatternId": newId, "PatternDesc": newPattern });
      handleCloseAdd();
    } catch (err) {
      setError(err.message);
      setPatterns(null);
    } finally {
      setLoading(false);
    }
    setResponseShow(true);
  }

  const AddModal = () => {
    return (
      <Modal show={addShow} onHide={function () { handleCloseAdd() }}>
        <Modal.Header closeButton>
          <Modal.Title>Add Fabric Pattern</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="addTypeModal">
            <div className="form-group">
              <label>Fabric Pattern:</label>
              <input type="text" className="form-control" id="fabricPatternAdd" placeholder="Fabric Pattern Name" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button id="closeButton" onClick={function () { handleCloseAdd() }}>Cancel</Button>
          <Button id="confirmButton" onClick={function () { addPattern(modalInfo.PatternId, document.getElementById("fabricPatternAdd").value) }}>Add</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div>
      <div id="settingsAddIcon">
        <i className="bi bi-plus-square-fill" id="settingsAddIcon" type="button" onClick={() => {showAdd()}}></i>  
      </div>
      <div className="patternsContainer">
        {props.data.map(pattern => <FabricPatterns key={pattern.PatternId} pattern={pattern} />)}
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
    </div>

  );
}

export default PatternSettings;