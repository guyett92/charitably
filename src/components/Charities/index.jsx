import React, { Component } from 'react';
import { getCharities } from '../../utils/charity';
import {
    Button,
    Form,
    Card,
    Pagination,
    Icon,
    Divider,
    Grid,
    Dimmer,
    Loader
} from 'semantic-ui-react';
import './styles.css';


export default class Charities extends Component {

    constructor(props) {
        super(props);
        this.state = {value: '', charities: [], loading: false, currValue: '', activePage: 1};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    async handleSubmit(e) {
        this.setState({loading: true, currValue: this.state.value});
        e.preventDefault();
        await this.handleGetCharities(this.state.value);
        this.setState({value: '', loading: false});
        console.log(this.state.currValue);
    }
    
    handleGetCharities = async search => {
        const results = await getCharities(search, this.state.activePage);
        this.setState({
            charities: results
        });
    }

    handlePaginationChange = (e, { activePage }) => {
        this.setState({ activePage });
        this.handleGetCharities(this.state.currValue);
    }

    render() {
        const { activePage } = this.state;

        return (
            this.state.loading ? <Dimmer active><Loader /></Dimmer> :
            <section>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label>Search Terms</label>
                        <input type="text" value={this.state.value} onChange={this.handleChange} placeholder='Charity Name' />
                    </Form.Field>
                    <Form.Field>
                        <Button type='submit' disabled={!this.props.authenticated}>Submit</Button>
                        {!this.props.authenticated && <span style={{color: 'red'}}>Please login to continue.</span>}
                    </Form.Field>
                </Form>
                <Divider />
                {this.state.charities.length > 0 &&
                    <article>
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
                        <Divider />
                        <Grid centered class="margin-top">
                            <Grid.Row>
                                <Grid.Column width={12}>
                                    <Pagination 
                                        defaultActivePage={1}
                                        totalPages={10}
                                        ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
                                        firstItem={{ content: <Icon name="angle double left" />, icon: true }}
                                        lastItem={{ content: <Icon name="angle double left" />, icon: true }}
                                        prevItem={{ content: <Icon name="angle left" />, icon: true }}
                                        nextItem={{ content: <Icon name="angle right" />, icon: true }}
                                        onPageChange={this.handlePaginationChange}
                                        activePage={activePage}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <br />
                        <br />
                        <br />
                        <br />

                    </article>
                }

            </section>
        )
    }
};