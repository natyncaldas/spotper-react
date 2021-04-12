import {createStore} from 'redux'

const initialState = {
  //stateName: stateValue
  lastVisitedPath: "/",
  albums: [],
  playlists: [],
  tracks: [],
  selectedAlbum: { 
    "albumDescription": "",
    "purchasePrice": null,
    "purchaseDate": null,
    "purchaseType": "",
    "recordingDate": null,
    "albumName": "",
    "albumCover": ""
  },
  selectedPlaylist:{
    "id":null,
    "playlistName":"",
    "totalDuration":0
  },
  selectedTrack: {
    "trackName": "",
    "trackDuration": null,
    "trackDescription": "",
    "recordingType": "",
    "trackNumber": null,
    "album":{"id":null, "albumCover": ""},
    "composition":{"id":null}
  } 
}

const changeState = (state = initialState, {type, ...rest}) => {
  switch (type) {
    case 'set':
      return {...state, ...rest}
    default:
      return state
  }
}

//========for later usage on components========
/*
import {useDispatch, useSelector} from 'react-redux'

  const dispatch = useDispatch()
  const stateName = useSelector(state => state.stateName)

  const functionName = () => {
    let newStateValue = ""
    //(...)
    dispatch({type: 'set', stateName: newStateValue})
  }

*/ 

const store = createStore(changeState)
export default store
