import React from 'react'
import { Button, Modal } from 'rsuite';
import { useModalState } from '../../../misc/custom-hooks'
import ProfileAvatar from '../../dashboard/ProfileAvatar';

const ProfileInfoBtnModal = ({profile,children, ...btnProps}) => {
    
    const {isOpen, open, close} = useModalState();

    const shortName = profile.name.split(' ')[0];

    const {name, avatar, createdAt} = profile;

    const memberSince = new Date(createdAt).toLocaleDateString();

    return (
        <div>
            <Button onClick={open} {...btnProps}>
                {shortName}
            </Button>
            <Modal show={isOpen} onHide={close}>
                <Modal.Header>
                    <Modal.Title>
                        {shortName} profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <ProfileAvatar src={avatar} name={name} className="width-200 height-200 img-fullsize font-huge" />
                    <h4 className="mt-2">
                        {name}
                    </h4>
                    <p>Member since {memberSince} </p>
                </Modal.Body>
                <Modal.Footer>
                    {children}
                    <Button block onClick={close}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ProfileInfoBtnModal
