import { useEffect, useState } from 'react';
import ss from './style.module.css';
import { api } from '../../api';

const PocemonComp = () => {
    const [pokemon, setPokemon] = useState({});
    const [postImgUrls, setPostImgUrls] = useState([]);
    const [prew, setPrew] = useState('');



    async function getImg(url) {
        const response = await fetch(url);
        const data = await response.json();
        const imageResposnse = await fetch(data.forms[0].url)
        const imgUrl = await imageResposnse.json();
        const imageUrl = imgUrl.sprites.back_default
        return imageUrl;
    }

    useEffect(() => {
        if (pokemon.results) {
            const imgPromises = pokemon.results.map(async (pokem) => {
                const img = await getImg(pokem.url);
                setPostImgUrls((prev) => [...prev, img])
            })

            Promise.all(imgPromises).then((results) => {
                console.log(results)
            }).catch((err) => {
                console.log(err)
            })
            console.log(pokemon, postImgUrls)
        }

    }, [pokemon])
    useEffect(() => {

        const defaultGetModule = async (url) => {
            try {
                const response = await api.get();
                console.log(response)
                setPokemon(response.data);
            } catch (error) {
                throw error;
            }
        };
        defaultGetModule();
    }, []);

    return (
        <>
            <div className="container">
                {pokemon.results?.length === postImgUrls.length &&
                    pokemon.results.map((pok, idx) => {

                        return (
                            <div className={ss.pokemons} key={idx}>
                                <h3>{pok.name}</h3>
                                <img src={postImgUrls[idx]} />
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default PocemonComp;