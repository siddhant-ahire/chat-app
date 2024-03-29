import React, { memo } from 'react'
import { Button, Modal } from 'rsuite'
import { useCurrentRoom } from '../../../context/create-room.context'
import { useModalState } from '../../../misc/custom-hooks'

const RoomInfoBtnModal = () => {

    const {isOpen, open, close} = useModalState()
    const name = useCurrentRoom(v => v.name);
    const description = useCurrentRoom(v => v.description);
    return (
        <>
            <Button appearance = "link" className="px-0" onClick={open}>Room Information</Button>
            <Modal show={isOpen} onHide={close}>
                <Modal.Header>
                    <Modal.Title>About {name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6>description</h6>
                    <p>{description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button block onClick={close}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default memo(RoomInfoBtnModal)
