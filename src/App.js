import React, { Component} from 'react';
import {Route, Link} from 'react-router-dom'
import './App.css';
import MainSidebar from './MainSidebar/MainSidebar'
import MainMain from './MainMain/MainMain'
import NoteSidebar from './NoteSidebar/NoteSidebar'
import NoteMain from './NoteMain/NoteMain'


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className='Header__app'>
          <Link to={'/'}>
            <h1>Noteful</h1>
          </Link>
        </header>
        <div className='container__app'>
          <div className='sidebar__app'>
            <Route 
              exact
              path='/'
              component={MainSidebar}/>
            <Route
             path='/folder/:folder__id'
             component={(props) => {
               return (
                <MainSidebar folder__id={props.match.params.folder__id}/>
               )
             }}/>
             <Route 
             path='/note/:note__id/:folder__id'
             component={(props) => {
               console.log(props)
                return (
                  <NoteSidebar 
                  folder__id={props.match.params.folder__id}
                  history={props.history} />
                )
             }}/>
          </div>
          <div className='main__app'>
            <Route
              exact
              path='/'
              component={MainMain}/>
             <Route
             path='/folder/:folder__id'
             component={(props) => {
               return (
                <MainMain folder__id={props.match.params.folder__id}/>
               )
             }}/>
             <Route 
             path='/note/:note__id'
             component={(props) => {
               return (
                 <NoteMain note__id={props.match.params.note__id}/>
               )
             }}/>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
