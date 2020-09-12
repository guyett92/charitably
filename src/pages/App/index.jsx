import React, { Component } from 'react';
import './App.css';
import { auth } from '../../services/firebase';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import Layout from '../../components/Layout';
import Chat from '../Chat';
import Navigation from '../../components/Navigation/index';
import Footer from '../../components/Footer';

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
            <div class="container-1">
                <Navigation
                    user={this.state.user}
                    authenticated={this.state.authenticated}
                />
                <Switch>
                    <Route exact path='/chat' render={(props) =>
                        auth.currentUser ?
                        <Chat 
                            user={this.state.user}
                            authenticated={this.state.authenticated}
                        />
                        :
                        <Redirect to='/'/>
                    }/>
                    <Route exact path='/' render={(props) =>
                        <Layout 
                            user={this.state.user}
                            authenticated={this.state.authenticated}
                        />
                    }/>
                </Switch>
                <Footer />
            </div>
        )
    }
}