import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class Sort extends Component {
    state = {
        sortType: ''
    };


    sortBy = (dispatch, e) => {
        e.preventDefault();

        //This will cause the "loading" icon to show by clearing payload count
        dispatch({
            type: 'SORT_CARDS',
            payload: []
        });

        axios.get(`${process.env.REACT_APP_HEROKU_CORS}https://api.magicthegathering.io/v1/cards?contains=originalType&${process.env.REACT_APP_MAIN_FILTER}&pageSize=20&orderBy=${this.state.sortType}`)

            .then(res => {
                dispatch({
                   type: 'SORT_CARDS',
                    payload: res.data.cards,
                    currSortType: this.state.sortType
                });
            })
            .catch(err => console.log('error',err));
    }

    onChange = (e) => {
        this.setState({sortType: e});
    }

    render() {
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value;
                    return (
                        <form onSubmit={this.sortBy.bind(this, dispatch)} className="form-inline my-2 my-lg-0">
                            <DropdownButton id="dropdown-item-button" title="Sort By" variant="secondary" name="sortType" onSelect={this.onChange}>
                                <Dropdown.Item as="button" eventKey="name">Name</Dropdown.Item>
                                <Dropdown.Item as="button" eventKey="type">Type</Dropdown.Item>
                                <Dropdown.Item as="button" eventKey="artist">Artist</Dropdown.Item>
                                <Dropdown.Item as="button" eventKey="setName">Set Name</Dropdown.Item>
                            </DropdownButton>
                        </form>
                    );
                }}
            </Consumer>
        )
    }
}

export default Sort;