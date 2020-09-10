import React from 'react';
import Navigation from '../Navigation/index';
import Charities from '../Charities/index';

export default function Layout({user, authenticated }) {
    return (
        <main>
            <Navigation
                user={user}
                authenticated={authenticated}
            />
            <Charities />
        </main>
    )
};