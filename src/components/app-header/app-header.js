import React from 'react';

const AppHeader = ({liked, allPost}) => {
    return (
        <div className='app-header d-flex'>
            <h1>Magic Vel</h1>
            <h2>{allPost} записпей, из них понравилось {liked}</h2>
        </div>
    )
}

export default AppHeader;