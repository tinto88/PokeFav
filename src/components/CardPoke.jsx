import React from 'react'

function CardPoke(props) {
    const { poke } = props;
    return (
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">

            <div className="w-full duration-700 ease-in-out" data-carousel-item>

                <img src={poke?.sprites?.other?.home?.front_default} alt={poke?.name} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
            </div>
            


        </div>
    )
}

export default CardPoke