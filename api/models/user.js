const mongoose = require('mongoose');

// eslint-disable-next-line new-cap
const userSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  id: {type: String, require: true},
  nome: {type: String, require: true},
  email: {type: String, require: true},
  senha: {type: String, require: true},
  telefones: [
    {
      numero: {type: String, require: true},
      ddd: {type: String, require: true},
    },
  ],
  data_criacao: Date,
  data_atualizacao: Date,
  ultimo_login: Date,
  token: String,
});

module.exports = mongoose.model('User', userSchema);
