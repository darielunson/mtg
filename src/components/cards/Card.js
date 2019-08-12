import React, { Component } from 'react';
import defaultCard from '../layout/default_card.jpg';

class Card extends Component {
    card = this.props.card;

    state = {
       flipped: false
    };

    cardDetail = <div className="card-click mb-2" onClick={this.flipCard}><img src={this.card.imageUrl ? this.card.imageUrl : defaultCard} alt={this.card.name} /></div>;

    btnText = 'View Details';

    flipCard = () => {
        if (this.state.flipped === true) {
            this.cardDetail = <img src={this.card.imageUrl ? this.card.imageUrl : defaultCard} alt={this.card.name} />;
            this.btnText = 'View Details';
            this.setState({flipped: false});
        } else {
            this.cardDetail = <ul className="text-white pt-3 pr-2">
                    <li>Artist: <span className="font-weight-bold">{this.card.artist}</span></li>
                    <li>Set Name: <span className="font-weight-bold">{this.card.setName}</span></li>
                    <li>Type: <span className="font-weight-bold">{this.card.type}</span></li>
                    <li>Original Type: <span className="font-weight-bold">{this.card.originalType}</span></li>
                    <li>Power: <span className="font-weight-bold">{this.card.power}</span></li>
                    <li>Toughness: <span className="font-weight-bold">{this.card.toughness}</span></li>
                    <li>Rarity: <span className="font-weight-bold">{this.card.rarity}</span></li>
                </ul>;
            this.btnText = 'View Card';
            this.setState({flipped: true});
        }
    }

    render() {
        return (
            <div className="col-auto mb-3">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5>{this.card.name}</h5>
                        <div className="card-click card-detail mb-2" onClick={this.flipCard}>
                            {this.cardDetail}
                        </div>
                        <button onClick={this.flipCard} className="btn btn-dark btn-block">
                            <i className="fas fa-chevron-right"></i> {this.btnText}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;