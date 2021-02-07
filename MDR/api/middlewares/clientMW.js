const Joi = require("joi");
var Client = require("../../models/client");
const bcrypt = require("bcryptjs");
var repository = require("../../repository");
const jwt = require("jsonwebtoken");
var config = require("../../config");
var handlebars = require("handlebars");
var nodemailer = require("nodemailer");
var fs = require("fs");

const registerValidation = (reqBodyData) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(8).required().email(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(reqBodyData);
};

const loginValidation = (reqBody) => {
  const schema = Joi.object({
    email: Joi.string().min(8).required().email(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(reqBody);
};

// const attachAllClientsUsingDTO = async (req, res, next) => {

//     var DTOclients = [];
//     var allClients = await repository.findAllClients();

//     allClients.map(client => {
//         DTOclients.push(attachAllClientsUsingDTO(client));
//     });
//     req.allClients = DTOclients;

//     return next();
// };

const attachAllClients = async (req, res, next) => {
  req.allClients = await repository.findAllClients();
  return next();
};

const deleteClientAccount = async (req, res, next) => {
  Client.deleteOne({ _id: req.params.client_id }, function (err, client) {
      if (err) {
          return next(err);
      }
      return next();
  });
};

const sendEmail = (email) => {

    fs.readFile(__dirname + "/emailContent.html", { encoding: "utf-8" }, function (error, html) {

        var template = handlebars.compile(html);
        var replacements = { username: "LAPR5-G1"};
        var htmlToSend = template(replacements);
    
        var transporter = nodemailer.createTransport({
            service: config.service,
            auth: {
                user: config.source,
                pass: config.acess_key,
            }
        });
        var mailOptions = {
            from: config.source,
            to: email,
            subject: config.subject,
            html: htmlToSend,
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    }
  );
};

const registerClient = async (req, res, next) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const emailExists = await Client.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).send("This e-mail is already registred.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const client = new Client({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  await sendEmail(req.body.email);

  repository.registerNewClient(client);
  return next();
};

const login = async (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const client = await Client.findOne({ email: req.body.email });
  if (!client) {
    return res.status(400).send("E-mail not found");
  }

  const validPass = await bcrypt.compare(req.body.password, client.password);
  if (!validPass) {
    return res.status(400).send("Invalid password.");
  }

  //Create and assign a json web token
  const token = jwt.sign({ _id: client._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
};

module.exports.registerClient = registerClient;
module.exports.login = login;
//module.exports.attachAllClientsUsingDTO = attachAllClientsUsingDTO;
module.exports.attachAllClients = attachAllClients;
module.exports.deleteClientAccount = deleteClientAccount;
