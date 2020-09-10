import React from 'react';
import { logout, login } from '../../services/firebase';
import './styles.css';
import {
    Button,
    Icon
} from 'semantic-ui-react';

const Navigation = ( {user, authenticated} ) => {
    return (
        <nav>
            {user && <span>Hi {user.displayName.split(' ')[0]}!</span>}
            {!authenticated 
            ? <Button animated='fade' onClick={login}>
                <Button.Content visible>Login &nbsp;<Icon name='sign-in alternate'/></Button.Content>
                <Button.Content hidden>Hooray!</Button.Content>
              </Button>
            : <Button animated='fade' onClick={logout}>
                <Button.Content visible>Logout &nbsp;<Icon name='sign-out alternate' /></Button.Content>
                <Button.Content hidden>Are you sure?</Button.Content>
              </Button>}
        </nav>
    )
}

export default Navigation;