import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

const Jumbotron = () => {
    return (
        <div id='jumbotron'>
            <div className='welcomeSection'>
                <div className='d-none d-lg-block'>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/8DZl56tS9ko?si=eh7wYc_8G5e99nNc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <div id='welcomeMessage'>
                    <h1>The Sols Of Mars</h1>
                    <hr/>
                    <p>
                        Mars — the silent red sentinel of our solar system — has long stirred our curiosity.
                        Its rust-colored deserts stretch beneath a pale orange sky, whispering ancient secrets.
                        <br /><br />
                        Thanks to robotic pioneers like Spirit, Curiosity, and Perseverance, we've glimpsed this alien world:
                        shaped by water, sculpted by storms, and frozen in time.
                        <br /><br />
                        The Red Planet offers no welcome — yet it calls to us with questions still unanswered.
                        What lies beneath the dust? What stories does it keep?
                        Welcome to the journey, one sol at a time.
                    </p>
                </div>
            </div>
            <div id='rover-links-section'>
                <div>
                    <a href="https://mars.nasa.gov/mars2020/" className="rover-links" target="_blank" rel="noreferrer">
                        <div>
                            <h5>Perseverance</h5>
                            <p>Landed: Feb 18, 2021</p>
                        </div>
                        <FontAwesomeIcon icon={faArrowCircleRight} />
                    </a>
                </div>
                <div>
                    <a href="https://mars.nasa.gov/msl/" className="rover-links" target="_blank" rel="noreferrer">
                        <div>
                            <h5>Curiosity</h5>
                            <p>Landed: Aug 6, 2012</p>
                        </div>
                        <FontAwesomeIcon icon={faArrowCircleRight} />
                    </a>
                </div>
                <div>
                    <a href="https://mars.nasa.gov/mer/" className="rover-links" target="_blank" rel="noreferrer">
                        <div>
                            <h5>Opportunity</h5>
                            <p>Landed: Jan 25, 2004</p>
                        </div>
                        <FontAwesomeIcon icon={faArrowCircleRight} />
                    </a>
                </div>
                <div>
                    <a href="https://en.wikipedia.org/wiki/Spirit_(rover)" className="rover-links" target="_blank" rel="noreferrer">
                        <div>
                            <h5>Spirit</h5>
                            <p>Landed: Jan 4, 2004</p>
                        </div>
                        <FontAwesomeIcon icon={faArrowCircleRight} />
                    </a>
                </div>
                <div>
                    <a href="https://mars.nasa.gov/MPF/" className="rover-links" target="_blank" rel="noreferrer">
                        <div>
                            <h5>Sojourner</h5>
                            <p>Landed: July 4, 1997</p>
                        </div>
                        <FontAwesomeIcon icon={faArrowCircleRight} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Jumbotron;