import React, { useState, useEffect } from 'react'
import {Card} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import './Album.scss'
import { spotperApi } from '../../../services/api'

const Album = () => {
  const selectedAlbum = useSelector(state => state.selectedAlbum)
  const [albumTracks, setAlbumTracks] = useState([])
  const [areTracksRequested, setTracksRequested] = useState(false)

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
  
  return (
    <>
    <h1>{selectedAlbum.albumName}</h1>
    <div className="album-flex-container">
      <img src={selectedAlbum.albumCover} className="album-cover"></img>
      {areTracksRequested?<ol>
        {albumTracks.map(track => (
          <li className="track">{track.trackName}</li>
        ))}
      </ol>:null}
  
    </div>
  </>
  )
}

export default Album
