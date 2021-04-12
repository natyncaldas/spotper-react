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
        <h1>
            <Link to="/playlists">
                <svg xmlns="http://www.w3.org/2000/svg" width="28"  fill="currentColor" className="return-btn bi bi-arrow-left-circle" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                </svg>
            </Link>
            {selectedPlaylist.playlistName}
        </h1>
        
        <Button variant="success" onClick={() => setShowModal(true)}>
        <span className="add-icon">
          <svg  xmlns="http://www.w3.org/2000/svg" width="16" fill="currentColor" class="bi bi-plus-circle-dotted" viewBox="0 0 16 16">
            <path d="M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0zM6.44.152c-.346.069-.684.16-1.012.27l.321.948c.287-.098.582-.177.884-.237L6.44.153zm4.132.271a7.946 7.946 0 0 0-1.011-.27l-.194.98c.302.06.597.14.884.237l.321-.947zm1.873.925a8 8 0 0 0-.906-.524l-.443.896c.275.136.54.29.793.459l.556-.831zM4.46.824c-.314.155-.616.33-.905.524l.556.83a7.07 7.07 0 0 1 .793-.458L4.46.824zM2.725 1.985c-.262.23-.51.478-.74.74l.752.66c.202-.23.418-.446.648-.648l-.66-.752zm11.29.74a8.058 8.058 0 0 0-.74-.74l-.66.752c.23.202.447.418.648.648l.752-.66zm1.161 1.735a7.98 7.98 0 0 0-.524-.905l-.83.556c.169.253.322.518.458.793l.896-.443zM1.348 3.555c-.194.289-.37.591-.524.906l.896.443c.136-.275.29-.54.459-.793l-.831-.556zM.423 5.428a7.945 7.945 0 0 0-.27 1.011l.98.194c.06-.302.14-.597.237-.884l-.947-.321zM15.848 6.44a7.943 7.943 0 0 0-.27-1.012l-.948.321c.098.287.177.582.237.884l.98-.194zM.017 7.477a8.113 8.113 0 0 0 0 1.046l.998-.064a7.117 7.117 0 0 1 0-.918l-.998-.064zM16 8a8.1 8.1 0 0 0-.017-.523l-.998.064a7.11 7.11 0 0 1 0 .918l.998.064A8.1 8.1 0 0 0 16 8zM.152 9.56c.069.346.16.684.27 1.012l.948-.321a6.944 6.944 0 0 1-.237-.884l-.98.194zm15.425 1.012c.112-.328.202-.666.27-1.011l-.98-.194c-.06.302-.14.597-.237.884l.947.321zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a6.999 6.999 0 0 1-.458-.793l-.896.443zm13.828.905c.194-.289.37-.591.524-.906l-.896-.443c-.136.275-.29.54-.459.793l.831.556zm-12.667.83c.23.262.478.51.74.74l.66-.752a7.047 7.047 0 0 1-.648-.648l-.752.66zm11.29.74c.262-.23.51-.478.74-.74l-.752-.66c-.201.23-.418.447-.648.648l.66.752zm-1.735 1.161c.314-.155.616-.33.905-.524l-.556-.83a7.07 7.07 0 0 1-.793.458l.443.896zm-7.985-.524c.289.194.591.37.906.524l.443-.896a6.998 6.998 0 0 1-.793-.459l-.556.831zm1.873.925c.328.112.666.202 1.011.27l.194-.98a6.953 6.953 0 0 1-.884-.237l-.321.947zm4.132.271a7.944 7.944 0 0 0 1.012-.27l-.321-.948a6.954 6.954 0 0 1-.884.237l.194.98zm-2.083.135a8.1 8.1 0 0 0 1.046 0l-.064-.998a7.11 7.11 0 0 1-.918 0l-.064.998zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
          </svg>
        </span>
            Add song
        </Button>
        {areTracksRequested?
            <ListGroup className="playlist-tracks">
                {playlistTracks.map(track => (
                    <>
                    <ListGroup.Item  className="track-items">
                        <Link className="track-title" to={"/track/".concat(track.id)} onClick={onTrackClick(track)}>
                            {track.trackName}
                        </Link>
                        <p className="track-info">Played a total of {track.playCount} times</p>
                        <p className="track-info">Last played on {track.lastPlayed.substr(0,10)}</p>
                        <Button variant="danger" size="sm" onClick={()=>requestDeleteTrackFromPlaylist(track.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="currentColor" class="bi bi-bookmark-x" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6.146 5.146a.5.5 0 0 1 .708 0L8 6.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 7l1.147 1.146a.5.5 0 0 1-.708.708L8 7.707 6.854 8.854a.5.5 0 1 1-.708-.708L7.293 7 6.146 5.854a.5.5 0 0 1 0-.708z"/>
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                        </svg>
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