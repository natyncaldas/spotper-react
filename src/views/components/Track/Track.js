import React, { useState, useEffect } from 'react'
import {Card, Button} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { spotperApi } from '../../../services/api'
import './Track.scss'

const Track = () => {
    const [isTrackRequested, setTrackRequested] = useState(false)
    const selectedTrack = useSelector(state => state.selectedTrack)
    const lastVisitedPath = useSelector(state => state.lastVisitedPath)
    const { trackId } = useParams();
    const dispatch = useDispatch()

    useEffect(() => {

        const requestGetTrackById = async() => {
      
          await spotperApi.get("/tracks/".concat(trackId)).then(response => {
              if(response.status === 200) {
                dispatch({type: 'set', selectedTrack: response.data})
                setTrackRequested(true)
              }})
        }
      
        requestGetTrackById()
               
        }, [])

    const requestPutTrackById = async(playCount, lastPlayed) => {
      let track = {    
        "trackName": selectedTrack.trackName,
        "trackDuration": selectedTrack.trackDuration,
        "trackDescription": selectedTrack.trackDescription,
        "recordingType": selectedTrack.recordingType,
        "trackNumber": selectedTrack.trackNumber,
        "playCount": playCount,
        "lastPlayed": lastPlayed,
        "album":{"id":selectedTrack.album.id},
        "composition":{"id":selectedTrack.composition.id}
      }
      await spotperApi.put("/tracks/".concat(trackId), track).then(response => {
          if(response.status === 200) {
            dispatch({type: 'set', selectedTrack: response.data})
          }})
    }
    
    const onPlayClick = () => {
      let playCount = selectedTrack.playCount + 1
      let lastPlayed = new Date()

      requestPutTrackById(playCount, lastPlayed)
    }
  
  return (
    <>
       {isTrackRequested?<>
        <Link to={lastVisitedPath} className="btn btn-primary">Return</Link>
        <div className="track-flex-container">
        <Card style={{ width: '22rem' }} className="track-card" >
            <Card.Img variant="top" src={selectedTrack.album.albumCover}  className="album-image"/>
            <Card.Body>
                <Card.Title>{selectedTrack.trackName}</Card.Title>
                <Card.Title>{selectedTrack.album.albumName}</Card.Title>
                <Card.Text>{selectedTrack.trackDuration}</Card.Text>
                <Button variant="success" size="sm" onClick={onPlayClick}>Play</Button>
            </Card.Body>
        </Card>
        </div>
        </>:null}
  </>
  )
}

export default Track
