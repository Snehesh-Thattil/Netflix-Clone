import React from 'react'
import './Languages.css'

function Languages() {
    return (
        <div className="languages">
            <div className="selected">
                <p>Language</p>
                <i className="fa-solid fa-caret-down"></i>
            </div>
            <div className='options'>
                <button>English</button>
                <button>Hindi</button>
                <button>Tamil</button>
            </div>
        </div>
    )
}

export default Languages
