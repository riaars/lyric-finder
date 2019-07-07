import React, {Component} from 'react';
import Axios from 'axios';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
  };
  componentDidMount() {
    Axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
        this.props.match.params.id
      }&apikey=a4fc708b46a21f31aae3eed7eee0f135`
    )
      .then(res => {
        console.log(res.data);
        this.setState({lyrics: res.data.message.body.lyrics});

        return Axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${
            this.props.match.params.id
          }&apikey=a4fc708b46a21f31aae3eed7eee0f135`
        )
          .then(res => {
            console.log(res.data);
            this.setState({track: res.data.message.body.track});
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
  render() {
    const {track, lyrics} = this.state;
    console.log(track);
    console.log(track.updated_time);
    if (
      track == undefined ||
      lyrics == undefined ||
      (track === Object.keys(track).length) === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4 black">
            Go Back
            <div className="card">
              <h5 className="card-header" style={{color: '#000000'}}>
                {track.track_name} by {''}
                <span className="text-secondary"> {track.artist_name}</span>
              </h5>
              <div className="card-body">
                <p className="card-text" style={{color: '#000000'}}>
                  {lyrics.lyrics_body}
                </p>
              </div>
              <ul className="list-group mt-3" style={{color: '#000000'}}>
                <li className="list-group-item">
                  <strong>Album ID</strong>:{track.album_id}
                </li>
                <li className="list-group-item">
                  <strong>Song Genre</strong>:{' '}
                  {/* {track.primary_genres.music_genre_list[0]} */}
                </li>
                <li className="list-group-item">
                  <strong> Explicit Words</strong>:
                  {track.explicit === 0 ? 'No' : 'Yes'}
                </li>

                <li className="list-group-item">
                  <strong>Release Date</strong>:
                  <Moment format="MM/DD/YYYY">{track.updated_time}</Moment>
                </li>
              </ul>
            </div>
          </Link>
        </React.Fragment>
      );
    }
  }
}

export default Lyrics;
