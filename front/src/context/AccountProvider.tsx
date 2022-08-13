import { useLazyQuery, useMutation } from '@apollo/client';
import { TezosToolkit } from '@taquito/taquito';
import { useWallet } from '@tezos-contrib/react-wallet-provider';
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { GET_DATA_ACCOUNT } from '../api/queries/getDataAccount';
import Loading from '../components/Loading/Loading';
import { AccountStore } from '../store/AccountStore';
import { CREATE_USER } from '../api/mutations/createUser';
import Error from '../components/Error/Error';

interface Props {
  store: AccountStore,
  children: React.ReactElement,
}

interface CurrentAccount {
  store: AccountStore,
}

const AccountContext = createContext<CurrentAccount>({
  store: new AccountStore(),
});

const AccountProvider: React.FC<Props> = ({store, children}) => {
  const [checked, setCheck] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const [DataAccount, {loading, error}] = useLazyQuery(GET_DATA_ACCOUNT);
  const [CreateNewAccount, {loading: loading2, error: error2}] = useMutation(CREATE_USER);
  const { connected, activeAccount } = useWallet();
  const Tezos = new TezosToolkit('https://mainnet.api.tez.ie');

  const [balance, setBalance] = useState<string>('')

  const checkTezos = async(account: string): Promise<void> => {
    const accountFetch = await DataAccount({
      variables: {
        wallet_address: account,
      },
    });

    if (accountFetch && accountFetch.data.UserNonce.length > 0) {
      store.addAccount({
        ...store.account,
        user: account,
        id: accountFetch.data.UserNonce[0].id,
        balance: Number(balance),
        fetch: true
      })
    }
    else {
      console.log('Create new Account');
      const accountFetchNewAccount = await CreateNewAccount({
        variables: {
          wallet_address: account,
        },
      });

      if (accountFetchNewAccount) {
        console.log('Account is ready', accountFetchNewAccount);
        store.addAccount({
          ...store.account,
          user: account,
          id: accountFetchNewAccount.data.createWallet.user_id,
          balance: Number(balance),
          fetch: true
        });
      }
    }
    localStorage.setItem("isLogin", 'true');
    setCheck(true);
  }

  useEffect(() => {
    if (connected && activeAccount) {
      Tezos.tz
      .getBalance(activeAccount.address)
      .then((balance) => setBalance(`${balance.toNumber() / 1000000}`))
      .catch((error) => console.log(JSON.stringify(error)));
    }
    else {
      const isLogin = localStorage.getItem('isLogin');
      if (!connected && !isLogin) {
        navigate('/login');
        setCheck(true);
      }
    }
    if (connected && activeAccount && balance) {
      checkTezos(activeAccount.address);
    }

  }, [connected, activeAccount, balance]);

  if (loading || loading2) return <Loading />

  if (error || error2) return <Error />

  return (
    <AccountContext.Provider value={{store}}>
      {
        !checked ? <Loading /> : children
      }
    </AccountContext.Provider>
  )
};

export const useAccountStore = () => useContext(AccountContext);

export default AccountProvider;