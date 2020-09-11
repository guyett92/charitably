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
        this.setState({value: ''});
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
                <div className="ui divider"></div>
                {this.state.charities.length > 0 &&
                    <Card.Group centered>
                        {this.state.charities.map(( charity, idx ) => (
                        <Card
                            key={idx}
                            raised
                            color='teal'
                            link
                            href={charity.charityNavigatorURL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Card.Content header={charity.charityName.toLowerCase().split(' ').map(function(word) { return word[0].toUpperCase() + word.substr(1) }).join(' ')} meta={charity.irsClassification.classification} />
                            <Card.Content  description={[
                                'The charity is classified as ',
                                charity.irsClassification.nteeClassification,
                                ' and ',
                                charity.irsClassification.deductibility.toLowerCase(),
                                '. The organization became a charity on ',
                                charity.irsClassification.rulingDate,
                                '. They are also classified as ',
                                charity.irsClassification.nteeType,
                                ' and located in ',
                                charity.mailingAddress.city.toLowerCase().split(' ').map(function(word) { return word[0].toUpperCase() + word.substr(1) }).join(' ') + ', ' + charity.mailingAddress.stateOrProvince,
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