import React,{memo} from 'react';
import { Alert, Button, Divider, Drawer } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import { getUserUpdate } from '../../misc/helpers';
import { database } from '../../misc/firebase';
import EditableInput from '../EditableInput';
import AvatarUploadBtn from './AvatarUploadBtn';
import ProviderBlock from './ProviderBlock';

const Dashboard = ({onSignOut}) => {
    const {profile} = useProfile();
    const onSave = async(newData) => {

        try {
            // await userNicknameRef.set(newData);
            const updates = await getUserUpdate(profile.uid, 'name', newData, database);
            await database.ref().update(updates);
            Alert.success('Nickname has been updated',4000);
        }catch(err){
            Alert.error(err.message,4000);
        }
    }
    return <>
        <Drawer.Header>
            <Drawer.Title>Dashboard</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
            <h3>Hey, {profile.name}</h3>
            <ProviderBlock/>
            <Divider/>
            <EditableInput
                name="nickname"
                initialValue = {profile.name}
                onSave = {onSave}
                label= {<h6 className="mb-2">Nickname</h6>}
            />
            <AvatarUploadBtn/>
        </Drawer.Body>
        <Drawer.Footer>
            <Button block color="red" onClick={onSignOut}>
                Sign out
            </Button>
            <p style={{marginTop:10,textAlign:'center'}}>Made with ❤️ by 
            <a href="https://siddhant-ahire.github.io" rel="noreferrer" target="_blank"> Siddhant Ahire</a></p>
        </Drawer.Footer>
    </>
};
export default memo(Dashboard);