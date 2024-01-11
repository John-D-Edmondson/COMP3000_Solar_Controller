import React from 'react';
import '../CSS/SolarPanelTableCSS.css'


const SolarPanelTable = ({ panels, onUpdatePanel, onDeletePanel }) => {

    if (panels.length === 0) {
        return <p>No Solar panels registered to user.</p>;
    }

    return (
        <table className="panel-table">
            <thead>
                <tr>
                    <th>Solar Panel ID</th>
                    <th>Longitude</th>
                    <th>Latitude</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {panels.map(panel => (
                    <tr key={panel.id}>
                        <td>{panel.id}</td>
                        <td>{panel.longitude}</td>
                        <td>{panel.latitude}</td>
                        <td>
                            <button className='btn btn-primary' onClick={() => onUpdatePanel(panel)}>Update</button>
                            <button className='btn btn-danger' onClick={() => onDeletePanel(panel)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default SolarPanelTable;