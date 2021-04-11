import React, { useState, useEffect } from 'react'
import {Card} from 'react-bootstrap'
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
            </Card.Body>
        </Card>
        </div>
        </>:null}
  </>
  )
}

export default Track
