import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import UserInfomation from '../../components/User/UserInfo/UserInfo';
import StatisticContent from '../../components/User/UserStatistics/StatisticContent';
import StatisticHeader from '../../components/User/UserStatistics/StatisticHeader';


import Loading from '../../components/Loading/Loading';
import ErrorPage from '../../components/Error/Error';

import { useAccountStore } from '../../context/AccountProvider';
import { observer } from 'mobx-react-lite';
import { EventInterface, GET_EVENTS_BY_USER } from '../../api/queries/getEvents';
import { TicketInterface, GET_BOUGHT_TICKETS_BY_OWNER } from '../../api/queries/getTickets';
import { FavouriteTicketListInterface, GET_FAVOURITE_TICKET_LIST_BY_USER } from '../../api/queries/getFavouriteTicketList';



const User: React.FC = observer((): React.ReactElement => {
  const userData = useAccountStore()
  const {userName} = useParams()

  const [statType, setStatType] = useState('issued');
  const [issuedEvents, setIssuedEvents] = useState<EventInterface[] | undefined>()
  const [boughtTickets, setBoughtTickets] = useState<TicketInterface[] | undefined>()
  const [favouriteList, setFavouriteList] = useState<FavouriteTicketListInterface[]>([]);

  const { loading: loadingEvent, error: errorEvent} = useQuery(GET_EVENTS_BY_USER, {
    variables: {
      userName: userName,
    },
    skip: userName === null,
    onCompleted: (data) => {
      setIssuedEvents(data.events);
    },
    fetchPolicy: "no-cache"
  });

  const { loading: loadingBought, error: errorBought } = useQuery(GET_BOUGHT_TICKETS_BY_OWNER, {
    variables: {
      ownerName: userName,
    },
    skip: userName === null,
    onCompleted: (data) => {
      setBoughtTickets(data.tickets);
    },
    fetchPolicy: "no-cache"
  });

  // const {loading: loadingSold, error: errorSold, data: dataSold} = useQuery(getUserStatistic, {
  //   variables: {
  //     id: userData.store.account.id,
  //   },
  //   onCompleted: (data) => {
  //     setUserStatis(data.userData[0])
  //   },
  //   fetchPolicy: "no-cache"
  // })

  const {loading: loadingFavourite, error: errorFavourite} = useQuery(GET_FAVOURITE_TICKET_LIST_BY_USER, {
    variables: {
      userID: userData.store.account.id,
      userName: userData.store.account.user,
    },
    onCompleted: (data) => {
      setFavouriteList(data.collection);
    },
    fetchPolicy: "no-cache"
  })


  if (loadingEvent || loadingBought  || loadingFavourite) return <Loading />;

  if (errorEvent || errorBought || errorFavourite) {
    console.log(errorEvent || errorBought || errorFavourite);
    return <ErrorPage />
  }

  if (userData.store.account.user && userData.store.account.user !== userName) return <ErrorPage />

  return (
    <>
      {userData && issuedEvents && boughtTickets &&
        <div className='wrap border-x-only relative'>
          <div className='container relative'>
            {/* Header */}
            <section id="header" className='fixed-comp fixed top-0 py-6'>
              <div className='w-11/12'>
                <Header isUserPage={true} />
              </div>
            </section>
            {/* User Info */}
            <section id="user-info" className='flex flex-col items-center mt-24'>
              <UserInfomation/>
            </section>
            {/* User Statistics */}
            <section className='mt-6'>
              <StatisticHeader 
                statType={statType} 
                setStatType={setStatType} 
                issuedEventAmount={issuedEvents.length}
                boughtTicketsAmount={boughtTickets.length}
                totalFavourite={favouriteList.length}
              />
              <StatisticContent 
                statType={statType} 
                issuedEvents={issuedEvents} 
                boughtTickets={boughtTickets}
                favouriteTickets={favouriteList}
              />
            </section>
            {/* Footer */}
            <section 
              id="footer" 
              className='fixed-comp fixed bottom-0 pt-4 pb-3 
              border-t border-solid border-gray-300 rounded-t-3xl'
            >
              <div className='w-11/12'>
                <Footer activePage='user' />
              </div>
            </section>
          </div>
        </div>
      }
    </>
  )
});

export default User