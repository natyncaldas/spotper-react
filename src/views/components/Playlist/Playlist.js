import React, {useState, useEffect} from 'react'
import {Card, Button, ListGroup} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { spotperApi } from '../../../services/api'
import './Playlist.scss'

const Playlist = () => {
  const selectedPlaylist = useSelector(state => state.selectedPlaylist)
  const [playlistTracks, setPlaylistTracks] = useState([])
  const [isPlaylistRequested, setPlaylistRequested] = useState(false)
  const [areTracksRequested, setTracksRequested] = useState(false)
  const dispatch = useDispatch()
  const { playlistId } = useParams();

  useEffect(() => {

    const requestGetPlaylistById = async() => {
  
        await spotperApi.get("/playlists/".concat(playlistId)).then(response => {
            if(response.status === 200) {
                dispatch({type: 'set', selectedPlaylist: response.data})
                setPlaylistRequested(true)
            }})
    }

    const requestGetPlaylistTracks = async() => {
  
        await spotperApi.get("/playlists/".concat(playlistId).concat("/tracks")).then(response => {
            if(response.status === 200) {
                setPlaylistTracks(response.data)
                setTracksRequested(true)
            }})
    }
    
    requestGetPlaylistById()
    requestGetPlaylistTracks()
           
    }, [])

    const onTrackClick = (track) => {
        dispatch({type: 'set', selectedTrack: track})
        dispatch({type: 'set', lastVisitedPath: "/playlists/".concat(playlistId)})
    }

    return (
        <>
        {isPlaylistRequested?<>
        <h1>{selectedPlaylist.playlistName}</h1>
        <Link to="/playlists" className="btn btn-primary">Return to Playlists</Link>
        
        {areTracksRequested?
            <ListGroup className="playlists-list">
                {playlistTracks.map(track => (
                    <>
                    <ListGroup.Item className="track-title">
                        <Link to={"/track/".concat(track.id)} onClick={onTrackClick(track)}>
                            {track.trackName}
                        </Link>
                    </ListGroup.Item>
                    </>
                ))}
        
            </ListGroup>:null}
        </>:null}
        </>
    )
}

export default Playlist