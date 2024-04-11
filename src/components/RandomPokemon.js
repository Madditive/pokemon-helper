import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Define your styled components outside of the RandomPokemon component.
const Container = styled.div`
  text-align: center;
`;

const Title = styled.h2`
  color: #333;
  text-transform: capitalize;
`;

const Image = styled.img`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 50%;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 5px 0;
  color: #666;
  text-transform: capitalize;
`;

const LoadingMessage = styled.p`
  color: #0275d8;
`;

const ErrorMessage = styled.p`
  color: #d9534f;
`;

const RandomPokemon = () => {
  // Correctly define the useState hooks for loading, error, and pokemon.
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomPokemon = async () => {
      try {
        setLoading(true); // Ensure loading is set at the start of the fetch.
        const randomId = Math.floor(Math.random() * 898) + 1; // Correct number of Pokemon.
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();
        setPokemon(data); // Save the fetched pokemon data.
      } catch (err) {
        setError(err.message); // Save any errors that occur.
      } finally {
        setLoading(false); // Ensure loading is false after fetch completes or fails.
      }
    };

    fetchRandomPokemon();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      {pokemon && (
        <>
          <Title>{pokemon.name.toUpperCase()}</Title>
          <Image src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h3>Types</h3>
          <List>
            {pokemon.types.map(({ type }) => (
              <ListItem key={type.name}>{type.name.toUpperCase()}</ListItem>
            ))}
          </List>
          <h3>Abilities</h3>
          <List>
            {pokemon.abilities.map(({ ability }) => (
              <ListItem key={ability.name}>{ability.name.toUpperCase()}</ListItem>
            ))}
          </List>
        </>
      )}
    </Container>
  );
};

export default RandomPokemon;
