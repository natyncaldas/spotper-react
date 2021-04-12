import React, { useState, useEffect } from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { spotperApi } from '../../../../services/api'
import './ChoosePlaylistModal.scss'

const ChoosePlaylistModal = (props) => {
    const dispatch = useDispatch()
    const [arePlaylistsRequested, setPlaylistsRequested] = useState(false)
    const [chosenPlaylist, setChosenPlaylist] = useState()
    const playlists = useSelector(state => state.playlists)

   
    useEffect(() => {
        if(props.show){
          const requestGetPlaylists = async() => {
    
            await spotperApi.get("/playlists").then(response => {
                if(response.status === 200) {
                  dispatch({type: 'set', playlists: response.data})
                  setPlaylistsRequested(true)
                  //alert(playlists[0].playlistName)
                }})
          }
          requestGetPlaylists()
        }        
      }, [props.show])
        
    

    const requestPostTrackOnPlaylist = async(playlistId) => {

        let trackPlaylist = {
            "id": {},
            "track": {"id":props.track.id},
            "playlist":{"id":playlistId}
        }

        await spotperApi.post("/tracks/playlists", trackPlaylist).then(response => {
            if(response.status === 200) {
              //dispatch({type: 'set', selectedPlaylist: response.data})
            }})
      }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        requestPostTrackOnPlaylist(chosenPlaylist)
        alert(props.track.id)
        const timeout = setTimeout(() => {
            props.handleClose()
          }, 800);
        
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
                            Add track to playlist
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
