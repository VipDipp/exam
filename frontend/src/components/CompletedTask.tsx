import React from 'react'
import { updateTask } from '../api/api'

const CompletedTask: React.FC<any> = ({name, taskId, status, id, description}) => {
    return (
      <div>
          <input type="radio" onClick={async() => {await updateTask(name, "open", description, id, taskId)}} />
          <a className='text-xl'>{name}</a>
      </div>
    )
  }

export default CompletedTask