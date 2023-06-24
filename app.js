const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const { authRouter } = require('./routes/auth.routes');
const { usersRouter } = require('./routes/user.routes');
const buyRouter = require('./routes/buy.routes');
const clientRouter = require('./routes/client.routes');
const lotRouter = require('./routes/lot.routes');
const productRouter = require('./routes/product.routes');
const incomeRouter = require('./routes/income.routes');
const economicAssetRouter = require('./routes/economicAssets.routes');
const spentRouter = require('./routes/spent.routes');
const spentPerLotRouter = require('./routes/spentPerLot.routes');
const typeLotRouter = require('./routes/typeLot.routes');
const spentTypeRouter = require('./routes/spentType.routes');
const reportRouter = require('./routes/reports.routes');
const path = require('path');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

const app = express();

const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(xss());
app.use(hpp());

app.use('/api/v1', limiter);

const paths = {
  auth: '',
  user: '',
  buy: '',
  client: '',
  lot: '',
  product: '',
  income: '',
  economicAsset: '',
  spent: '',
  spentPerLot: '',
  typeLots: '',
  spentType: '',
  reports: '',
};

app.use('/api/v1/auth', authRouter);
//utilizar las rutas de usuarios
app.use('/api/v1/user', usersRouter);
app.use('/api/v1/buy', buyRouter);
app.use('/api/v1/client', clientRouter);
app.use('/api/v1/lot', lotRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/income', incomeRouter);
app.use('/api/v1/economic-asset', economicAssetRouter);
app.use('/api/v1/spent', spentRouter);
app.use('/api/v1/spent-per-lot', spentPerLotRouter);
app.use('/api/v1/typelots', typeLotRouter);
app.use('/api/v1/spent-type', spentTypeRouter);
app.use('/api/v1/report', reportRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
