import React, {Component} from 'react';
import Axios from 'axios';

const Context = React.createContext();
require('dotenv').config();
const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_TRACKS':
      return {
        ...state,
        track_list: action.payload,
        heading: 'Search Results',
      };
    default:
      return state;
  }
};
export class Provider extends Component {
  state = {
    track_list: [],
    heading: 'Top 10 Tracks',
    dispatch: action => this.setState(state => reducer(state, action)),
  };
  componentDidMount() {
    Axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=a4fc708b46a21f31aae3eed7eee0f135`
    )
      .then(res => {
        // console.log(res.data);
        this.setState({track_list: res.data.message.body.track_list});
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
