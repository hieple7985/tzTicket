import React, { memo } from 'react'

import Issued from './StatisticContent/Issued';
import Sold from './StatisticContent/Sold';
import Bought from './StatisticContent/Bought';
import Favorited from './StatisticContent/Favorited';


import './StatisticContent.css'
import { EventInterface } from '../../../api/queries/getEvents';
import { TicketInterface } from '../../../api/queries/getTickets';
import { FavouriteTicketListInterface } from '../../../api/queries/getFavouriteTicketList';

interface Props {
  statType: string;
  issuedEvents: EventInterface[];
  boughtTickets: TicketInterface[];
  favouriteTickets: FavouriteTicketListInterface[];
}

const StatisticContent: React.FC<Props> = (props: Props): React.ReactElement => {
  if (props.statType === 'issued') {
    return (props.issuedEvents.length > 0 ? <Issued events={props.issuedEvents} /> : <Issued />)
  }
  // else if (props.statType === 'sold') {
  //   return <Sold userStatis={props.soldStatis}/>
  // }
  else if (props.statType === 'bought') {
    return (props.boughtTickets.length > 0 ? <Bought tickets={props.boughtTickets}/> : <Bought />)
  }
  else if (props.statType === 'favorited') {
    return (props.favouriteTickets.length > 0 ? <Favorited favouriteTickets={props.favouriteTickets}/> : <Favorited />);
  }
  else return (
    <div>Error! </div>
  )
}
export default memo(StatisticContent)
