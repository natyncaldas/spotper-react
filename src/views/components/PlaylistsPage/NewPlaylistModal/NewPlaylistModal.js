import React, { useState } from 'react'
import {Button, Modal, Form, Spinner} from 'react-bootstrap'
import { spotperApi } from '../../../../services/api'
import './NewPlaylistModal.scss'

const NewPlaylistModal = (props) => {
    const [playlistName, setPlaylistName] = useState("")
    const [isLoading, setLoading] = useState(false)

    const requestPostPlaylist = async() => {

        let playlist = {
            "playlistName":playlistName
        }

        await spotperApi.post("/playlists", playlist).then(response => {
            if(response.status === 200) {
              setPlaylistName("")
            }})
      }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        requestPostPlaylist()
        setLoading(true)
        const timeout = setTimeout(() => {
            setLoading(false)
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
              <Modal.Title>Create a new playlist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmitHandler}>
                    <Form.Group>
                        <Form.Label>Playlist name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={playlistName} onChange={e => setPlaylistName(e.target.value)}/>
                        <Form.Text className="text-muted">
                        Enter a name for your new playlist.
                        </Form.Text>
                        <Button variant="success" type="submit">
                          {isLoading?<Spinner animation="border" size="sm"/>:"Create playlist"}
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

export default NewPlaylistModal
