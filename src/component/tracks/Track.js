import React from 'react';
import {Link} from 'react-router-dom';

const Track = props => {
  const {track} = props;
  return (
    <div className="col-md-6">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5>{track.artist_name}</h5>
          <p className="card-text">
            <strong>
              {' '}
              <i className="fas fa-play" />
              {track.track_name}
            </strong>
            <br />
            {track.album_name}
          </p>
          <Link
            to={`lyrics/track/${track.track_id}`}
            className="btn btn-outline-success btn-block">
            View Lyrics
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Track;
