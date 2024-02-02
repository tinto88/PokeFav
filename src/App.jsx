import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import ReactLoading from 'react-loading';


///Components
import FavPoke from './components/FavPoke';
import CardPoke from './components/CardPoke';

function App() {
  const [pokemon, setPokemon] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const [fav, setFav] = useState([]);

  useEffect(() => {
    let abortController = new AbortController();

    const loadPoke = async () => {
      try {

        setLoading(true);
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`, {
          signal: abortController.signal
        });

        setPokemon(response.data)
        setError("");

      } catch (error) {
        setError("Something went Wrong!", error);
      } finally {
        setLoading(false);
      }
    }

    loadPoke();



    return () => abortController.abort();

  }, [number])

  const prevPokemon = () => {
    setNumber((number) => number - 1)

  }
  const nextPokemon = () => {
    setNumber((number) => number + 1)
  }

  const addFav = () => {
    setFav((oldState) => [...oldState, pokemon])
  }

  const [shiny, setShiny] = useState(false);

  const toggleShiny = () => {
    setShiny((check) => !check)
  }

  const GenPokemon = (gen) => {
    const num = parseInt(gen)
    setNumber(num)
  }


  console.log(pokemon);
  console.log("Pokémon #", number);
  console.log("Fav Pokémon", fav)

  return (
    <div className='block max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 '>

      <div>
        <h1>PokéFAV</h1>
        <br />

        <div className='flex justify-evenly align-center'>
          <div className='flex flex-col'>
            <h2 className='font-medium'>Select Gen</h2>
            <br />
            <div className='grid grid-cols-5 gap-4 justify-between'>
              <button value={1} onClick={e => GenPokemon(e.target.value)}>I</button>
              <button value={152} onClick={e => GenPokemon(e.target.value)}>II</button>
              <button value={252} onClick={e => GenPokemon(e.target.value)}>III</button>
              <button value={387} onClick={e => GenPokemon(e.target.value)}>IV</button>
              <button value={495} onClick={e => GenPokemon(e.target.value)}>V</button>
              <button value={650} onClick={e => GenPokemon(e.target.value)}>VI</button>
              <button value={722} onClick={e => GenPokemon(e.target.value)}>VII</button>
              <button value={810} onClick={e => GenPokemon(e.target.value)}>VIII</button>
              <button value={906} onClick={e => GenPokemon(e.target.value)}>IX</button>
            </div>
          </div>

          <div >
            <h2 className='font-medium'>Search Pokemon Number</h2>
            <br />
            <div className="mb-3 xl:w-96">
              <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <input
                  type="search"
                  className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                  placeholder="Pokemon Number"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                  onChange={(e) => GenPokemon(e.target.value)}
                />

                {/* <!--Search icon--> */}
                <span
                  className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                  id="basic-addon2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5">
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </div>
          </div>

        </div>


      </div>

      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
        <div>
          {loading ?
            <ReactLoading type="spin" color="black" height={'20%'} width={'20%'} delay={'1'} className='h-full flex justify-center items-center' />
            :
            <>
              <div className='flex flex-row justify-around justify-center items-center m-6'>
                <img src={pokemon?.sprites?.versions?.['generation-v']['black-white'].animated?.front_default} alt={pokemon?.name} />
                <h1 style={{ "textTransform": "capitalize" }}>{pokemon?.name}</h1>
                <img src={pokemon?.sprites?.versions?.['generation-v']['black-white'].animated?.front_shiny} alt={pokemon?.name} />
              </div>

              <br />

              <div className='bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ' onClick={toggleShiny}>
                {shiny ?
                  <img src={pokemon?.sprites?.other?.home?.front_shiny} alt={pokemon?.name} />
                  :
                  <img src={pokemon?.sprites?.other?.home?.front_default} alt={pokemon?.name} />
                }
              </div>

              <br />

              <div className='flex flex-row justify-around'>
                <div>
                  <h2>Ability</h2>
                  <ul>
                    {pokemon?.abilities?.map((abil, idx) => (
                      <li key={idx} style={{ "textTransform": "capitalize" }}>
                        {abil.ability.name}
                      </li>

                    ))}
                  </ul>
                </div>
                <div>
                  <h2>Type</h2>
                  <ul className='flex space-x-4'>
                    {pokemon?.types?.map((typ, idx) => (
                      <li key={idx} style={{ "textTransform": "capitalize" }} id={typ.type.name} className="rounded-md">
                        {typ.type.name}
                      </li>

                    ))}
                  </ul>
                </div>
              </div>

              <br />

              <div className='flex justify-around'>
                <button onClick={prevPokemon} >Previous</button>
                <button onClick={addFav} >Add to Favourite</button>
                <button onClick={nextPokemon} >Next</button>
              </div>


            </>
          }

        </div >
        <div >
          <div className='h-30 content-around m-6'>
            <h1>Favourite Pokémon</h1>
          </div>

          <br />
          {fav.length > 0 ? <FavPoke fav={fav} /> : <div className='flex h-full justify-center items-center'>No Favourite Pokemon...</div>}
        </div>
      </div>
      <br />

    </div>
  )
}

export default App
