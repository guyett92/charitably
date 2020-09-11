import React from 'react';
import Charities from '../Charities/index';
import Intro from '../Intro/index';
import {
    Container,
} from 'semantic-ui-react';

export default function Layout({user, authenticated }) {
    return (
        <main>
            <Container>
                <Intro />
                {authenticated
                ?
                    <Charities
                        authenticated={authenticated}
                    />
                :
                    <p>Charitably is a super-lightweight app that allows a user to search for charities. Please login to take advantage of functionality.</p>
                    }
            </Container>
        </main>
    )
};