import React from 'react'
import styles from "../styles/detail.module.scss";

const UserBox = ({user}) => {
  return (
    <div className={styles.userBox}>
        <img src={user?.photo_url || "/static/img/ozodbek.png"} alt="user img" />
        <h3>{user?.full_name}</h3>
    </div>
  )
}

export default UserBox