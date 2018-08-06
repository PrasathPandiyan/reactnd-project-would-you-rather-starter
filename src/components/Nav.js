import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {connect} from "react-redux";
import {logOutUser} from '../actions/authedUser';

class Nav extends Component {
    state = {
        toggle: 1,
    };

    clickTab(selectedTab) {
        if(!(selectedTab === this.state.toggle)) {
            this.setState({toggle: selectedTab})
        }
    }
    logOut =() => {
        const { dispatch } = this.props;
        dispatch(logOutUser());
    }
    render() {
        const {authedUser, users} = this.props;
        return (
        <div>
            {authedUser && (
                <div className='heading-3'> Hello {users[authedUser]['name']} </div>
            )}
            <nav >
                <ul className='tabrow'>
                    <li className={this.state.toggle === 1 ? 'selected active': ''}
                        onClick={() => { this.clickTab(1)}}>
                        <NavLink to={`/home/${authedUser}`} exact >
                            Home
                        </NavLink>
                    </li>
                    <li className={this.state.toggle === 2 ? 'selected active': ''}
                        onClick={() => { this.clickTab(2)}}>
                        <NavLink to='/add' exact activeStyle={{ color:'red' }} activeClassName='active'>
                            New Question
                        </NavLink>
                    </li>
                    <li className={this.state.toggle === 3 ? 'selected active': ''}
                        onClick={() => { this.clickTab(3)}}>
                        <NavLink to='/leaderBoard'>
                            LeaderBoard
                        </NavLink>
                    </li>
                    {authedUser && (
                        <li onClick={this.logOut} className={this.state.toggle === 4 ? 'selected active': ''}>
                            <NavLink to='/login'>
                                Logout
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
        )
    }
}

function mapStateToProps (state) {
    const { authedUser, users } = state;
    return {
        authedUser,
        users,
    }
}

export default connect(mapStateToProps)(Nav)