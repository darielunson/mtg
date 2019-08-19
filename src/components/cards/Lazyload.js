import React, { Component } from 'react';
import axios from 'axios';
// import { Consumer } from '../../context';
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
        this.state = {
            card_original_length: props.length,
            card_list_new: [],
            pageSize: 'pageSize=10',
            pageNum: 3,
            lazyLoading: false,
            prevY: 0,
            pages: [{id: 1}]
        };
    }

    loadData = () => {
        axios.get(`${process.env.REACT_APP_HEROKU_CORS}https://api.magicthegathering.io/v1/cards?contains=originalType&${process.env.REACT_APP_MAIN_FILTER}&${this.state.pageSize}&page=${this.state.pageNum}`)

            .then(res => {
                this.setState({
                    card_list_new: res.data.cards,
                    pageNum: this.state.pageNum + 1,
                    lazyLoading: false,
                    pages: this.state.pages.concat({id: this.state.pages.length + 1})
                });
                //This seems to work, but gets called before actual scroll intersection
                //and replaces existing data HTML
                // this.setIO();
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
                    {this.state.card_list_new.map(item => (
                        <Card key={item.id} card={item} />
                    ))}
                    <div ref={el => this.element = el} className="row-marker"></div>
                </React.Fragment>
            );
        }
    }

    // pageCall = () => {
    //     const pages = this.state.pages;
    //     console.log('render area pages', pages);
    //     return (
    //         pages.map(index => (
    //             console.log('index.id', index.id)
    //             // if (index.id === pages.length + 1) {
    //                 // <React.Fragment key={index.id}>
    //                 //     <div ref={el => this.element = el} className="row-marker"></div>
    //                 //     {this.lazyLoad()}
    //                 // </React.Fragment>
    //             // }
    //         ))
    //     )
    // }

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
                    // console.log('entry',entry);
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
        // if (this.state.card_original_length > 0) {
        //     this.setIO();
        // }
        this.setIO();
    }

    /*
     return (
     <Consumer>
     {value => {

     }}
     </Consumer>
     )
     */

    render() {
        //TODO: HERE create a pages array and map through them to render each new page without overwriting the previous result
        // const pages = this.state.pages;

        return (
            // pages.map(index => (
            // <React.Fragment>
            //
            //     if (index.id === pages.length) {
                    <React.Fragment >
                        <div ref={el => this.element = el} className="row-marker"></div>
                        {this.lazyLoad()}
                    </React.Fragment>
                // }

        //     </React.Fragment>
        //     ))
        )
    }
}

export default Lazyload;