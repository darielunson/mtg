import React, { Component } from 'react';
import { Consumer } from '../../context';
import Spinner from '../layout/Spinner';
import Card from './Card';
import Lazyload from './Lazyload';

class Cards extends Component {

    constructor(props) {
        super(props);
        this.searchResults = true;
    }

    resultCards = (value) => {
        const { card_list, heading } = value;

        return (
            <React.Fragment>
                <h3 className="text-center text-white mb-4">{heading}</h3>
                <div className="row">
                    {card_list.map(item => (
                        <Card key={item.id} card={item} />
                    ))}
                    {this.searchResults ? '' : <Lazyload length={card_list.length}/>}
                </div>
            </React.Fragment>
        );
    }

    render() {
        return (
            <Consumer>
                {value => {
                    const { card_list, results } = value;
                    this.searchResults = results;
                    if(card_list === undefined || card_list.length === 0) {
                        if (this.searchResults === false) {
                            return this.resultCards(value);
                        } else {
                            return <Spinner />
                        }
                    } else {
                        return this.resultCards(value);
                    }
                }}
            </Consumer>
        )
    }
}

export default Cards;