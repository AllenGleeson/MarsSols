import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

const BackToTop = () => {
    return (
        <button 
            className="back-to-top slideInLeft"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
        >
            <FontAwesomeIcon icon={faArrowUp} />
        </button>
    );
}

export default BackToTop;