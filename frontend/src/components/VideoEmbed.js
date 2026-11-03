import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

// Shows a thumbnail first and only loads the YouTube player when clicked,
// which keeps YouTube's large scripts off the initial page load.
const VideoEmbed = ({ videoId, title }) => {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="video-embed">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button className="video-embed video-embed--poster" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
      <img src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="" loading="lazy" />
      <span className="video-play">
        <FontAwesomeIcon icon={faPlay} />
      </span>
    </button>
  );
};

export default VideoEmbed;
