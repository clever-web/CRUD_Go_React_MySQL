import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ListUser from './components/ListUser';
import ViewUser from './components/ViewUser';
import CreateUserList from './components/CreateUser';


function App() {
  return (
    <div>
      <Header />
      <Router>
        
          <div className="container">
            {/* <Switch> */}
            <Routes>
              <Route path="/" element={ <ListUser /> }></Route>
              {/* <Route path="/users" component=
                {ListUserComponent}></Route> */}
              <Route path="/add-user/:id" element={ <CreateUserList /> }></Route>
              <Route path="/view-user/:id" element={ <ViewUser /> }></Route>
            {/* </Switch> */}
            </Routes>
          </div>
        
      </Router>
      <Footer />
    </div>
  );
}

export default App;
