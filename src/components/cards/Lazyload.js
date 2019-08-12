import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';

const pageSize = 'pageSize=10';
const pageNum = 2;

class Lazyload extends Component {
    state = {
        lazyLoading: false
    };

    lazyLoad = () => {
    // lazyLoad = (dispatch, e) => {
    //     e.preventDefault();
        console.log('lazyLoading DISPATCH loaded');

        axios.get(`${process.env.REACT_APP_HEROKU_CORS}https://api.magicthegathering.io/v1/cards?contains=originalType&${process.env.REACT_APP_MAIN_FILTER}&${pageSize}&page=${pageNum}`)

            .then(res => {
                // dispatch({
                //    type: 'LAZY_LOAD',
                //     payload: res.data.cards
                //     // currSortType: this.state.sortType
                // });
            })
            .catch(err => console.log('error',err));
    }

    // onChange = (e) => {
    //     this.setState({sortType: e});
    // }

    componentDidMount() {
        this.observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    const { isIntersecting } = entry;

                    if (isIntersecting) {
                        //TODO: replace this w/ call for more cards
                        // this.element.src = this.props.src;
                        // <Consumer>
                        //     {value => {
                        //         const { dispatch } = 2;
                        //
                        //     }}
                        // </Consumer>
                        this.lazyLoad();
                        console.log('Intersection Ocurred');
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
    }

    render() {
        return (
            <div ref={el => this.element = el} className="row-marker"></div>
        )
    }
}

export default Lazyload;