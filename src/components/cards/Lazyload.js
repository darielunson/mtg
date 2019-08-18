import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';
import Spinner from '../layout/Spinner';
import Card from './Card';

/*TODO: TWO problems to solve:
1. Intersection gets called without actually scrolling to cause intersection
2. the returned data HTML just overwrites the existing data HTML instead of appending

For item 1, could it be because item is in a wrapping column?
*/


class Lazyload extends Component {

    constructor(props) {
        super(props);
        // console.log('props',props);
        this.state = {
            card_original_length: props.length,
            card_list_new: [],
            pageSize: 'pageSize=10',
            pageNum: 3,
            lazyLoading: false,
            prevY: 0
        };
    }

    loadData = () => {
        axios.get(`${process.env.REACT_APP_HEROKU_CORS}https://api.magicthegathering.io/v1/cards?contains=originalType&${process.env.REACT_APP_MAIN_FILTER}&${this.state.pageSize}&page=${this.state.pageNum}`)

            .then(res => {

                this.setState({
                    card_list_new: res.data.cards,
                    pageNum: this.state.pageNum + 1,
                    lazyLoading: false
                });
                // this.setIO();
                //This seems to work, but gets called before actual scroll intersection
                //and replaces existing data HTML
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
            // this.observer = this.observer.disconnect();
            return (
                <React.Fragment>
                    {this.state.card_list_new.map(item => (
                        <Card key={item.id} card={item} />
                    ))}
                    <div ref={el => this.element = el} className="row-marker"></div>
                </React.Fragment>
            );
        }
    }

    setIO = () => {
        const options = {
            root: document.querySelector(".row"),
            rootMargin: "0px 0px 0px 0px",
            threshold: 1
        };

        this.isLeaving = false;

        this.observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    const { isIntersecting/*, isVisible*/ } = entry;
                    console.log('entry',entry);
                    //TODO could be intersecting too soon
                    // if (entry.intersectionRatio > 0) {
                    //     entry.target.classList.add('in-viewport');
                    // } else {
                    //     entry.target.classList.remove('in-viewport');
                    // }


                    if (isIntersecting) {
                        if (this.state.card_original_length > 0) {
                            console.log('Intersection Occurred and loading Data ...');
                            this.loadData();
                            this.setState({lazyLoading: true});
                        }
                        this.observer = this.observer.disconnect();
                    }
                });
            },
            options
        );
        this.observer.observe(this.element);
        //after first lazy load is called, new element must be created for observer
    }

    componentDidMount() {
        console.log('Lazy load componentDidMount');
        console.log('card_original_length ',this.state.card_original_length);
        if (this.state.card_original_length > 0) {
            this.setIO();
        }
        // this.setIO();
        //When this fires on Mount div.row does not yet have any data so it automatically intersects w div.row-marker
        //maybe pass the card_list data from original call as props to Lazyload class and use that to determine when to fire IO
    }

    render() {
        return (
        <Consumer>
            {value => {
                // console.log('Previous value.card_list',value.card_list);
                // this.card_list_prev = value.card_list;
                return (
                    <React.Fragment>
                        <div ref={el => this.element = el} className="row-marker"></div>
                        {this.lazyLoad()}
                    </React.Fragment>
                );
            }}
        </Consumer>
        )
    }
}

export default Lazyload;