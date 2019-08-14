import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';
import Spinner from '../layout/Spinner';
import Card from './Card';

class Lazyload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            card_list_new: [],
            pageSize: 'pageSize=10',
            pageNum: 3,
            lazyLoading: false
        };
        this.card_list_prev = [];
    }

    loadData = () => {
        axios.get(`${process.env.REACT_APP_HEROKU_CORS}https://api.magicthegathering.io/v1/cards?contains=originalType&${process.env.REACT_APP_MAIN_FILTER}&${this.state.pageSize}&page=${this.state.pageNum}`)

            .then(res => {
                this.setState({card_list_new: res.data.cards});
            })
            .catch(err => console.log('error',err));
    }

    lazyLoad = () => {
        if(this.state.card_list_new === undefined || this.state.card_list_new.length === 0) {
            if (this.state.lazyLoading === false) {
                return;
            } else {
                return <Spinner />
            }
        } else {
            return (
                <React.Fragment>
                    <div className="row">
                        {this.state.card_list_new.map(item => (
                            <Card key={item.id} card={item} />
                        ))}
                    </div>
                </React.Fragment>
            );
        }
    }

    componentDidMount() {
        this.observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    const { isIntersecting } = entry;

                    if (isIntersecting) {
                        if (this.card_list_prev.length > 0) {
                            console.log('Intersection Occurred and loading Data ...');
                            this.loadData();
                            this.setState({lazyLoading: true});
                        }
                        // this.observer = this.observer.disconnect();
                    }
                });
            },
            {
                root: document.querySelector(".row"),
                rootMargin: "0px 0px 200px 0px"
            }
        );
        this.observer.observe(this.element);
        //after first lazy load is called, new element must be created for observer
    }

    render() {
        return (
        <Consumer>
            {value => {
                // console.log('Previous value.card_list',value.card_list);
                this.card_list_prev = value.card_list;
                return (
                    <React.Fragment>
                        <div ref={el => this.element = el} className="row-marker container-fluid justify-content-center">
                            {this.lazyLoad()}
                        </div>
                    </React.Fragment>
                );
            }}
        </Consumer>
        )
    }
}

export default Lazyload;