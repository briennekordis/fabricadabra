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
  const handleCloseDetails = () => setDetailsShow(false);

  const handleCloseWarning = () => {
    setWarningShow(false);
    props.handleClose();
  }
  const handleCloseEdit = () => {
    setEditShow(false);
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
    } catch (err) {
      setError(err.message);
      setPatterns(null);
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
  const editPattern = async (id, newPattern) => {
    try {
      const response = await SettingsDataService.updatePattern(id, { "PatternDesc": newPattern });
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



  return (
    <div>
      <div id="settingsAddIcon">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16" type="button">
          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
        </svg>
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

    </div>

  );
}

export default PatternSettings;