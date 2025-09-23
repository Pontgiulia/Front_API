import { useEffect, useState } from 'react';
//import { bubbleCursor } from "../../services/BolhaCursor.js";
//import { rainbowCursor } from "../../services/ArcoIris.js";
import { fairyDustCursor } from "../../services/fada.js";
import './style.css';
import Lixeira from "../../assets/lixeira-de-reciclagem.png";
import Lapis from "../../assets/lapis.png";
import api from "../../services/api";

function Home() {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({ nome: '', email: '', idade: '' });
  const [editingId, setEditingId] = useState(null); // ID do usuário que está sendo editado
  useEffect(() => {
    // ativa o cursor
    const cursor = fairyDustCursor({
      colors: ["#4bb4d6", "#e3cb46", "#d64bcf"], // paleta
      fairySymbol: "✴", // símbolo (pode trocar por "★", "❄", "❤", "✦", "ツ" etc.)
      zIndex: 9999,
    });

    return () => cursor.destroy(); // limpa quando desmontar
  }, []);
  // useEffect(() => {
  //   const cursor = rainbowCursor({
  //     length: 25,
  //     size: 4,
  //     zIndex: 9999,
  //   });

  //   return () => cursor.destroy(); // remove ao desmontar
  // }, []);

  // useEffect(() => {
  //   const cursor = bubbleCursor({
  //     fillColor: "#e6f1f7",   // Cor interna da bolha
  //     strokeColor: "#3a92c5", // Borda da bolha
  //     zIndex: "9999999999"    // Garantir que fique acima dos elementos
  //   });

  //   return () => {
  //     cursor.destroy(); // remove ao sair da página
  //   };
  // }, []);

  // Pegar lista de usuários
  async function getUsuarios() {
    try {
      const response = await api.get('/cadastro');
      setUsuarios(response.data);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    }
  }

  useEffect(() => {
    getUsuarios();
  }, []);

  // Atualiza o estado do formulário
  function handleChangeInput(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Cadastrar ou atualizar usuário
  async function handleCadastrar(e) {
    e.preventDefault();
    try {
      if (editingId) {
        // Atualiza usuário existente
        await api.put(`/cadastro/${editingId}`, {
          name: formData.nome,
          email: formData.email,
          idade: formData.idade
        });
        setEditingId(null);
      } else {
        // Cadastra novo usuário
        await api.post('/cadastro', {
          name: formData.nome,
          email: formData.email,
          idade: formData.idade
        });
      }

      setFormData({ nome: '', email: '', idade: '' });
      getUsuarios();
    } catch (err) {
      console.error("Erro ao cadastrar/atualizar usuário:", err);
    }
  }

  // Deletar usuário
  async function handleDelete(id) {
    try {
      await api.delete(`/cadastro/${id}`);
      getUsuarios();
    } catch (err) {
      console.error("Erro ao deletar usuário:", err);
    }
  }

  // Preenche formulário para edição
  function handleEdit(usuario) {
    setFormData({
      nome: usuario.name,
      email: usuario.email,
      idade: usuario.idade
    });
    setEditingId(usuario.id);
  }

  return (
    <div className="container">
      <div className="form-section">
        <form onSubmit={handleCadastrar}>
          <h1>{editingId ? "Editar Usuário" : "Cadastro de Usuários"}</h1>
          <input
            name="nome"
            type="text"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChangeInput}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChangeInput}
            required
          />
          <input
            name="idade"
            type="number"
            placeholder="Idade"
            value={formData.idade}
            onChange={handleChangeInput}
            required
          />
          <button type="submit">{editingId ? "Atualizar" : "Cadastrar"}</button>
        </form>
      </div>

      <div className="users-section">
        <div className="grid">
          {usuarios.map(usuario => (
            <div key={usuario.id} className="card">
              <div>
                <p><strong>Nome:</strong> {usuario.name}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>Idade:</strong> {usuario.idade}</p>
              </div>
              <div className="actions">
                <button className="delete" onClick={() => handleDelete(usuario.id)}>
                  <img src={Lixeira} alt="Deletar" />
                </button>
                <button className="update" onClick={() => handleEdit(usuario)}>
                  <img src={Lapis} alt="Atualizar" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
