import '../../App.css';
import "./settings.css";
import SettingsDataService from "../../services/settingServices";
import { React, useState } from "react";
import { Modal, Button } from "react-bootstrap";


const SourceSettings = (props) => {
    let details = {};
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [detailsShow, setDetailsShow] = useState(false);
    const [modalInfo, setModalInfo] = useState([]);
    const handleCloseDetails = () => setDetailsShow(false);

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
  
    function FabricSources({source: {FabricSourceId, SourceName}}) {
        return (
            <div>
                <a onClick={function(){showDetails(FabricSourceId)}}>{SourceName}</a>
            </div>
        );
    }

    const DetailsModal = () => {
        return (
          <Modal show={detailsShow} onHide={function(){handleCloseDetails()}}>
              <Modal.Header closeButton>
                  <Modal.Title>Fabric Source Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <form id="detailsForm">
                      <div className="form-group">
                          <label>Fabric Source:</label>
                          <p className="form-control">{modalInfo.FabricSource}</p>
                        </div>
                  </form>
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={function(){handleCloseDetails()}}>Close</Button>
              </Modal.Footer>
          </Modal>
        );
      };

    return (
        <div>
            <div className="sourcesContainer">
                {props.data.map(source => <FabricSources key={FabricSources.FabricSourceId} source={source}/>)}
            </div>
            <div>
                {detailsShow ? <DetailsModal /> : null}           
            </div>
        </div>
    );
}

export default SourceSettings;