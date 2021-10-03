import Loader from 'react-loader-spinner';
import { Component } from 'react';
import s from './Loader.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

class LoaderApp extends Component {
  render() {
    return (
      <div className={s.LoaderContainer}>
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      </div>
    );
  }
}

export default LoaderApp;
