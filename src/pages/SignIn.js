import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app';
import {  Container, Grid, Row, Col, Panel, Button, Icon, Alert } from 'rsuite'
import { auth, database } from '../misc/firebase'

const SignIn = () => {

    const signInWithProvider = async(provider) => {
        try{
            const {additionalUserInfo, user} = await auth.signInWithPopup(provider);

            if(additionalUserInfo.isNewUser){
               await database.ref(`/profiles/${user.uid}`).set({
                    name:user.displayName,
                    createdAt: firebase.database.ServerValue.TIMESTAMP,
                })
            }

            Alert.success('Signed in', 4000);
        }
        catch (err){
            Alert.info(err.message,4000);
        }
    }
    const onFacebookSignIn = () => {
        signInWithProvider(new firebase.auth.FacebookAuthProvider() )
    };

    const onGoogleSignIn = () => {
        signInWithProvider(new firebase.auth.GoogleAuthProvider() )
    };

    
    const [deferredPrompt, setDeferredPrompt] = useState();
    window.addEventListener("beforeinstallprompt", function(beforeInstallPromptEvent) {
    beforeInstallPromptEvent.preventDefault();
        setDeferredPrompt(beforeInstallPromptEvent)  
    })
    const onClick = () => {
        deferredPrompt.prompt();
    }
    setTimeout(() => {
        Alert.success(<Button color="green" appearance="link" onClick={onClick}>Download App Now</Button>,100000)
    },3000)

    return <Container>
            <Grid className="mt-page">
                <Row>
                    <Col xs={24} md={12} mdOffset={6}>
                        <Panel>
                            <div className="text-center">
                                <h2>Welcome to Chat</h2>
                                <p>Progressive chat platform for neophytes</p>
                            </div>
                            <div className="mt-3">
                                <Button block color="blue" onClick={onFacebookSignIn}>
                                    <Icon icon="facebook" /> Continue with Facebook
                                </Button>
                                <Button block color="green" onClick={onGoogleSignIn}>
                                    <Icon icon="google" /> Continue with Google
                                </Button>
                            </div>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        </Container>
    
}

export default SignIn
