import '../App.css';
import "../settings.css";
import SettingDataService from "../services/settingServices";
import { React, useState, useEffect } from "react";
import Collapsible from 'react-collapsible';

function SourceSettings() {
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {  
        const getSources = async () => {
            try {
            const response = await SettingDataService.getAllSources();
            setSources(response.data);
            setError(null);
            } catch (err) {
            setError(err.message);
            setSources(null);
            } finally {
            setLoading(false);
            }
        };
        getSources();
      }, []);

    function FabricSources({type: {FabricSourceId, SourceName}}) {
    return (
        <div>
            {SourceName}
        </div>
    );
    }

    return (
        <div className="main">
            <div>
                <Collapsible trigger="Fabric Sources">
                    <div className="sourcesContainer">
                    {sources.map(source => <FabricSources key={FabricSources.FabricSourceId} source={source}/>)}
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
}