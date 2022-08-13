import React, { memo } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { AiFillPlusCircle } from 'react-icons/ai'

const AddEventBtn: React.FC = (): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate()

  const handleCreateEvent = () => {
    navigate('/event/create_event')
  }
  return (
    <div className='w-full flex justify-end z-40'>
      <button type='button' onClick={handleCreateEvent} className="event-add-btn">
        <p className='ml-4 mr-2 text-primaryColor font-semibold text-lg'>Add event</p>
        <i className='text-primaryColor'><AiFillPlusCircle /></i>
      </button>
    </div>
  )
}

export default memo(AddEventBtn)