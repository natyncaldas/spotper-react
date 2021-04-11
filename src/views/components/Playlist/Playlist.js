import React, {useState, useEffect} from 'react'
import {Card, Button, ListGroup} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { spotperApi } from '../../../services/api'
import './Playlist.scss'

const Playlist = () => {
  const selectedPlaylist = useSelector(state => state.selectedPlaylist)
  const [playlistTracks, setPlaylistTracks] = useState([])
  const [areTracksRequested, setTracksRequested] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {

    const requestGetPlaylistTracks = async() => {
  
        await spotperApi.get("/playlists/".concat(selectedPlaylist.id).concat("/tracks")).then(response => {
            if(response.status === 200) {
                setPlaylistTracks(response.data)
                setTracksRequested(true)
            }})
    }
  
    requestGetPlaylistTracks()
           
    }, [])

    const onTrackClick = (track) => {
        dispatch({type: 'set', selectedTrack: track})
        dispatch({type: 'set', lastVisitedPath: "/playlist"})
    }

    return (
        <>
        <h1>{selectedPlaylist.playlistName}</h1>
        <Link to="/playlists" className="btn btn-primary">Return to Playlists</Link>
        
        {areTracksRequested?
            <ListGroup className="playlists-list">
                {playlistTracks.map(track => (
                    <>
                    <ListGroup.Item className="track-title">
                        <Link to="/track" onClick={onTrackClick(track)}>
                            {track.trackName}
                        </Link>
                    </ListGroup.Item>
                    </>
                ))}
        
            </ListGroup>:null}
    </>
    )
}

export default Playlist