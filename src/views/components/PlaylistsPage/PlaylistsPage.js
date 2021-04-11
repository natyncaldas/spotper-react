import React, {useState, useEffect} from 'react'
import {Card, Button, ListGroup} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { spotperApi } from '../../../services/api'
import './PlaylistsPage.scss'

const PlaylistsPage = () => {
  const [arePlaylistsRequested, setPlaylistsRequested] = useState(false)
  const dispatch = useDispatch()
  const playlists = useSelector(state => state.playlists)

  useEffect(() => {

  const requestGetPlaylists = async() => {

    await spotperApi.get("/playlists").then(response => {
        if(response.status === 200) {
          dispatch({type: 'set', playlists: response.data})
          setPlaylistsRequested(true)
        }})
  }

  requestGetPlaylists()
         
  }, [])

  return (
    <>
    <h1>Playlists</h1>
    
      <ListGroup className="playlists-list">
      {arePlaylistsRequested? playlists.map(playlist => (
        <>
        <ListGroup.Item className="playlist-title">
          <Link to="/playlist" onClick={() => dispatch({type: 'set', selectedPlaylist: playlist})}>
            {playlist.playlistName.concat(" ").concat(playlist.totalDuration)}
          </Link>
        </ListGroup.Item>
        </>
      ))
      :null}
      </ListGroup>
   </>
  )
}

export default PlaylistsPage