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
  console.log("Pokemon #", number);
  console.log("Fav Pokemon", fav)

  return (
    <div className='block max-w-5xl p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 '>

      <div>
        <h1>POKEFAV</h1>
        <br />
        <h2>Select Gen:</h2>
        <br />
        <div>
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

      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>
        <div>
          {loading ?
            <ReactLoading type="spin" color="black" height={'20%'} width={'20%'} delay={'1'} className='h-full flex justify-center items-center' />
            :
            <>
              <div className='flex flex-row justify-around justify-center items-center'>
                <img src={pokemon?.sprites?.front_default} alt={pokemon?.name} />
                <h1 style={{ "textTransform": "capitalize" }}>{pokemon?.name}</h1>
                <img src={pokemon?.sprites?.front_shiny} alt={pokemon?.name} />
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
          <div className='h-30 content-around'>
            <h1>Favourite Pokemon</h1>
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
