import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleLoggedInData, handleQuestionData } from '../actions/shared'
import NewQuestion from './NewQuestion'
import LoadingBar from 'react-redux-loading'
import QuestionInfo from './QuestionInfo'
import LeaderBoard from './LeaderBoard'
import Nav from './Nav'
import Login from './Login';
import Home from './Home';


class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleLoggedInData());
    this.props.dispatch(handleQuestionData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            {this.props.loading === true
              ? null
              : <div>
                  <Route exact path='/login' component={Login} />
                  {this.props.authedUser && (
                    <Fragment>
                      <Nav />
                      <Switch>
                          <Route path='/home/:id' exact component={Home} />
                          <Route path='/questions/:id' exact component={QuestionInfo} />
                          <Route path='/leaderboard' exact component={LeaderBoard} />
                          <Route path='/add' exact component={NewQuestion} />
                      </Switch>
                    </Fragment>
                  )}
                  <Redirect from='*' to='/login' />
                </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ users, authedUser }) {
  return {
    loading: users === null,
    authedUser,
  }
}

export default connect(mapStateToProps)(App)