import React from 'react';
import spinner from './fingers.gif';

export default () => {
    return (
        <div>
            <img
                src={spinner}
                alt="Loading ..."
                style={{ width: '200px', margin: ' 40px auto', display: 'block' }}
            />
        </div>
    );
};