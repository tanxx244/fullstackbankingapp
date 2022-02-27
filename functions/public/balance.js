function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )

}

function BalanceMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){
  const [email, setEmail]   = React.useState('');
  const [balance, setBalance] = React.useState('');  

  function handle(){
    const auth = firebase.auth();
    const accountRef = firebase.firestore().collection('accounts');

    auth.onAuthStateChanged((user) => {
      if (user){
        setEmail(user.email);
        console.log(user.email);
        const promise = accountRef.doc(user.email).get();
        promise.then(text => props.setStatus(`The account balance is ${text.data().balance}.`))
          .catch(e => console.log(e.message));

        // props.setStatus(`The account balance is ${text.data().balance}.`);
        props.setShow(false);
        // console.log(balance);
      }
      else {
        props.setStatus('Account balance not found.');
        console.log(user);
        setEmail('');
        setBalance('');
      }
    });
  }

  return (<>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>);
}