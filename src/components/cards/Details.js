import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import defaultCard from '../layout/default_card.jpg';

class Details extends Component {
    state = {
        card: {}
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_HEROKU_CORS}https://api.magicthegathering.io/v1/cards/${this.props.match.params.id}`)
            .then(res => {
                this.setState({card: res.data.card});
            })
            .catch(err => console.log('error',err));
    }

    render() {
        const { card } = this.state;
        if(
            card === undefined ||
            Object.keys(card).length === 0
        ) {
            return <Spinner />
        } else {
            return (
                <React.Fragment>
                    <Link to="/" className="btn btn-dark btn-sm mb-4 mt-0"><i className="fas fa-chevron-left"></i> Back</Link>
                    <div className="row justify-content-center mb-3">
                        <div className="detail card shadow-sm mb-2">
                            <div className="card-body">
                                <div>
                                    <img src={card.imageUrl ? card.imageUrl : defaultCard} alt={card.name} />
                                </div>
                            </div>
                        </div>
                        <div className="detail card-info float-left">
                            <ul className="text-white">
                                <li>Name: <span className="font-weight-bold">{card.name}</span></li>
                                <li>Artist: <span className="font-weight-bold">{card.artist}</span></li>
                                <li>Set Name: <span className="font-weight-bold">{card.setName}</span></li>
                                <li>Type: <span className="font-weight-bold">{card.type}</span></li>
                                <li>Original Type: <span className="font-weight-bold">{card.originalType}</span></li>
                                <li>Power: <span className="font-weight-bold">{card.power}</span></li>
                                <li>Toughness: <span className="font-weight-bold">{card.toughness}</span></li>
                                <li>Flavor: <span className="font-weight-bold">{card.flavor}</span></li>
                                <li>Rarity: <span className="font-weight-bold">{card.rarity}</span></li>
                            </ul>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default Details;