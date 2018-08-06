import React, { Component } from 'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component {
    render() {
        return (
            <div className=''>
                <h3 className='center'>Your Timeline</h3>
                <ul className='dashboard-list'>
                    {this.props.userList.map((user) => {
                        return (
                            <li  className='tweet' style={{marginBottom: '20px'}}>
                                <div className='col-md-3'>
                                    <img src={user.avatarURL}/>
                                </div>
                                <div className='col-md-6'>
                                <div className='question'> {user.name}</div>

                                <div className='question'>Answered Question:  {Object.keys(user.answers).length}</div>
                                <div className='question'>Created Question:  {user.questions.length}</div>
                                </div>
                                <div className='col-md-3'>
                                    <div className='question'>Score: {user.total}</div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

function mapStateToProps ({ users }) {
    const userList = Object.keys(users).map((id) => {
        return {
            ...users[id],
            total: Object.keys(users[id]['answers']).length + users[id]['questions'].length
        }
    });
    userList.sort(function (a, b) {
        return b.total - a.total;
    });

    return {
        userList,
    }
}

export default connect(mapStateToProps)(LeaderBoard)