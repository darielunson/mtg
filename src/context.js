import React, { Component } from 'react';
import axios from 'axios';
import Lazyload from './components/cards/Lazyload';

const Context = React.createContext();

const reducer = (state, action) => {
    switch(action.type){
        case 'SEARCH_CARDS':
            return {
                ...state,
                card_list: action.payload,
                heading: `Creature Search Results: ${action.currSearchType} - ${action.payload.length} results`
            };
        case 'SORT_CARDS':
        return {
            ...state,
            card_list: action.payload,
            heading: `Creature Sort Results: ${action.currSortType} - ${action.payload.length} results`
        };
        case 'LAZY_LOAD':
            return {
                ...state,
                card_list: action.payload
            };
        default:
            return state;
    }
}

export class Provider extends Component {
    state = {
        card_list: [],
        heading: 'Creature Character Cards',
        pageSize: 'pageSize=20',
        pageNum: 'page=1',
        dispatch: action => this.setState(state => reducer(state, action))
    };
    
    componentDidMount() {
        axios.get(`${process.env.REACT_APP_HEROKU_CORS}https://api.magicthegathering.io/v1/cards?contains=originalType&${process.env.REACT_APP_MAIN_FILTER}&${this.state.pageSize}&${this.state.pageNum}`)
            .then(res => {
                 // console.log('res.data',res.data);
                this.setState({card_list: res.data.cards});

            })
            .catch(err => console.log('error',err));
    }
    
    render() {
        // console.log('context render');
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
                <Lazyload />
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;