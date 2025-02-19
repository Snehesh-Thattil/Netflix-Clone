import React, { useEffect, useRef, useState } from 'react'
import './Languages.css'

function Languages() {
    const [currentLang, setCurrentLang] = useState('English')
    const dropdownRef = useRef()

    // Language options array
    const languages = [
        "English", "Hindi", "Tamil", "Telugu"
    ]

    // Select a language from dropdown
    function handleSelection(lang) {
        setCurrentLang(lang)
        dropdownRef.current?.classList.remove('show')
    }

    // Handle click outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (!dropdownRef.current?.contains(e.target)) {
                dropdownRef.current?.classList.remove('show')
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    // Rendering
    return (
        <div className="languages" ref={dropdownRef}>
            <div className="selected" onClick={() => dropdownRef.current.classList.toggle('show')}>
                <p>{currentLang}</p>
                <i className="fa-solid fa-caret-down"></i>
            </div>

            <div className='options'>
                {languages.filter((lang) => lang !== currentLang)
                    .map((lang, index) => {
                        return (
                            <button key={index} onClick={() => handleSelection(lang)}>{lang}</button>
                        )
                    })}
            </div>
        </div>
    )
}

export default Languages
