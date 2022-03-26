import '../App.css';
import React, { useState, useEffect } from "react";
import FabricDataService from "../services/fabricServices";
import { Modal, Button } from "react-bootstrap";

function ViewStash() {
    let details = {};
    const [stash, setStash] = useState([]);
    const [fabric, setFabric] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [detailsShow, setDetailsShow] = useState(false);
    const [warningShow, setWarningShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [modalInfo, setModalInfo] = useState([]);
    const handleCloseDetails = () => setDetailsShow(false);
    const handleCloseWarning = () => setWarningShow(false);
    const handleCloseEdit = () => setEditShow(false);
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
        <Modal show={warningShow} onHide={function(){handleCloseWarning()}}>
          <Modal.Header closeButton>
            <Modal.Title>Warning!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete {modalInfo.PatternDesc} {modalInfo.Color} {modalInfo.FabricType}?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button id="closeButton" onClick={function(){handleCloseWarning()}}>Cancel</Button>
            <Button id="confirmButton" onClick={function(){deleteFabric(modalInfo.FabricId)}}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      );
    }


    //Update fabric by id
    const editFabric = async (id) => {
      try {
        const response = await FabricDataService.update(id);
        console.log(response);
      } catch (err) {
        setError(err.message);
        setFabric(null);
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
            <Modal.Title>Edit Fabric</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form id="detailsForm">
                  <div className="form-group">
                      <label>Fabric Type:</label>
                      <input className="form-control"/>
                      <label>Color:</label>
                      <input className="form-control"/>
                      <label>Pattern:</label>
                      <input className="form-control"/>
                      <label>Yardage:</label>
                      <input className="form-control" id="yardage"/>
                      <label>Width:</label>
                      <input className="form-control" id="width"/>
                      <br />
                      <label>Source:</label>
                      <input className="form-control"/>
                      <label>Intended Project:</label>
                      <input className="form-control"/>
                      <div className="form-check">
                          <label>Scrap:</label>
                          <input type="checkbox" className="form-check-input" id="details-scrap-checkbox" checked={modalInfo.ScrapStatus}/>
                      </div>
                    </div>
                </form>        
          </Modal.Body>
          <Modal.Footer>
            <Button id="closeButton" onClick={function(){handleCloseEdit()}}>Cancel</Button>
            <Button id="confirmButton" onClick={function(){editFabric()}}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      );
    }

    const DetailsModal = () => {
      return (
        <Modal show={detailsShow} onHide={function(){handleCloseDetails()}} id="stashDetailsModal">
            <Modal.Header closeButton>
                <Modal.Title>Fabric Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id="detailsForm">
                    <div className="form-group">
                        <p><span>Fabric Type: </span>{modalInfo.FabricType}</p>
                        <p><span>Color: </span>{modalInfo.Color}</p>
                        <p><span>Pattern: </span>{modalInfo.PatternDesc}</p>
                        <p><span>Yardage: </span> {modalInfo.Yardage}</p>
                        <p><span>Width: </span>{widthFormat.format(modalInfo.Width)}"</p>
                        <p><span>Source: </span>{modalInfo.SourceName}</p>
                        <p><span>Intended Project: </span>{modalInfo.ProjectName}</p>
                        <p><span>Scrap: </span><input type="checkbox" readOnly className="form-check-input" id="details-scrap-checkbox" checked={modalInfo.ScrapStatus}/></p>
                      </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button id="editButton" onClick={function(){showEdit()}}>Edit</Button>
                <Button id="deleteButton" onClick={function(){showWarning()}}>Delete</Button>
                <Button id="closeButton" onClick={function(){handleCloseDetails()}}>Close</Button>
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
          </tr>
        );
      }

    return (
      <>
        <div className="container" id="stashOps">
          <div id="addFabricIcon">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16" type="button"> 
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
              </svg>
          </div>
        </div>
        <div id="stashTable">
            <table className="table table-bordered table-striped" id="fabricTable">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Fabric Type</th>
                        <th scope="col">Color</th>
                        <th scope="col">Pattern</th>
                        <th scope="col" id="yardageCol" className="text-end">Yardage</th>
                        <th scope="col" id="widthCol" className="text-end">Width</th>
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
        <div>
            {editShow ? <EditModal /> : null}
        </div>
      </> 
    );
  }


export default ViewStash;
