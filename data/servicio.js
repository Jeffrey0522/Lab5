for (let index = 1; index <= 50; index++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${index}/`)
        .then(res => {
            if(!res.ok) throw new Error('no se pudo registrar');
            return res.json();
        })
        .then(data => {
            const pokemon = {
                nombre: data.name,
                tipo: data.types[0].type.name,
                peso: data.weight,
                altura: data.height
            };
            
            return fetch('/Lab5/api_rest.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: pokemon.nombre,
                    tipo: pokemon.tipo,
                    peso: pokemon.peso,
                    altura: pokemon.altura
                })
            })
            .then(res => res.json())
            .then(data => console.log('Guardado:', data));
        })
        .catch(err => console.error(err));
}