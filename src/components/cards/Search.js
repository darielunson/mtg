import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';

class Search extends Component {
    state = {
        cardName: '',
        card_list: []
    };


    findCard = (dispatch, e) => {
        e.preventDefault();

        //This will cause the "loading" icon to show by clearing payload count
        dispatch({
            type: 'SEARCH_CARDS',
            payload: []
        });

        axios.get(`${process.env.REACT_APP_HEROKU_CORS}https://api.magicthegathering.io/v1/cards?contains=originalType&orderBy=name&${process.env.REACT_APP_MAIN_FILTER}&name=${this.state.cardName}`)

            .then(res => {
                dispatch({
                   type: 'SEARCH_CARDS',
                    payload: res.data.cards,
                    currSearchType: this.state.cardName
                });
            })
            .catch(err => console.log('error',err));
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <form onSubmit={this.findCard.bind(this, dispatch)} className="form-inline my-2 my-lg-0">
                            <input
                                type="text"
                                className="form-control mr-sm-2"
                                placeholder="Character Search"
                                name="cardName"
                                onChange={this.onChange}
                                value={this.state.cardName}
                            />
                            <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    );
                }}
            </Consumer>
        )
    }
}

export default Search;