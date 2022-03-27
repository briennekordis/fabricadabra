import '../../App.css';
import "./settings.css";
import SettingsDataService from "../../services/settingServices";
import { React, useState } from "react";
import { Modal, Button } from "react-bootstrap";


const SourceSettings = (props) => {
  let details = {};
  const [sources, setSources] = useState([]);
  const [source, setSource] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detailsShow, setDetailsShow] = useState(false);
  const [warningShow, setWarningShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [modalInfo, setModalInfo] = useState([]);
  const handleCloseDetails = () => setDetailsShow(false);
  const handleCloseWarning = () => {
    setWarningShow(false);
    props.handleClose();
  }
  const handleCloseEdit = () => {
    setEditShow(false);
    props.handleClose();
  }

  // Get sources by id
  const showDetails = async (id) => {
    try {
      const response = await SettingsDataService.getSource(id);
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

  function FabricSources({ source: { FabricSourceId, SourceName } }) {
    return (
      <div>
        <a onClick={function () { showDetails(FabricSourceId) }}>{SourceName}</a>
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
            <p><span>Fabric Source: </span>{modalInfo.SourceName}</p>
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

  // Delete source by id
  const deleteSource = async (id) => {
    try {
      const response = await SettingsDataService.removeSource(id);
      console.log(response);
    } catch (err) {
      setError(err.message);
      setSources(null);
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
    console.log(modalInfo.FabricSourceId);
    return (
      <Modal show={warningShow} onHide={function () { handleCloseWarning() }}>
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete {modalInfo.SourceName}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button id="closeButton" onClick={function () { handleCloseWarning() }}>Cancel</Button>
          <Button id="confirmButton" onClick={function () { deleteSource(modalInfo.FabricSourceId) }}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  // Update source by id
  const editSource = async (id, newSource) => {
    try {
      const response = await SettingsDataService.updateSource(id, { "SourceName": newSource });
      handleCloseEdit();
    } catch (err) {
      setError(err.message);
      setSources(null);
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
          <Modal.Title>Edit Fabric Source</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="detailsForm">
            <div className="form-group">
              <label>Fabric Source:</label>
              <input type="text" className="form-control" id="fabricSourceEdit" defaultValue={modalInfo.SourceName} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button id="closeButton" onClick={function () { handleCloseEdit() }}>Cancel</Button>
          <Button id="confirmButton" onClick={function () { editSource(modalInfo.FabricSourceId, document.getElementById("fabricSourceEdit").value) }}>Save changes</Button>
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
      <div className="sourcesContainer">
        {props.data.map(source => <FabricSources key={source.FabricSourceId} source={source} />)}
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

export default SourceSettings;