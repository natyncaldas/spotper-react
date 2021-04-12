import React, { useState, useEffect } from 'react'
import {Card, Button, ProgressBar} from 'react-bootstrap'
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

    const formatDurationTime = (time) =>{
      var minutes = Math.floor(time)
      var seconds = Math.round((time-minutes)*60)
      return "".concat(minutes).concat(":").concat(seconds)
    }
  
  return (
    <>
       {isTrackRequested?<>
        <h1>
          <Link to={lastVisitedPath} className="return-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="28"  fill="currentColor" className="return-btn bi bi-arrow-left-circle" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
            </svg>
          </Link>
        </h1>
        
        <div className="track-flex-container">
        <Card style={{ width: '23rem' }} className="track-card" >
            <Card.Img variant="top" src={selectedTrack.album.albumCover}  className="album-image"/>
            <Card.Body>
                <Card.Title>{selectedTrack.trackName}</Card.Title>
                <Card.Title>{selectedTrack.album.albumName}</Card.Title>
                <Card.Text>{formatDurationTime(selectedTrack.trackDuration)}</Card.Text>
                <ProgressBar now={30} variant="success" />
                <div className="btns-flex-container">
                  <h1 className="track-btns">
                    <svg className="track-btn" xmlns="http://www.w3.org/2000/svg" width="45" fill="currentColor" class="bi bi-skip-backward-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M11.729 5.055a.5.5 0 0 0-.52.038L8.5 7.028V5.5a.5.5 0 0 0-.79-.407L5 7.028V5.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0V8.972l2.71 1.935a.5.5 0 0 0 .79-.407V8.972l2.71 1.935A.5.5 0 0 0 12 10.5v-5a.5.5 0 0 0-.271-.445z"/>
                    </svg>
                  </h1>
                  <h1 className="track-btns">
                    <svg className="track-btn" onClick={onPlayClick} xmlns="http://www.w3.org/2000/svg" width="45" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                    </svg>
                  </h1>
                  <h1 className="track-btns">
                    <svg  xmlns="http://www.w3.org/2000/svg" width="45" fill="currentColor" class="bi bi-skip-forward-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M4.271 5.055a.5.5 0 0 1 .52.038L7.5 7.028V5.5a.5.5 0 0 1 .79-.407L11 7.028V5.5a.5.5 0 0 1 1 0v5a.5.5 0 0 1-1 0V8.972l-2.71 1.935a.5.5 0 0 1-.79-.407V8.972l-2.71 1.935A.5.5 0 0 1 4 10.5v-5a.5.5 0 0 1 .271-.445z"/>
                    </svg>
                  </h1>
                  
                </div>
                
            </Card.Body>
        </Card>
        </div>
        </>:null}
  </>
  )
}

export default Track
