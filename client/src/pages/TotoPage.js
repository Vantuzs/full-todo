import React from 'react';

const TotoPage = (props) => {
    const {user: {firstName,lastName}} = props;
    return (
        <div>
            SIGMA
            <h1>BOY</h1>

            <div>{`${firstName} ${lastName}`}</div>
        </div>
    );
}

export default TotoPage;
