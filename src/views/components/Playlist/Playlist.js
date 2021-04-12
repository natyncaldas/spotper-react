import React, {useState, useEffect} from 'react'
import {Card, Button, ListGroup} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { spotperApi } from '../../../services/api'
import ChooseTrackModal from './ChooseTrackModal/ChooseTrackModal'
import './Playlist.scss'

const Playlist = () => {
  const selectedPlaylist = useSelector(state => state.selectedPlaylist)
  const [playlistTracks, setPlaylistTracks] = useState([])
  const [isPlaylistRequested, setPlaylistRequested] = useState(false)
  const [areTracksRequested, setTracksRequested] = useState(false)
  const [showModal, setShowModal] = useState(false);
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

        if(!areTracksRequested){   
            requestGetPlaylistTracks()
        }
    }, [areTracksRequested])

    const onTrackClick = (track) => {
        dispatch({type: 'set', selectedTrack: track})
        dispatch({type: 'set', lastVisitedPath: "/playlists/".concat(playlistId)})
    }

    const requestDeleteTrackFromPlaylist = async(trackId) =>{
        let params = {params:{"trackId":trackId, "playlistId":playlistId}}
        await spotperApi.delete("/tracks/playlists", params).then(response => {
            if(response.status === 200) {
                setTracksRequested(false)
            }})
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setTracksRequested(false)
    }

    return (
        <>
        {isPlaylistRequested?<>
        <ChooseTrackModal
            show = {showModal}
            handleClose = {handleCloseModal}
            playlist = {selectedPlaylist}
        />
        <h1>{selectedPlaylist.playlistName}</h1>
        <Link to="/playlists" className="btn btn-primary">Return to Playlists</Link>
        <Button variant="success" onClick={() => setShowModal(true)}>Add song</Button>
        {areTracksRequested?
            <ListGroup className="playlists-list">
                {playlistTracks.map(track => (
                    <>
                    <ListGroup.Item className="track-title">
                        <Link to={"/track/".concat(track.id)} onClick={onTrackClick(track)}>
                            {track.trackName}
                        </Link>
                        <p>{track.playCount} {track.lastPlayed}</p>
                        <Button variant="danger" size="sm" onClick={()=>requestDeleteTrackFromPlaylist(track.id)}>
                            Delete
                        </Button>
                    </ListGroup.Item>
                    </>
                ))}
        
            </ListGroup>:null}
        </>:null}
        </>
    )
}

export default Playlist