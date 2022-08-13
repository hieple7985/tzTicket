import { useQuery } from '@apollo/client'
import { observer } from 'mobx-react-lite'
import React, { useState, memo } from 'react'
import { FaUser } from 'react-icons/fa'

import { TbTicket } from 'react-icons/tb'
import {TicketInterface, GET_TICKETS_BY_EVENT } from '../../../api/queries/getTickets'
import { useAccountStore } from '../../../context/AccountProvider'


const EventListOwner:  React.FC<{id: number}> = observer(({id}): React.ReactElement => {
  const userData = useAccountStore()

  const [tickets, setTickets] = useState<TicketInterface[]>([]);
  useQuery(GET_TICKETS_BY_EVENT, {
    variables: {
      ownerName: userData.store.account.user,
      eventID: id,
    },
    onCompleted: (result) => {
      setTickets(result.tickets);
    }
  });
  return (
    <>
      {
        tickets.map((ele: TicketInterface) =>

          <div key={ele.id} className='event-detail-ticket w-full mb-4'>
            <div className='total-event p-3'>
              <div className='flex justify-between'>
                <div className='flex primaryColor-icon font-semibold'>
                  <i className='mr-2  self-center'>
                    <TbTicket />
                  </i>
                  Ticket ID
                </div>
                <div>
                  {ele.id}
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='flex primaryColor-icon font-semibold'>
                  <i className='mr-2  self-center'>
                    <FaUser />
                  </i>
                  Owner
                </div>
                <div>
                  {ele.ticketOwner}
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
});

export default memo(EventListOwner)