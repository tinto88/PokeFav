import React from 'react'
import LikePoke from './LikePoke';
function FavPoke(props) {
    const { fav } = props;

    return (
        <div className='grid sm:grid-cols-1 md:grid-cols-3 lg grid-cols-4'>
            {fav?.map((data, idx) => (
                <div key={idx}>
                    <h3 style={{ "text-transform": "capitalize" }} className='flex justify-center items-center pt-9'>{data.name}</h3>
                    <img src={data?.sprites?.front_default} alt={data?.name} className='flex justify-center items-center pl-9' />
                    <LikePoke />
                </div>
            ))}
        </div>
    )
}

export default FavPoke