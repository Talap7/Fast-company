import React, { useState } from "react";
import api from '../api'


export const Users = () => {

    const [users, setPeople] = useState(api.users.fetchAll())
    console.log(users)
    console.log(users.length)

    const setQualityColor = (color) => {
        return `btn btn-${color} m-2 btn-sm`
    }

    const setNotificationColor = (count) => {
        if(count === 0 ) return 'badge bg-danger'
        return 'badge bg-primary'
    }

    const handleDeletePerson = (id) =>{
        setPeople(users.filter(user => user._id !== id))
    }

    const showNotification = (count) => {
        if(count > 4) return `${count} человек тусанет с тобой сегодня`
        if(count <= 4 && count > 1) return `${count} человека тусанет с тобой сегодня`
        if(count === 1) return `${count} человек тусанет с тобой сегодня`
        if(count === 0) return `Никто с тобой не тусанет`
    }

    const renderRows = () => {
        if(users.length === 0 ) {
        return <h1><span className={setNotificationColor(users.length)}>{showNotification(users.length)}</span></h1>
        }
        return <>
        <h1><span className={setNotificationColor(users.length)}>{showNotification(users.length)}</span></h1>
        <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
      
          {users.map(user => (<tr key={user._id}>
              <th scope='row'>{user.name}</th>
              <td>{user.qualities.map(quality => <button key={quality._id} className={setQualityColor(quality.color)} >{quality.name}</button>)}</td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate}</td>
              <td><button className="btn btn-danger"
              onClick={() => handleDeletePerson(user._id)}
              >Delete</button></td>
          </tr>))}
      
        </tbody>
      </table>
      </>
    }

    return (
        <>

        {/* <table className="table">
  <thead>
    <tr>
      <th scope="col">Имя</th>
      <th scope="col">Качества</th>
      <th scope="col">Профессия</th>
      <th scope="col">Встретился, раз</th>
      <th scope="col">Оценка</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>

    {users.map(user => (<tr key={user._id}>
        <th scope='row'>{user.name}</th>
        <td>{user.qualities.map(quality => <button key={quality._id} className={setQualityColor(quality.color)} >{quality.name}</button>)}</td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}</td>
        <td><button className="btn btn-danger"
        onClick={() => handleDeletePerson(user._id)}
        >Delete</button></td>
    </tr>))}

  </tbody>
</table> */}

    {renderRows()}
        </>
    )
}


