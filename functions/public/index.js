// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "",
  authDomain: "fullstackbankingapp.firebaseapp.com",
  projectId: "fullstackbankingapp",
  storageBucket: "fullstackbankingapp.appspot.com",
  messagingSenderId: "",
  appId: ""
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var auth = firebase.auth();
var firestore = firebase.firestore();

function Spa() {
  function handle(){
    auth.signOut();
  }

  const [authorized, setAuthorized] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const authStateListener = () => {
    auth.onAuthStateChanged(async (user) => {
      if (user){
        console.log(user);
        setEmail(user.email);
        return setAuthorized(true);
      }
      setEmail('');
      return setAuthorized(false);
    });
  }

  React.useEffect(() => {
    authStateListener();
  }, [authStateListener]);

  if (authorized){
    return (
      <HashRouter>
        <div>
          <NavBar/>        
          <button className="btn btn-outline-success" type="button" onClick={handle}>{email} logout</button>
          <UserContext.Provider value={{users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100}]}}>
            <div className="container" style={{padding: "20px"}}>
              <Route path="/" exact component={Home} />
              <Route path="/CreateAccount/" component={CreateAccount} />
              <Route path="/login/" component={Login} />
              <Route path="/deposit/" component={Deposit} />
              <Route path="/withdraw/" component={Withdraw} />
              <Route path="/transfer/" component={transfer} />
              {/* <Route path="/transactions/" component={Transactions} /> */}
              <Route path="/balance/" component={Balance} />
              <Route path="/alldata/" component={AllData} />
            </div>
          </UserContext.Provider>
        </div>
      </HashRouter>
    );
  }
  else {
    return (
      <HashRouter>
        <div>
          <OutBar/>        
          <UserContext.Provider value={{users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100}]}}>
            <div className="container" style={{padding: "20px"}}>
              <Route path="/" exact component={Home} />
              <Route path="/CreateAccount/" component={CreateAccount} />
              <Route path="/login/" component={Login} />
              <Route path="/deposit/" component={Deposit} />
              <Route path="/withdraw/" component={Withdraw} />
              <Route path="/transfer/" component={transfer} />
              {/* <Route path="/transactions/" component={Transactions} /> */}
              <Route path="/balance/" component={Balance} />
              <Route path="/alldata/" component={AllData} />
            </div>
          </UserContext.Provider>
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
