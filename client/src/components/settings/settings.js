import "../../App.css";
import "./settings.css";
import { React, useState, useEffect } from "react";
import SettingsDataService from "../../services/settingServices";
import { Button } from "react-bootstrap";
import Collapsible from "react-collapsible";
import TypesSettings from "./typesSettings";
import SourceSettings from "./sourceSettings";

function Settings() {
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getTypes = async () => {
          try {
            const response = await SettingsDataService.getAllTypes();
            setTypes(response.data);
            setError(null);
          } catch (err) {
            setError(err.message);
            setTypes(null);
          } finally {
            setLoading(false);
          }
        };
        getTypes();
      
      }, []);

    return (
        <div className="main">
            <div>
                  <Collapsible trigger="Fabric Types" id="typesTrigger">
                      <div>
                            <TypesSettings data={types}/>
                      </div>
                  </Collapsible>
            </div>
            <div>
                  <Collapsible trigger="Fabric Sources">
                      <div>
                          <SourceSettings />
                      </div>
                  </Collapsible>
            </div>
            <div className="patternSettings">
                  <Collapsible trigger="Fabric Patterns">
                      <div>
  
                      </div>
                  </Collapsible>
            </div>
        </div>
  
    );
}

export default Settings;