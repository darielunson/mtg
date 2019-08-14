import React from 'react';
import Cards from '../cards/Cards';
import Sort from '../cards/Sort';
// import Lazyload from '../cards/Lazyload';

const Index = () => {
    return (
       <React.Fragment>
           <Sort />
           <Cards />
       </React.Fragment>
    )
}

export default Index;