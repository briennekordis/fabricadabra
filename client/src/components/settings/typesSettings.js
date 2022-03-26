import '../../App.css';
import "./settings.css";
import SettingsDataService from "../../services/settingServices";
import { React, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const TypesSettings = (props) => {
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
    const handleCloseDetails = () => setDetailsShow(false);
    const handleCloseWarning = () => setWarningShow(false);
    const handleCloseEdit = () => setEditShow(false);
    const handleCloseAdd = () => setAddShow(false);
    const handleInputChange = event => {
      const { name, value } = event.target;
      setType({ ...type, [name]: value });
    };

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

    function FabricTypes({type: {FabricTypeId, FabricType}}) {
        return (
          <div>
              <a onClick={function(){showDetails(FabricTypeId)}}>{FabricType}</a>
          </div>
        );
    }

    const DetailsModal = () => {
      return (
        <Modal show={detailsShow} onHide={function(){handleCloseDetails()}}>
            <Modal.Header closeButton>
                <Modal.Title>Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                  <div className="settingsDetails">
                      <p><span>Fabric Type:</span> {modalInfo.FabricType}</p>
                    </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={function(){showEdit()}}>Edit</Button>
                <Button variant="danger" onClick={function(){showWarning()}}>Delete</Button>
                <Button variant="secondary" onClick={function(){handleCloseDetails()}}>Close</Button>
            </Modal.Footer>
        </Modal>
      );
    };

      // Delete type by id
      const deleteType = async (id) => {
        try {
          const response = await SettingsDataService.removeType(id);
          console.log(response);
        } catch (err) {
          setError(err.message);
          setTypes(null);
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
        <Modal show={warningShow} onHide={function(){handleCloseWarning()}}>
          <Modal.Header closeButton>
            <Modal.Title>Warning!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete {modalInfo.PatternDesc} {modalInfo.Color} {modalInfo.FabricType}?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={function(){handleCloseWarning()}}>Cancel</Button>
            <Button variant="primary" onClick={function(){deleteType(modalInfo.FabricTypeId)}}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      );
    }

    // Update by id
    const editType = async (id) => {
      try {
        const response = await SettingsDataService.updateType(id);
        console.log(response);
      } catch (err) {
        setError(err.message);
        setTypes(null);
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
        <Modal show={editShow} onHide={function(){handleCloseEdit()}}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Fabric Type</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form id="detailsForm">
                  <div className="form-group">
                      <label>Fabric Type:</label>
                      <input type="text" className="form-control" placeholder={modalInfo.FabricType} onChange={handleInputChange}/>
                    </div>
                </form>        
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={function(){handleCloseEdit()}}>Cancel</Button>
            <Button variant="primary" onClick={function(){editType()}}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      );
    }

    // Add type

    const showAdd = () => {
      setAddShow(true);
    }

    const addType = async () => {
      try {
        const response = await SettingsDataService.createType();
        console.log(response);
      } catch (err) {
        setError(err.message);
        setTypes(null);
      } finally {
        setLoading(false);
      }
    }

    

    const AddModal = () => {
      return (
        <Modal show={addShow} onHide={function(){handleCloseAdd()}}>
          <Modal.Header closeButton>
            <Modal.Title>Add Fabric Type</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form id="detailsForm">
                  <div className="form-group">
                      <label>Fabric Type:</label>
                      <input type="text" className="form-control" placeholder="Fabric Type Name" onChange={handleInputChange}/>
                    </div>
                </form>        
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={function(){handleCloseAdd()}}>Cancel</Button>
            <Button variant="primary" onClick={function(){addType()}}>Add Type</Button>
          </Modal.Footer>
        </Modal>
      );
    }



  return (
    <div>
        <div id="addType">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16" type="button" onClick={function(){showAdd()}}> 
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
            </svg>
         </div>
        <div className="typesContainer">
            {props.data.map(type => <FabricTypes key={FabricTypes.FabricTypeId} type={type} />)}
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
    </div>
  
  );
};

export default TypesSettings;

