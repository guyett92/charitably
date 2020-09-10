import React, { Component } from 'react';
import { getCharities } from '../../services/charity';
import {
    Button,
    Form
} from 'semantic-ui-react';


export default class Charities extends Component {

    constructor(props) {
        super(props);
        this.state = {value: '', charities: []};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.handleGetCharities(this.state.value);
        console.log('test');
    }
    
    handleGetCharities = async search => {
        const results = await getCharities(search);
        this.setState({
            charities: results
        });
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <label>Search Terms</label>
                    <input type="text" value={this.state.value} onChange={this.handleChange} placeholder='Charity Name' />
                </Form.Field>
                <Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form.Field>
            </Form>
        )
    }
};