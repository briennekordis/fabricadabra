import '../App.css';
import React, { useState, useEffect } from "react";
import FabricDataService from "../services/fabricServices";
import { Modal, Button, ModalHeader, ModalTitle, ModalBody } from "react-bootstrap";

function ViewStash() {
    let details = {};
    const [stash, setStash] = useState([]);
    const [fabric, setFabric] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [detailsShow, setDetailsShow] = useState(false);
    const [warningShow, setWarningShow] = useState(false);
    const [modalInfo, setModalInfo] = useState([]);
    const handleCloseDetails = () => setDetailsShow(false);
    const handleCloseWarning = () => setWarningShow(false);
    const widthFormat = new Intl.NumberFormat({maximumFractionDigits: 0});

    // Get all fabric
    useEffect(() => {
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
      getStash();
    }, []);

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
    
    //Update fabric by id


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

    }

    const showWarning = () => {
      setDetailsShow(false);
      setWarningShow(true);
    }

    const WarningModal = () => {
      return (
        <Modal show={warningShow} onHide={handleCloseWarning}>
          <Modal.Header closeButton>
            <Modal.Title>Warning!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete {modalInfo.PatternDesc} {modalInfo.Color} {modalInfo.FabricType}?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseWarning}>Cancel</Button>
            <Button variant="primary" onClick={deleteFabric}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      )
    }
    
    const DetailsModal = () => {
      return (
        <Modal show={detailsShow} onHide={handleCloseDetails}>
            <Modal.Header closeButton>
                <Modal.Title>Fabric Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id="detailsForm">
                    <div className="form-group">
                        <label>Fabric Type:</label>
                        <p className="form-control">{modalInfo.FabricType}</p>
                        <label>Color:</label>
                        <p className="form-control">{modalInfo.Color}</p>
                        <label>Pattern:</label>
                        <p className="form-control">{modalInfo.PatternDesc}</p>
                        <label>Yardage:</label>
                        <p className="form-control" id="yardage">{modalInfo.Yardage}</p>
                        <label>Width:</label>
                        <p className="form-control" id="width">{widthFormat.format(modalInfo.Width)}"</p>
                        <br />
                        <label>Source:</label>
                        <p className="form-control">{modalInfo.SourceName}</p>
                        <label>Intended Project:</label>
                        <p className="form-control">{modalInfo.ProjectName}</p>
                        <div className="form-check">
                            <label>Scrap:</label>
                            <input type="checkbox" readOnly className="form-check-input" id="details-scrap-checkbox" checked={modalInfo.ScrapStatus}/>
                        </div>
                      </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary">Edit</Button>
                <Button variant="danger" onClick={showWarning}>Delete</Button>
                <Button variant="secondary" onClick={handleCloseDetails}>Close</Button>
            </Modal.Footer>
        </Modal>
      );
    };

    function Fabric({fabric: {FabricId, FabricType, Color, PatternDesc, 
      Yardage, Width, SourceName, ProjectName, ScrapStatus} }) {
        return (
          <tr key={FabricId} onClick={function(){showDetails(FabricId)}}>
            <td>{FabricType}</td>
            <td>{Color}</td>
            <td>{PatternDesc}</td>
            <td className="text-end">{Yardage}</td>
            <td className="text-end">{widthFormat.format(Width)}"</td>
            {/* <td>{SourceName}</td>
            <td>{ProjectName}</td> */}
            {/* <td className="text-center"><input type="checkbox" readOnly checked={ScrapStatus}></input></td> */}
          </tr>
        );
      }

    return (
      <>
        <div>
            <table className="table table-bordered table-striped" id="fabricTable">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Fabric Type</th>
                        <th scope="col">Color</th>
                        <th scope="col">Pattern</th>
                        <th scope="col" id="yardageCol" className="text-end">Yardage</th>
                        <th scope="col" id="widthCol" className="text-end">Width</th>
                        {/* <th scope="col">Source</th>
                        <th scope="col">Intended Project</th> */}
                        {/* <th scope="col">Scrap Status</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {stash.map(fabric => <Fabric key={Fabric.FabricId} fabric={fabric} />)}
                  </tbody>
            </table>
        </div>
        <div>
            {detailsShow ? <DetailsModal /> : null}
        </div>
        <div>
            {warningShow ? <WarningModal /> : null}
        </div>
      </> 
    );
  }


export default ViewStash;
