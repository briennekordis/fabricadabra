import '../../App.css';
import "./settings.css";
import SettingsDataService from "../../services/settingServices";
import { React, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const TypeSettings = (props) => {
  let details = {};
  const [types, setTypes] = useState([]);
  const [type, setType] = useState({});
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

  // Get type by id
  const showDetails = async (id) => {
    try {
      const response = await SettingsDataService.getType(id);
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

  function FabricTypes({ type: { FabricTypeId, FabricType } }) {
    return (
      <div>
        <a onClick={function () { showDetails(FabricTypeId) }}>{FabricType}</a>
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
            <p><span>Fabric Type:</span> {modalInfo.FabricType}</p>
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

  // Delete type by id
  const deleteType = async (id) => {
    try {
      const response = await SettingsDataService.removeType(id);
      handleCloseWarning();
    } catch (err) {
      setError(err.message);
      setTypes(null);
    } finally {
      setLoading(false);
    }
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
          <p>Are you sure you want to delete {modalInfo.FabricType}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button id="closeButton" onClick={function () { handleCloseWarning() }}>Cancel</Button>
          <Button id="confirmButton" onClick={function () { deleteType(modalInfo.FabricTypeId) }}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  // Update by id
  const editType = async (id, modType) => {
    try {
      const response = await SettingsDataService.updateType(id, { FabricType: modType });
      handleCloseEdit();
    } catch (err) {
      setError(err.message);
      setTypes(null);
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
          <Modal.Title>Edit Fabric Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="detailsForm">
            <div className="form-group">
              <label>Fabric Type:</label>
              <input type="text" className="form-control" id="fabricTypeEdit" defaultValue={modalInfo.FabricType} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button id="closeButton" onClick={function () { handleCloseEdit() }}>Cancel</Button>
          <Button id="confirmButton" onClick={function () { editType(modalInfo.FabricTypeId, document.getElementById("fabricTypeEdit").value) }}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  // Add type
  const showAdd = () => {
    setAddShow(true);
  }

  const addType = async (newId, newType) => {
    try {
      const response = await SettingsDataService.createType({ "FabricTypeId": newId, "FabricType": newType });
      handleCloseAdd();
    } catch (err) {
      setError(err.message);
      setTypes(null);
    } finally {
      setLoading(false);
    }
    setResponseShow(true);
  }

  const AddModal = () => {
    return (
      <Modal show={addShow} onHide={function () { handleCloseAdd() }}>
        <Modal.Header closeButton>
          <Modal.Title>Add Fabric Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="addTypeModal">
            <div className="form-group">
              <label>Fabric Type:</label>
              <input type="text" className="form-control" id="fabricTypeAdd" placeholder="Fabric Type Name"/>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
        <Button id="closeButton" onClick={function () { handleCloseAdd() }}>Cancel</Button>
          <Button id="confirmButton" onClick={function () { addType(modalInfo.FabricTypeId, document.getElementById("fabricTypeAdd").value) }}>Add</Button>
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


  return (
    <div>
      <div id="settingsAddIcon">
      <i className="bi bi-plus-square-fill" id="settingsAddIcon" type="button" onClick={() => {showAdd()}}></i>  
      </div>
      <div className="typesContainer">
        {props.data.map(type => <FabricTypes key={type.FabricTypeId} type={type} />)}
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
};

export default TypeSettings;

