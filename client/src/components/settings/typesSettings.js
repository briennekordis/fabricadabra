import '../../App.css';
import "./settings.css";
import SettingsDataService from "../../services/settingServices";
import { React, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const TypesSettings = (props) => {
    let details = {};
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [detailsShow, setDetailsShow] = useState(false);
    const [modalInfo, setModalInfo] = useState([]);
    const handleCloseDetails = () => setDetailsShow(false);

    // Get source by id
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
        <Modal show={detailsShow} onHide={handleCloseDetails}>
            <Modal.Header closeButton>
                <Modal.Title>Fabric Type Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id="detailsForm">
                    <div className="form-group">
                        <label>Fabric Type:</label>
                        <p className="form-control">{modalInfo.FabricType}</p>
                      </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDetails}>Close</Button>
            </Modal.Footer>
        </Modal>
      );
    };

  return (
    <div>
        <div className="typesContainer">
            {props.data.map(type => <FabricTypes key={FabricTypes.FabricTypeId} type={type} />)}
        </div>
        <div>
          {detailsShow ? <DetailsModal /> : null}
      </div>
    </div>
  
  );
};

export default TypesSettings;

