import React from 'react'
import { useParams } from 'react-router';
import { Alert, Button, Drawer } from 'rsuite';
import { useCurrentRoom } from '../../../context/create-room.context';
import { useMediaQuery, useModalState } from '../../../misc/custom-hooks'
import { database } from '../../../misc/firebase';
import EditableInput from '../../EditableInput';

const EditRoomBtnDrawer = () => {

    const {isOpen, open, close} = useModalState();
    const name = useCurrentRoom(v => v.name);
    const descritption = useCurrentRoom(v => v.descritption);
    const {chatId} = useParams();
    const isMobile = useMediaQuery('(max-width: 992px)');


    const updateData = (key, value) => {
        database.ref(`rooms/${chatId}`).child(key).set(value).then(()=>{
            Alert.success('Successfully updated', 4000);

        }).catch((err)=>{
            Alert.error(err.message, 4000);
        })
    }

    const onNameSave = (newName)=>{
        updateData('name', newName)
    }
    const onDescriptionSave = (newDesc) => {
        updateData('description', newDesc)
    }

    return (
        <div>
            <Button className="br-circle" size="sm" color="red" onClick={open}>
                A
            </Button>
            <Drawer full={isMobile} show={isOpen} onHide={close} placement="right">
                <Drawer.Header>
                    <Drawer.Title>
                        d
                    </Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                    <EditableInput 
                        initialValue={name}
                        onSave={onNameSave}
                        label={<h6 className="mb-2">Name</h6>}
                        emptyMsg="Name can not be empty"
                        wrapperClassName="mb-3"
                    />
                    <EditableInput
                        componentClass = "textarea"
                        rows = {5}
                        initialValue={descritption}
                        onSave={onDescriptionSave}
                        emptyMsg="Description can not be empty"
                    />
                </Drawer.Body>
                <Drawer.Footer>
                    <Button block onClick={close}>
                        Close
                    </Button>
                </Drawer.Footer>
            </Drawer>
        </div>
    )
}

export default EditRoomBtnDrawer
