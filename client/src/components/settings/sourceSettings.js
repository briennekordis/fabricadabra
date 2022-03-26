import '../../App.css';
import "./settings.css";
import SettingsDataService from "../../services/settingServices";
import { React, useState, useEffect } from "react";

function SourceSettings() {
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

        const getSources = () => {
            try {
            const response = SettingsDataService.getAllSources();
            setSources(response.data);
            setError(null);
            } catch (err) {
            setError(err.message);
            setSources(null);
            } finally {
            setLoading(false);
            }
        };

    function FabricSources({type: {FabricSourceId, SourceName}}) {
    return (
        <div>
            {SourceName}
        </div>
    );
    }

    return (
        <div className="sourcesContainer">
            {sources.map(source => <FabricSources key={FabricSources.FabricSourceId} source={source}/>)}
        </div>
    );
}

export default SourceSettings;