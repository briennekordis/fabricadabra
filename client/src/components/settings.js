import '../App.css';
import "../settings.css";
import SettingDataService from "../services/settingServices";
import { React, useState, useEffect } from "react";
import Collapsible from 'react-collapsible';

const Settings = () => {
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getTypes = async () => {
          try {
            const response = await SettingDataService.getAllTypes();
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

    function FabricTypes({type: {FabricTypeId, FabricType}}) {
        return (
            <div>
                {FabricType}
            </div>
        );
    }
      
  return (
      <div className="main">
          <div>
                <Collapsible trigger="Fabric Types" id="typesTrigger">
                    <div className="typesContainer">
                         {types.map(type => <FabricTypes key={FabricTypes.FabricTypeId} type={type}/>)}
                    </div>
                </Collapsible>
          </div>
          <div>
                <Collapsible trigger="Fabric Sources">
                    <div className="sourcesContainer">
                    </div>
                </Collapsible>
          </div>
          <div className="patternSettings">
                <Collapsible trigger="Fabric Patterns">
                    <div className="patternsContainer">

                    </div>
                </Collapsible>
          </div>
      </div>

  );
};

export default Settings;

