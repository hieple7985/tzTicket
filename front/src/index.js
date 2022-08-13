import React from "react";
import ReactDOM from "react-dom";
import App from "./App.tsx";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from 'react-router-dom';
import { WalletProvider } from '@tezos-contrib/react-wallet-provider'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontSize: 20,
    fontFamily: "Source Sans Pro, sans-serif",
  },
  palette: {
    primary: {
      main: '#456FE3',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <WalletProvider name="nft-ticket-system" clientType='beacon'>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <App />
          </LocalizationProvider>
        </ThemeProvider>
      </WalletProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
