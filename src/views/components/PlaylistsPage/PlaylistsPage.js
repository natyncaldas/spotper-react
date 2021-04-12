import React, {useState, useEffect} from 'react'
import {Card, Button, ListGroup, Modal} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { spotperApi } from '../../../services/api'
import NewPlaylistModal from './NewPlaylistModal/NewPlaylistModal' 
import './PlaylistsPage.scss'

const PlaylistsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [arePlaylistsRequested, setPlaylistsRequested] = useState(false)
  const dispatch = useDispatch()
  const playlists = useSelector(state => state.playlists)

  useEffect(() => {
    if(!arePlaylistsRequested){
      const requestGetPlaylists = async() => {

        await spotperApi.get("/playlists").then(response => {
            if(response.status === 200) {
              dispatch({type: 'set', playlists: response.data})
              setPlaylistsRequested(true)
            }})
      }
      requestGetPlaylists()
    }        
  }, [arePlaylistsRequested])

  const requestDeletePlaylist = async(playlistId) => {

    await spotperApi.delete("/playlists/".concat(playlistId)).then(response => {
      if(response.status === 200) {
        setPlaylistsRequested(false)
      }})
   
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setPlaylistsRequested(false)
  }

  return (
    <>
    <NewPlaylistModal
      show = {showModal}
      handleClose = {handleCloseModal}
    />
    <h1>Playlists</h1>
    <Button variant="success" onClick={() => setShowModal(true)}>New Playlist</Button>
      <ListGroup className="playlists-list">
      {arePlaylistsRequested? playlists.map(playlist => (
        <>
        <ListGroup.Item className="playlist-title">
          <Link to={"/playlists/".concat(playlist.id)} onClick={() => dispatch({type: 'set', selectedPlaylist: playlist})}>
            {playlist.playlistName.concat(" ").concat(playlist.totalDuration)}
          </Link>
          <Button variant="danger" size="sm" onClick={()=>requestDeletePlaylist(playlist.id)}>
            Delete
          </Button>
        </ListGroup.Item>
        </>
      ))
      :null}
      </ListGroup>
   </>
  )
}

export default PlaylistsPage