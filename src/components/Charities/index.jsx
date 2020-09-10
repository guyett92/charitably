import React, { Component } from 'react';
import { getCharities } from '../../utils/charity';
import {
    Button,
    Form,
    Card
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
    }
    
    handleGetCharities = async search => {
        const results = await getCharities(search);
        this.setState({
            charities: results
        });
    }

    render() {
        return (
            <section>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label>Search Terms</label>
                        <input type="text" value={this.state.value} onChange={this.handleChange} placeholder='Charity Name' />
                    </Form.Field>
                    <Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form.Field>
                </Form>
                {this.state.charities.length > 0 &&
                    <Card.Group>
                        {this.state.charities.map(( charity, idx ) => (
                        <Card
                            color='teal'
                            link
                            href={this.state.charities[idx].charityNavigatorURL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Card.Content header={this.state.charities[idx].charityName.toLowerCase().split(' ').map(function(word) { return word[0].toUpperCase() + word.substr(1) }).join(' ')} meta={this.state.charities[idx].irsClassification.classification} />
                            <Card.Content  description={[
                                'The charity is classified as ',
                                this.state.charities[idx].irsClassification.nteeClassification,
                                ' and ',
                                this.state.charities[idx].irsClassification.deductibility.toLowerCase(),
                                '. The organization became a charity on ',
                                this.state.charities[idx].irsClassification.rulingDate,
                                '. They are also classified as ',
                                this.state.charities[idx].irsClassification.nteeType,
                                ' and located in ',
                                this.state.charities[idx].mailingAddress.city.toLowerCase().split(' ').map(function(word) { return word[0].toUpperCase() + word.substr(1) }).join(' ') + ', ' + this.state.charities[idx].mailingAddress.stateOrProvince,
                                '.'
                            ].join('')}/>
                        </Card>
                        ))}
                    </Card.Group>
                }
            </section>
        )
    }
};