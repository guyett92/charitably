import React from 'react';
import Navigation from '../Navigation/index';
import Charities from '../Charities/index';
import Intro from '../Intro/index';
import {
    Container
} from 'semantic-ui-react';

export default function Layout({user, authenticated }) {
    return (
        <main>
            <Navigation
                user={user}
                authenticated={authenticated}
            />
            <Container>
                <Intro />
                <Charities />
            </Container>
        </main>
    )
};