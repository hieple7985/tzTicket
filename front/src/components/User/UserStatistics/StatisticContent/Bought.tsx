import React, { memo } from 'react'
import { TicketInterface } from '../../../../api/queries/getTickets';
import BoughtTickets from '../../../Tickets/BoughtTicketList/BoughtTickets';


interface Props {
  tickets?: TicketInterface[];
}

const Bought: React.FC<Props> = ({tickets}: Props): React.ReactElement => {
  return (
    <article className='mb-40 mt-10'>
      {tickets && tickets.length > 0
        ? <>
            <BoughtTickets tickets={tickets}/>
          </>
        : <div className='stat-null'>You haven’t bought any ticket yet.</div>
      }
    </article>
  )
}

export default memo(Bought)