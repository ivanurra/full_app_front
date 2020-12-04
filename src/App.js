import React from 'react';
import './App.css';

//Componentes
import SignUp from './components/SignUp';
import Home from './components/Home';
import AllMangas from './components/AllMangas';
import IndividualManga from './components/IndividualManga';
import LogIn from './components/LogIn';
import Profile from './components/Profile';

//Dependencias
import { Link, Route, Redirect } from 'react-router-dom';
import UserService from './services/UserService';

class App extends React.Component {
	state = {
		isLogged: {},
		newUser: { username: '', password: '' },
    loggingUser: { username: '', password: '' },
	};

	service = new UserService();

	//SIGNUP CONFIG
	submitSignUp = (event) => {
		event.preventDefault();
    this.service.signup(this.state.newUser.username, this.state.newUser.password)
			.then((result) => {
				console.log(result);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	changeHandlerSignUp = (_eventTarget) => {
		this.setState({ newUser: { ...this.state.newUser, [_eventTarget.name]: _eventTarget.value } });
	};

	//LOGIN CONFIG
	submitLogIn = (event) => {
		event.preventDefault();
		this.service
			.login(this.state.loggingUser.username, this.state.loggingUser.password)
			.then(() => {
				this.checkIfLoggedIn()
			})
			.catch((err) => {
				console.log('Sorry something went wrong on submit.', err);
			});
	};

	changeHandlerLogIn = (_eventTarget) => {
		this.setState({ loggingUser: { ...this.state.loggingUser, [_eventTarget.name]: _eventTarget.value } });
	};

	checkIfLoggedIn = () => {
    this.service.loggedin()
    .then((result)=>{
      this.setState({isLogged: result})
    })
  };
  
  logOut = ()=>{
    this.service.logout()
    .then((result)=>{
      console.log(result)
      this.checkIfLoggedIn()
    })
    .catch((err)=>{
      console.log(err)
    })
  }

	componentDidMount() {
		this.checkIfLoggedIn();
	}

	render() {
		return (
			<div className="App">
				<Link to="/">Home Page</Link>
				<br />
				<Link to="/all-mangas">All Mangas</Link>
				<br />
				{!this.state.isLogged.username && <Link to="/signup">Sign Up</Link>}
				<br />
				{!this.state.isLogged.username && <Link to="/login">Log In</Link>}
				<br />
				{this.state.isLogged.username && <Link to="/profile">Profile</Link>}
				


				<Route exact path="/" render={()=><Home logOut={this.logOut} isLogged={this.state.isLogged} />} />
				<Route exact path="/all-mangas" component={AllMangas} />
				{/* <Route path="/all-mangas/:id" render={()=><Individualmanga} /> */}
				<Route path='/all-mangas/:id' render={(props) => {
          return(
            <IndividualManga {...props} isLogged={this.state.isLogged}/>
          )
        }} />
				<Route
					path="/signup"
					render={() => (
						!this.state.isLogged.username
							? <SignUp submitSignUp={this.submitSignUp} newUser={this.state.newUser} changeHandlerSignUp={this.changeHandlerSignUp}/>
							: <Redirect to='/' />
					)}
				/>
				<Route
					path="/login"
					render={() => (
						<LogIn
							submitLogIn={this.submitLogIn}
							loggingUser={this.state.loggingUser}
							changeHandlerLogIn={this.changeHandlerLogIn}
						/>
					)}
				/>
				{this.state.isLogged._id && <Route path="/profile" render={()=><Profile isLogged={this.state.isLogged}/>}/>}
				
			</div>
		);
	}
}

export default App;

//Componentes
//Props
//Rutas
//Autentificación (passport)
//Deployment
//Consultas a APIs externas
