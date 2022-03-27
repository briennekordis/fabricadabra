import "../../App.css";
import "./settings.css";
import { React, useState, useEffect } from "react";
import SettingsDataService from "../../services/settingServices";
import Collapsible from "react-collapsible";
import TypeSettings from "./typeSettings";
import SourceSettings from "./sourceSettings";
import PatternSettings from "./patternsSettings";

function Settings() {
  const [types, setTypes] = useState([]);
  const [sources, setSources] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTypes();
    getSources();
    getPatterns();
  }, []);

  const handleTypesChange = () => getTypes(); 
  const handleSourcesChange = () => getSources();
  const handlePatternsChange = () => getPatterns();
  

  const getTypes = async () => {
    try {
      const typeResponse = await SettingsDataService.getAllTypes();
      setTypes(typeResponse.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setTypes(null);
    } finally {
      setLoading(false);
    }
  };

  const getSources = async () => {
    try {
      const sourceResponse = await SettingsDataService.getAllSources();
      setSources(sourceResponse.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSources(null);
    } finally {
      setLoading(false);
    }
  };

  const getPatterns = async () => {
    try {
      const patternResponse = await SettingsDataService.getAllPatterns();
      setPatterns(patternResponse.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setPatterns(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <div>
        <Collapsible trigger="Fabric Types" id="typesTrigger">
          <div>
            <TypeSettings data={types} handleClose={() => handleTypesChange()} />
          </div>
        </Collapsible>
      </div>
      <div>
        <Collapsible trigger="Fabric Sources">
          <div>
            <SourceSettings data={sources} handleClose={() => handleSourcesChange()}/>
          </div>
        </Collapsible>
      </div>
      <div className="patternSettings">
        <Collapsible trigger="Fabric Patterns">
          <div>
            <PatternSettings data={patterns} handleClose={() => handlePatternsChange()} />
          </div>
        </Collapsible>
      </div>
    </div>

  );
}

export default Settings;