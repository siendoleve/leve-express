const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const { authRouter } = require('../routes/auth.routes');
const { db } = require('../database/config');
const { usersRouter } = require('../routes/user.routes');
const buyRouter = require('../routes/buy.routes');
const clientRouter = require('../routes/client.routes');
const lotRouter = require('../routes/lot.routes');
const productRouter = require('../routes/product.routes');
const incomeRouter = require('./../routes/income.routes');
const economicAssetRouter = require('./../routes/economicAssets.routes');
const spentRouter = require('./../routes/spent.routes');
const spentPerLotRouter = require('./../routes/spentPerLot.routes');
const typeLotRouter = require('./../routes/typeLot.routes');
const spentTypeRouter = require('./../routes/spentType.routes');
const reportRouter = require('./../routes/reports.routes');
const path = require('path');

const AppError = require('../utils/appError');
const globalErrorHandler = require('../controllers/error.controller');
const initModel = require('./init.model');

//1. CREAMOS UNA CLASE

class Server {
  constructor() {
    //DEFINIMOS LA APLICACIÓN DE EXPRESS Y SE LA ASIGNAMOS A LA PROPIEDAD APP
    this.app = express();
    //DEFINIMOS EL PUERTO QUE LO TENEMOS EN LOS ENVIROMENTS
    this.port = process.env.PORT || 3000;
    this.limiter = rateLimit({
      max: 10000,
      windowMs: 60 * 60 * 1000,
      message: 'Too many request from this IP, please try again in an hour!',
    });
    //DEFINIMOS LOS PATHS DE NUESTRA APLICACIÓN
    this.paths = {
      auth: '/api/v1/auth',
      user: '/api/v1/user',
      buy: '/api/v1/buy',
      client: '/api/v1/client',
      lot: '/api/v1/lot',
      product: '/api/v1/product',
      income: '/api/v1/income',
      economicAsset: '/api/v1/economic-asset',
      spent: '/api/v1/spent',
      spentPerLot: '/api/v1/spent-per-lot',
      typeLots: '/api/v1/typelots',
      spentType: '/api/v1/spent-type',
      reports: '/api/v1/report',
    };

    //LLAMO EL METODO DE CONEXION A LA BASE DE DATOS
    this.database();

    //INVOCAMOS EL METODO MIDDLEWARES
    this.middlewares();

    //INVOCAMOS EL METODO ROUTES
    this.routes();
  }

  //MIDDLEWARES
  middlewares() {
    this.app.use(helmet());

    this.app.use(xss());

    this.app.use(hpp());

    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }

    this.app.use(
      express.static(path.join(__dirname, 'public'), {
        setHeaders: (res, filePath) => {
          if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
          }
        },
      })
    );

    this.app.use('/api/v1', this.limiter);
    //UTILIZAMOS LAS CORS PARA PERMITIR ACCESSO A LA API
    this.app.use(cors());
    //UTILIZAMOS EXPRESS.JSON PARA PARSEAR EL BODY DE LA REQUEST
    this.app.use(express.json());
  }

  //RUTAS
  routes() {
    //utilizar las rutas de autenticacion
    this.app.use(this.paths.auth, authRouter);
    //utilizar las rutas de usuarios
    this.app.use(this.paths.user, usersRouter);
    this.app.use(this.paths.buy, buyRouter);
    this.app.use(this.paths.client, clientRouter);
    this.app.use(this.paths.lot, lotRouter);
    this.app.use(this.paths.product, productRouter);
    this.app.use(this.paths.income, incomeRouter);
    this.app.use(this.paths.economicAsset, economicAssetRouter);
    this.app.use(this.paths.spent, spentRouter);
    this.app.use(this.paths.spentPerLot, spentPerLotRouter);
    this.app.use(this.paths.typeLots, typeLotRouter);
    this.app.use(this.paths.spentType, spentTypeRouter);
    this.app.use(this.paths.reports, reportRouter);

    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
      );
    });

    this.app.use(globalErrorHandler);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.log(error));

    // relations
    initModel();

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(error => console.log(error));
  }

  //METODO PARA ESCUCHAR SOLICITUDES POR EL PUERTO
  listen() {
    this.app.listen(this.port, () => {
      console.log('Server is running on port', this.port);
    });
  }
}

//2. EXPORTAMOS EL SERVIDOR
module.exports = Server;
