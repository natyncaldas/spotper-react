import React, { useState, useEffect } from 'react'
import {Card} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import './Track.scss'

const Track = () => {
    const selectedTrack = useSelector(state => state.selectedTrack)
    const lastVisitedPath = useSelector(state => state.lastVisitedPath)
  
  return (
    <>
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
        
  </>
  )
}

export default Track
