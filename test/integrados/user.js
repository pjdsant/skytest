/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable max-len */
process.env.NODE_ENV = 'test';

const User = require('../../api/models/user');

// Aqui estamos declarando as dependências necessárias para realizar os nossos testes!
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');

chai.use(chaiHttp);

// Aqui é o bloco principal que executará o nossos testes:
describe('Usuarios', function() {
  beforeEach(function(done) {
    // Sempre depois de executar o nosso teste, iremos limpar a nossa base de dados:
    User.remove({}, function() {
      done();
    });
  });
  /**
 * Teste da rota: /POST
 */
  describe('/POST user', function() {
    it('Deve Criar um Usuario', function(done) {
      const user = {
        id: '',
        nome: 'Dulceneia',
        email: 'dulce@gmail.com',
        senha: 'pjs123456',
        telefones: [
          {
            numero: '974477078',
            ddd: '11',
          },
          {
            numero: '24495447',
            ddd: '11',
          },
        ],
      };
      chai.request(server)
          .post('/user/signup/')
          .send(user)
          .end(function(error, res) {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.user.should.have.property('id');
            res.body.user.should.have.property('nome');
            res.body.user.should.have.property('email');
            res.body.user.should.have.property('senha');
            done();
          });
    });
  });


  /**
 * Teste da rota: /GET/:id
 */
  describe('/GET/:id user', function() {
    it('Deve retornar um user dado o id', function(done) {
      const user = {
        nome: 'Dulceneia',
        email: 'dulce@gmail.com',
        senha: 'pjs123456',
        telefone: [
          {
            numero: '912345678',
            ddd: '11',
          },
          {
            numero: '912345670',
            ddd: '21',
          },
        ],
      };
      user.save(function(error, user) {
        chai.request(server)
            .get('/user/' + user.id)
            .send(user)
            .end(function(error, res) {
              res.should.be.a('object');
              res.body.should.have.property('titulo');
              res.body.should.have.property('autor');
              res.body.should.have.property('paginas');
              res.body.should.have.property('ano');
              res.body.should.have.property('_id').eql(user.id);
              done();
            });
      });
    });
  });
});
