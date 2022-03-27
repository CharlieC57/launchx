

const search = () =>{
    const value = document.getElementById("searchbar").value.toLowerCase();
    console.log(value);
    
    fetch("https://pokeapi.co/api/v2/pokemon/"+value)
    .then(res => res.json())
    .then(
        async data => {
            //const imgTemplate = `<img class="sprite" src="${data.front_default}" alt="${value} front"`
            const img = document.getElementById("sprite");
            // const shiny = document.getElementById("shiny");
            const id = document.getElementById("id");
            const name = document.getElementById("name");
            const weight = document.getElementById("weight");
            const height = document.getElementById("height");
            const hp = document.getElementById("hp");
            const flavorText = document.getElementById("flavor-text")
            const speciesData = await (await fetch("https://pokeapi.co/api/v2/pokemon-species/"+data.id)).json();
            const flavorTexts = speciesData.flavor_text_entries.filter(data => data.language.name == "es");

            //section stats:
            const atk = document.getElementById("atk");
            const def = document.getElementById("def");
            const spAtk = document.getElementById("sp-atk");
            const spDef = document.getElementById("sp-def");
            const speed = document.getElementById("speed");
            const types = document.getElementById("types");

            img.src = data.sprites.front_default;
            img.alt = data.name;
            
            weight.innerText = data.weight + " lbs";
            height.innerText = data.height + " ft";
            id.innerText = data.id;
            hp.innerText = data.stats[0].base_stat;
            name.innerText = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            flavorText.innerText = flavorTexts[Math.floor(Math.random()*flavorTexts.length)].flavor_text;

            atk.innerText = data.stats[1].base_stat;
            atk.style.width = data.stats[1].base_stat*100/200 +"%";
            def.innerText = data.stats[2].base_stat;
            def.style.width = data.stats[2].base_stat*100/200 +"%";
            spAtk.innerText = data.stats[3].base_stat;
            spAtk.style.width = data.stats[3].base_stat*100/200 +"%";
            spDef.innerText = data.stats[4].base_stat;
            spDef.style.width = data.stats[4].base_stat*100/200 +"%";
            speed.innerText = data.stats[5].base_stat;
            speed.style.width = data.stats[5].base_stat*100/200 +"%";

            let newHtml = '';
            data.types.forEach(element  => {
                console.log(element);
                newHtml+=`<div class="type ${element.type.name}">${element.type.name.toUpperCase()}</div>`
            });
            types.innerHTML = newHtml;
            console.log(newHtml);
        }
    )
}

const load = () => {
    console.log("load");
    document.getElementById("searchbutton").addEventListener("click",search);
}

document.addEventListener("DOMContentLoaded", load, false);