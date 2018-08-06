import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setLoggedInUser } from '../actions/authedUser'

class Login extends Component {

    setLoggedInUser(e, user){
        e.preventDefault();
        this.props.dispatch(setLoggedInUser(user));
        this.props.history.push(`/home/${user}`)
    }
    render() {
        const {users = {}} = this.props;
        const allUsers = Object.keys(users);
        return (
            <div>
                <h3 className='center'>Please click to Login</h3>
                <ul className='dashboard-list'>
                    {allUsers.map((user) => {
                        console.log('user', user);
                        return (
                            <li key={users[user]} className="center login" onClick={(e) => this.setLoggedInUser(e, user)}>
                                <div id={user} >
                                    <div><img src={users[user]['avatarURL']}/></div>
                                    <div className="center">{users[user]['name']} </div></div>
                            </li>
                        )
                    })
                    }
                </ul>
            </div>
        )
    }
}

function mapStateToProps (state) {
    const { users } = state;
    console.log('state', state);
    return {
        users
    }
}

export default connect(mapStateToProps)(Login)