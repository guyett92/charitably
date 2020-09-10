import React, { Component } from 'react';
import './App.css';
import { auth } from '../../services/firebase';
import Navigation from '../../components/Navigation/index';

export default class App extends Component {
    state = {
        authenticated: false,
        user: null
    }

    componentDidMount() {
        // Handle user logging in
        auth.onAuthStateChanged(user => {
            user 
            ? this.setState({ user, authenticated: true })
            : this.setState({ user:null, authenticated: false });
        })
    }

    render() {
        return (
            <div>
                <Navigation 
                    user={this.state.user}
                    authenticated={this.state.authenticated}
                />
                <h1>Charitably</h1>
            </div>
        )
    }
}