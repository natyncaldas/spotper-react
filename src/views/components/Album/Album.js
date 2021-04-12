import React, { useState, useEffect } from 'react'
import {Card, Button} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import './Album.scss'
import { spotperApi } from '../../../services/api'
import { Link, useParams } from 'react-router-dom'
import ChoosePlaylistModal from './ChoosePlaylistModal/ChoosePlaylistModal'

const Album = () => {
  const selectedAlbum = useSelector(state => state.selectedAlbum)
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
  
  return (
    <>
    {isAlbumRequested?
    <>
    <h1>{selectedAlbum.albumName}</h1>
    <Link to="/albums" className="btn btn-primary">Return to Albums</Link>
    <div className="album-flex-container">
      <img src={selectedAlbum.albumCover} className="album-cover"></img>
      {areTracksRequested?<ol>
        {albumTracks.map(track => (
          <li className="track">
            <Link to={"/track/".concat(track.id)} onClick={onTrackClick(track)}>{track.trackName}</Link>
            <Button variant="success" size="sm" onClick={() => setShowModal(true)}>
              Add to playlist
            </Button>
            <ChoosePlaylistModal
              show = {showModal}
              handleClose = {() => setShowModal(false)}
              track= {track}
            />
          </li>
        ))}
      </ol>:null}
    </div>
    </>
    :null}
  </>
  )
}

export default Album
