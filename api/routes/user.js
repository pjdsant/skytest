/* eslint-disable max-len */
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const guid = require('guid');
const checkAuth = require('../middleware/check-auth');
const updateReg = require('../utils/utils');
const User = require('../models/user');

const sessionTime = parseInt(process.env.SESSION_TIME);

router.get('/:id', checkAuth, (req, res) => {
  User.find({id: req.params.id})
      .exec()
      .then( (user) => {
        if (user.length < 1) {
          res.status(401).json({
            mensagem: 'Não autorizado',
          });
        } else {
          const token = authorization = req.headers.authorization.split(' ')[1];
          if (token != user[0].token) {
            res.status(401).json({
              mensagem: 'Não autorizado',
            });
          } else {
            let diffMin = 0;
            try {
              diffMin = Math.round(((Date.now()- user[0].ultimo_login)/1000)/60);
              console.log('diffMin1 => ' + diffMin);
            } catch (error) {
              diffMin = sessionTime + 1;
            }
            if (diffMin > sessionTime ) {
              res.status(401).json({
                mensagem: 'Sessão inválida',
              });
            } else {
              return res.status(200).json({
              // message: 'auth sucessful',
                user,
              });
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          mesangem: 'mensagem de erro',
        });
      });
});

router.post('/signup', (req, res) => {
  const sguid = guid.create();
  User.find({email: req.body.email})
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          return res.status(409).json({
            mensagem: 'E-mail já existente',
          });
        } else {
          bcrypt.hash(req.body.senha, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                mensagem: 'mensagem de erro',
              });
            } else {
              const token = jwt.sign({
                email: req.body.email,
                senha: hash,
              }, process.env.JWT_KEY,
              {
                expiresIn: '30m',
              }
              );
              const user = new User({
                // _id: new mongoose.Types.ObjectId(),
                id: sguid,
                nome: req.body.nome,
                email: req.body.email,
                senha: hash,
                telefones: req.body.telefones,
                data_criacao: Date.now(),
                data_atualizacao: Date.now(),
                ultimo_login: '',
                token: token,
              });
              user
                  .save()
                  .then((result) => {
                    console.log(result);
                    res.status(201).json({
                    // mensagem: "Usuario criado",
                      user,
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                    res.status(500).json({
                      mensagem: 'mensagem de erro',
                      error: err,
                    });
                  });
            }
          });
        }
      });
});

router.post('/signin', (req, res) => {
  User.find({email: req.body.email})
      .exec()
      .then( (user) => {
        if (user.length < 1) {
          return res.status(404).json({
            mensagem: 'Usuário e/ou senha inválidos',
          });
        }
        bcrypt.compare(req.body.senha, user[0].senha, ( err, result) => {
          if (err || !result) {
            return res.status(401).json({
              mensagem: 'Usuário e/ou senha inválidos',
            });
          }
          if (result) {
            updateReg(user[0].id);
            user.ultimo_login = Date.now();
            return res.status(200).json({
              user,
            });
          }
          res.status(401).json({
            mensagem: 'Falha de autenticacao',
          });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          mensagem: 'mensagem de erro',
        });
      });
});

module.exports = router;
