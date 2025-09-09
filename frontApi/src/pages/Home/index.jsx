import './style.css'
import Lixeira from "../../assets/lixeira.svg"

function Home() {
  const usuarios =[{
    id:1,
    nome:"Giulia",
    email:"@email.com",
    idade:18
  }]
  return(
    <div className="formu">
      <form id>
        <h1>Cadastro de Usuários</h1>
        <input name="nome" type="text"></input>
        <input name="email" type="email"></input>
        <input name="idade" type="number"></input>
        <button type="button">Cadastrar</button>
      </form>
      {usuarios.map(usuario =>(
        <div key={usuario.id} className='card'>
          <div>
            <p>Nome: {usuario.name}</p>
            <p>Email: {usuario.email}</p>
            <p>Idade: {usuario.idade}</p>
          </div>
          <button>
            <img src ={Lixeira}/>
          </button>
          </div>
      ))}
    </div>
  )
}
export default Home
