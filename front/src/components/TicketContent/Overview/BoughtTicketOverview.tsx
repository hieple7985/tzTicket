import React, { memo } from 'react'

import TicketCategories from './OverviewItem/TicketCategories'
import TicketTitle from './OverviewItem/TicketTitle'

import './TicketOverview.css'
import { TicketInterface } from '../../../api/queries/getTickets'

import TicketPrice from './OverviewItem/TicketPrice';
import TicketPriceUSD from './OverviewItem/TicketPriceUSD';
import { useAccountStore } from '../../../context/AccountProvider';
import { observer } from 'mobx-react-lite';

interface Props {
  ticket: TicketInterface;
}

const TicketOverview: React.FC<Props> = observer(({ticket}: Props): React.ReactElement => {
  const userData = useAccountStore();
  return (
    <section className='w-full mt-6'>
      <article className='text-sm font-semibold'>
        <TicketCategories categories={ticket.event.eventCategories} isFull={true} />
      </article>
      <article className='mt-4 text-3xl font-semibold'>
        <TicketTitle name={ticket.event.name} />
      </article>
      <article className='flex w-full justify-between mt-6'>
        <div className='overview-ticket-usage w-full flex items-center justify-between'>
          <div>
            <small className='text-gray-600 text-base'>
              #Owned by  
              <span className='text-primaryColor font-semibold'>
                {ticket.ticketOwner === userData.store.account.user 
                ? 
                  " you" 
                : 
                  ' ' + ticket.ticketOwner.substring(0, 8) + '...' + ticket.ticketOwner.substring(ticket.ticketOwner.length - 8, ticket.ticketOwner.length)}
              </span>
            </small>
          </div>
          <div className='flex-1 text-right'>
            <div className='text-3xl font-bold'>
              <TicketPrice price={ticket.price} />
              <TicketPriceUSD price={ticket.price} />
            </div>
          </div>
        </div>
      </article>
    </section>
  )
});

export default memo(TicketOverview)