import React, { memo } from 'react'
import { Button } from 'rsuite';
import TimeAgo from 'timeago-react';
import { useCurrentRoom } from '../../../context/create-room.context';
import { useHover, useMediaQuery } from '../../../misc/custom-hooks';
import { auth } from '../../../misc/firebase';
import ProfileAvatar from '../../dashboard/ProfileAvatar';
import PresenceDot from '../../PresenceDot';
import IconBtnControl from './IconBtnControl';
import ImgBtnMoadal from './ImgBtnMoadal';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';

const renderFileMessage = file => {
    if(file.contentType.includes('image')){
        return (
            <div className="height-220">
                <ImgBtnMoadal src={file.url} fileName={file.name}/>
            </div>
        )
    }

    if(file.contentType.includes('audio')){
        return <audio controls>
            <source src={file.url} type="audio/wav"/>
            <track src="captions_es.vtt" kind="captions"/>
            Your browser does not support the audio element.
        </audio>
    }
    return <a href={file.url}>Download {file.name}</a>
}

const MessageItem = ({message,handleAdmin,handleLike,handleDelete}) => {

    const {author, createdAt,file, likes,text,likeCount} = message;

    const [selfRef, isHovered] = useHover();
    const isMobile = useMediaQuery(('(max-width: 992px'));
    const isAdmin = useCurrentRoom(v => v.isAdmin);
    const admins = useCurrentRoom(v => v.admins);
    
    const isMsgAuthorAdmin = admins.includes(author.uid);
    const isAuthor = auth.currentUser.uid === author.uid;
    const canGrantAdmin = isAdmin && !isAuthor;

    const canShowIcon = isMobile || isHovered;
    const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);

    return (
        <li className={`padded mb-1 cursor-pointer ${isHovered ? 'bg-black-02': ''}`} ref={selfRef}>
            <div className="d-flex align-items-center font-bolder mb-1">
                <PresenceDot uid={author.uid} />
                <ProfileAvatar src={author.avatar} name= {author.name} className="ml-1" size="xs"/>
                <ProfileInfoBtnModal profile={author} appearance="link" className="p-0 ml-1 text-black" >
                    {canGrantAdmin &&
                        <Button block onClick={() => {handleAdmin(author.uid)}} color="blue" >
                        {isMsgAuthorAdmin ? 'Remove admin permission' : 'Give admin in this room'}
                    </Button>}
                </ProfileInfoBtnModal>
                <TimeAgo datetime={createdAt} className="font-normal text-black-45 ml-2"/>
                <IconBtnControl
                    {...(isLiked ? {color: 'red'}:{})}
                    isVisible={canShowIcon}
                    iconName="heart"
                    tooltip="Like this Message"
                    onClick={()=> handleLike(message.id)}
                    badgeContent={likeCount}
                />
                {isAdmin && (
                    <IconBtnControl
                    isVisible={canShowIcon}
                    iconName="close"
                    tooltip="Delete this Message"
                    onClick={()=> handleDelete(message.id,file)}
                />
                )

                }
                
            </div>
            <div>
                {text && <span className="word-breal-all">{text}</span>}
                {file && renderFileMessage(file)}
            </div>

        </li>
    )
}

export default memo(MessageItem)
