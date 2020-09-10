import React, { Component } from 'react';
import './App.css';
import { auth } from '../../services/firebase';
import Layout from '../../components/Layout';

export default class App extends Component {
    state = {
        authenticated: false,
        user: null,
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
                <Layout 
                    user={this.state.user}
                    authenticated={this.state.authenticated}
                />
            </div>
        )
    }
}