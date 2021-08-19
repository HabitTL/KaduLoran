


const busca = document.getElementById('busca');
const enviar = document.getElementById('enviar');
const aleatorio = document.getElementById('aleatorio');
const prato = document.getElementById('prato');
const resultado = document.getElementsByClassName('resultado-busca');
const simples = document.getElementById('prato-simples');


function buscarPrato(e){
    e.preventDefault();
    
    
    simples.innerHTML="";
    
    
    
    const term = busca.value;
    
    
    
   if(term.trim){
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`;
        fetch(url).then(response => response.json())
                  .then((data) => {
                  resultado.innerHTML = `<h2> Buscando ${term}`;
                  if(data.prato === null){
                  resultado.innerHTML = `<h2> Aqui está ${term}`;
                }
                else{
                    simples.innerHTML = data.prato.map((pratos) => `
                    <div class="pratos">
                    <img src="${pratos.strMealThumb}" alt="${pratos.strMeal}"
                    <div class="info" data-meaLID="${pratos.strMeal}">
                    <h2> ${pratos.srtMeal}</h2>
                    </div>
                    </div>`)
                    .join("");
                }
                });
                
                else{
                    alert('Campo vazio');
                }
    }
    
    function getMealById(pratoID){
        fetch(`https://themealdb.com/api/json/v11lookup.php?i=${pratoID}`)
                .then(response => response.json())
                .then((data) => {
                const meal = data.meal[0];
                addMealtoDom(meal);
        });
    }

} 




enviar.addEventListener('enviar',buscarPrato);
prato.addEventListener('click', e => {
    const info = e.path.find(item =>{
        if(item.classList){
            return item.classList.contains("info");
        }
        else{
            return false;
        }
    });
    
    if(info){
        const pratoID = info.getAttribute("data");
        getMealById(pratoId);
    }
});