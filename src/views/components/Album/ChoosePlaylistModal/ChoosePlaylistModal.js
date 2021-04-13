import React, { useState, useEffect } from 'react'
import {Alert, Button, Modal, Form, Spinner} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { spotperApi } from '../../../../services/api'
import './ChoosePlaylistModal.scss'

const ChoosePlaylistModal = (props) => {
    const [arePlaylistsRequested, setPlaylistsRequested] = useState(false)
    const [chosenPlaylist, setChosenPlaylist] = useState()
    const [showWarningAlert, setShowWarningAlert] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const playlists = useSelector(state => state.playlists)
    const dispatch = useDispatch()

   
    useEffect(() => {
        if(props.show){
          const requestGetPlaylists = async() => {
    
            await spotperApi.get("/playlists").then(response => {
                if(response.status === 200) {
                  dispatch({type: 'set', playlists: response.data})
                  setPlaylistsRequested(true)
                }})
          }
          requestGetPlaylists()
        }        
      }, [props.show, dispatch])
        
    

    const requestPostTrackOnPlaylist = async(playlistId) => {

        let trackPlaylist = {
            "id": {},
            "track": {"id":props.track.id},
            "playlist":{"id":playlistId}
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
        requestPostTrackOnPlaylist(chosenPlaylist)
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
              <Modal.Title>Choose a playlist</Modal.Title>
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
                        <Form.Label>User Playlists</Form.Label>
                        <Form.Control as="select" multiple>
                            {arePlaylistsRequested?playlists.map(playlist=>(
                                <option onClick={() => setChosenPlaylist(playlist.id)}>{playlist.playlistName}</option>
                            ))
                            :null}
                        </Form.Control>
                        <Form.Text className="text-muted">
                        Choose the playlist in which you would like to add the selected track
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

export default ChoosePlaylistModal
