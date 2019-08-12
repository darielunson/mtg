import React, { Component } from 'react';
import { Consumer } from '../../context';
import Spinner from '../layout/Spinner';
import Card from './Card';

class Cards extends Component {

    state = {
        loading: true
    };

    render() {
        return (
            <Consumer>
                {value => {
                    const { card_list, heading } = value;
                    if(card_list === undefined || card_list.length === 0) {
                        return <Spinner />
                    } else {
                        return (
                            <React.Fragment>
                                <h3 className="text-center text-white mb-4">{heading}</h3>
                                <div className="row">
                                        {card_list.map(item => (
                                            <Card key={item.id} card={item} />
                                        ))}
                                </div>
                            </React.Fragment>
                        );
                    }
                }}
            </Consumer>
        )
    }
}

export default Cards;