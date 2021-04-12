import React, { useState, useEffect } from 'react'
import {Card, Button, ListGroup} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import './Album.scss'
import { spotperApi } from '../../../services/api'
import { Link, useParams } from 'react-router-dom'
import ChoosePlaylistModal from './ChoosePlaylistModal/ChoosePlaylistModal'

const Album = () => {
  const selectedAlbum = useSelector(state => state.selectedAlbum)
  const [trackToAddToPlaylist, setTrackToAddToPlaylist] = useState({})
  const [albumTracks, setAlbumTracks] = useState([])
  const [areTracksRequested, setTracksRequested] = useState(false)
  const [isAlbumRequested, setAlbumRequested] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch()
  const { albumId } = useParams();

  useEffect(() => {

    const requestGetAlbumById = async() => {
  
      await spotperApi.get("/albums/".concat(albumId)).then(response => {
          if(response.status === 200) {
            dispatch({type: 'set', selectedAlbum: response.data})
            setAlbumRequested(true)
          }})
    }
    const requestGetAlbumTracks = async() => {
  
      await spotperApi.get("/albums/".concat(albumId).concat("/tracks")).then(response => {
          if(response.status === 200) {
            setAlbumTracks(response.data)
            setTracksRequested(true)
          }})
    }
    requestGetAlbumById()
    requestGetAlbumTracks()
           
  }, [])

  const onTrackClick = (track) => {
    dispatch({type: 'set', selectedTrack: track})
    dispatch({type: 'set', lastVisitedPath: "/albums/".concat(selectedAlbum.id)})
  }

  const onAddToPlaylistClick = (track) => {
    setTrackToAddToPlaylist(track)
    setShowModal(true)
  }
  
  return (
    <>
    {isAlbumRequested?
    <>
    <ChoosePlaylistModal
      show = {showModal}
      handleClose = {() => setShowModal(false)}
      track= {trackToAddToPlaylist}
    />
    <h1>
      <Link to="/albums">
        <svg xmlns="http://www.w3.org/2000/svg" width="28"  fill="currentColor" className="return-btn bi bi-arrow-left-circle" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
        </svg>
      </Link>
      {selectedAlbum.albumName}
    </h1>
    <div className="album-flex-container">
      <img src={selectedAlbum.albumCover} className="album-cover"></img>
      {areTracksRequested?<ListGroup variant="flush">
        {albumTracks.map(track => (
          <ListGroup.Item className="flex-container">
            <Link className="track" to={"/track/".concat(track.id)} onClick={onTrackClick(track)}>{track.trackName}</Link>
            <Button variant="success" size="sm" onClick={()=>onAddToPlaylistClick(track)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" class="bi bi-bookmark-plus" viewBox="0 0 16 16">
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"/>
              </svg>
            </Button>
            
          </ListGroup.Item>
        ))}
      </ListGroup>:null}
    </div>
    </>
    :null}
  </>
  )
}

export default Album
