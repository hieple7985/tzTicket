import React, { memo } from 'react'
import { TicketInterface } from '../../../api/queries/getTickets'

import BoughtTicketsItem from './BoughtTicketsItem';

interface Props {
  tickets: TicketInterface[];
}

const BoughtTickets: React.FC<Props> = ({tickets}: Props): React.ReactElement => {
  return (
    <>
      {tickets
      ?
        tickets.map(ticket => (
          <div key={ticket.id}>
            <BoughtTicketsItem ticket={ticket} />
          </div>
        ))
      :
        <div>Error: Cannot load tickets!</div>
      }
    </>
  )
}

export default memo(BoughtTickets)