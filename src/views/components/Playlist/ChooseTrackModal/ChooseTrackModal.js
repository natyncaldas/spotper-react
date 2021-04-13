import React, { useState, useEffect } from 'react'
import {Alert, Button, Modal, Form, Spinner} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { spotperApi } from '../../../../services/api'
import './ChooseTrackModal.scss'

const ChooseTrackModal = (props) => {
    const [areTracksRequested, setTracksRequested] = useState(false)
    const [chosenTrack, setChosenTrack] = useState()
    const [showWarningAlert, setShowWarningAlert] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const tracks = useSelector(state => state.tracks)
    const dispatch = useDispatch()

   
    useEffect(() => {
        if(props.show){
          const requestGetAllTracks = async() => {
    
            await spotperApi.get("/tracks").then(response => {
                if(response.status === 200) {
                  dispatch({type: 'set', tracks: response.data})
                  setTracksRequested(true)
                }})
          }
          requestGetAllTracks()
        }        
      }, [props.show, dispatch])
        
    

    const requestPostTrackOnPlaylist = async(trackId) => {

        let trackPlaylist = {
            "id": {},
            "track": {"id":trackId},
            "playlist":{"id":props.playlist.id}
        }

        await spotperApi.post("/tracks/playlists", trackPlaylist).then(response => {
            if(response.status === 200) {
              setShowSuccessAlert(true)
            }}).catch(error => {
              setShowWarningAlert(true)
            })
      }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        requestPostTrackOnPlaylist(chosenTrack)
        setLoading(true)
        const timeout = setTimeout(() => {
            setShowSuccessAlert(false)
            setShowWarningAlert(false)
            setLoading(false)
            props.handleClose()
          }, 1500);
        
        return() => {
            clearTimeout(timeout)
        }
        
    }
  
    return (
        <>
         
          <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Choose a song</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
            {showSuccessAlert?<Alert  variant="success">
              Song added successfully
            </Alert>:null}
            {showWarningAlert?<Alert  variant="warning">
              The selected song is already in the playlist
            </Alert>:null}
                <Form onSubmit={onSubmitHandler}>
                    <Form.Group>
                        <Form.Label>Tracks on SpotPer</Form.Label>
                        <Form.Control as="select" multiple>
                            {areTracksRequested?tracks.map(track=>(
                                <option onClick={() => setChosenTrack(track.id)}>{track.trackName}</option>
                            ))
                            :null}
                        </Form.Control>
                        <Form.Text className="text-muted">
                            Choose the song in which you would like to add the current playlist
                        </Form.Text>
                        <Button variant="success" type="submit">
                        {isLoading?<Spinner animation="border" size="sm"/>:
                            "Add track to playlist"}
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default ChooseTrackModal
