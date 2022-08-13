import React, { useEffect, useState } from 'react'

import './Event.css'
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import ModalUser from '../../components/Header/ModalUser';
import EventList from "../../components/Event/EventList"
import ModalWallet from '../../components/Header/ModalWallet';

import { useLazyQuery } from '@apollo/client';

import { useAccountStore } from '../../context/AccountProvider';
import LoadingField from '../../components/LoadingField/LoadingField';
import EventNotFound from '../../components/Event/EventNotFound';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Checkbox } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { EventInterface, GET_AVAILABLE_EVENTS_BY_USER, GET_EVENTS_BY_USER } from '../../api/queries/getEvents';
import AddEventBtn from '../../components/Event/AddEventBtn';

const EventPage: React.FC = observer((): React.ReactElement => {

  const userData = useAccountStore()
  const [isCheck, setCheck] = useState<boolean>(false);
  const [events, setEvents] = useState<EventInterface[]>([])
  const [isWalletModal, setWalletModal] = useState<boolean>(false);
  const [isUserModal, setUserModal] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate()

  const handleCreateEvent = () => {
    navigate('/event/create_event')
  }

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheck(true);
    }
    else {
      setCheck(false);
    }
  }
  const [loadAvalableEvents, { loading, error }] = useLazyQuery(GET_AVAILABLE_EVENTS_BY_USER, {
    variables:{
      userName: userData.store.account.user
    },
    onCompleted: (data) => {
      setEvents(data.events);
    },
    fetchPolicy: "no-cache" 
  });
  const [loadAllEvents, { loading: loading2, error: error2 }] = useLazyQuery(GET_EVENTS_BY_USER, {
    variables:{
      userName: userData.store.account.user
    },
    onCompleted: (data) => {
      setEvents(data.events);
    },
    fetchPolicy: "no-cache" 
  });

  useEffect(() => {
    if (isCheck) {
      loadAvalableEvents();
    }
    else {
      loadAllEvents()
    }
  }, [isCheck])

  return (
    <div className='event-content wrap border-x-only relative'>
      {isWalletModal && (
        <ModalWallet setWalletModal={setWalletModal} /> 
      )}
      {isUserModal && (
        <ModalUser setUserModal={setUserModal} />
      )}
      <section id="header" className='fixed-comp fixed top-0 py-6'>
        <div className='w-11/12'>
          <Header setWalletModal={setWalletModal} setUserModal={setUserModal} />
        </div>
      </section>

      <div className='container'>
        <section className='mt-28'>
          <h3 className='text-2xl font-bold'>Event</h3>
        </section>
        <section className='mt-3'>
          {(loading || loading2) 
          ? 
            <div className='mt-12'>
              <LoadingField />
            </div>
          :
            (error || error2) 
            ? 
              <p>Error: Cannot load events!</p>
            : 
              <article>
                {events.length > 0
                ?
                  <>
                    <div className='mt-3'><EventList events={events} /></div>
                    <AddEventBtn />
                  </>
                :
                  <EventNotFound redirect={handleCreateEvent}/>
                }
              </article>     
          }
          
        </section>
        <section className='mt-6 flex flex-col flex-1'>
        </section>
      </div>

      <section
        className='fixed-comp fixed bottom-0 pt-4 pb-3 border-t 
        border-solid border-gray-300 rounded-t-3xl'
      >
        <div className='w-11/12'>
          <Footer activePage='event' />
        </div>
      </section>
    </div>
  )
});

export default EventPage