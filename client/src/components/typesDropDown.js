import {React, useEffect, useState } from "react";

function TypesDropDown() {
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState();
    const [types, setTypes] = useState([
    { label: "Loading ...", value: "" }
]);
    useEffect(() => {
        let unmounted = false;
        const getTypes = async () => {
            const typeResponse = await SettingsDataService.getAllTypes();
            const body = await typeResponse.json();
            if (!unmounted) {
                setTypes(
                    body.results.map(({ name }) => ({ label: name, value: name }))
                );
                    setLoading(false);
            }
        }
        getTypes();
        return () => {
            unmounted = true;
          };    
    }, []);

    return (
        <select disabled={loading}
        value={value}
        onChange={e => setValue(e.currentTarget.value)}>
        ...
      </select>

    );
}