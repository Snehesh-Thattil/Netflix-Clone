import React from 'react'
import Navbar from '../Navbar/Navbar'

function BrowseByLanguage() {
    // Rendering
    return (
        <div style={
            {
                width: '100%',
                height: '100vh',
                marginTop: '4rem',
                color: 'whitesmoke',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Navbar />
            <h1>Brows By Language Page</h1>
            <p>Yet to Design</p>
        </div>
    )
}

export default BrowseByLanguage
