import React, { useState, useEffect } from 'react'
import {Card} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import './Album.scss'
import { spotperApi } from '../../../services/api'
import { Link } from 'react-router-dom'

const Album = () => {
  const selectedAlbum = useSelector(state => state.selectedAlbum)
  const [albumTracks, setAlbumTracks] = useState([])
  const [areTracksRequested, setTracksRequested] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {

    const requestGetAlbumTracks = async() => {
      let params = {params:{albumId:selectedAlbum.id}}
  
      await spotperApi.get("/tracks", params).then(response => {
          if(response.status === 200) {
            setAlbumTracks(response.data)
            setTracksRequested(true)
          }})
    }
    requestGetAlbumTracks()
           
  }, [])

  const onTrackClick = (track) => {
    dispatch({type: 'set', selectedTrack: track})
    dispatch({type: 'set', lastVisitedPath: "/album"})
  }
  
  return (
    <>
    <h1>{selectedAlbum.albumName}</h1>
    <Link to="/albums" className="btn btn-primary">Return to Albums</Link>
    <div className="album-flex-container">
      <img src={selectedAlbum.albumCover} className="album-cover"></img>
      {areTracksRequested?<ol>
        {albumTracks.map(track => (
          <li className="track">
            <Link to="/track" onClick={onTrackClick(track)}>{track.trackName}</Link>
          </li>
        ))}
      </ol>:null}
  
    </div>
  </>
  )
}

export default Album
