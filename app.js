var botao = document.querySelector('#app form button')
var campoCep = document.querySelector('#app form input')
var resultado = document.querySelector('#app main')


botao.addEventListener('click', executar)

function executar(event){
    event.preventDefault()
    
    var cep = campoCep.value
    cep = cep.replace(' ', '')
    cep = cep.replace('.', '')
    cep = cep.trim()

    axios.get('https://viacep.com.br/ws/' + cep + '/json/')
    .then(function(response){
        if(response.data.erro){
            throw new Error('CEP inválido!')
        }

        resultado.innerHTML = ''

        criarLinha(response.data.logradouro)
        criarLinha(response.data.bairro)
        criarLinha(response.data.localidade + ' - ' + response.data.uf)

    })
    .catch(function(error){
        resultado.innerHTML = ''
        criarLinha('CEP inválido! Tente novamente.')
        console.log(error)
    })
}

function criarLinha(text){
    var line = document.createElement('p')
    var text = document.createTextNode(text)

    line.appendChild(text)
    resultado.appendChild(line)
}