function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');

  function handle(){
    const auth = firebase.auth();
    const firestore = firebase.firestore();
    const accountRef = firestore.collection('accounts');
    // var FieldValue = firestore.FieldValue;
    var realamount = Number(amount);

    auth.onAuthStateChanged((user) => {
      if (user){
        setEmail(user.email);
        accountRef.doc(user.email).update({balance: firebase.firestore.FieldValue.increment( - realamount)});
        props.setStatus('Withdrew.');
        props.setShow(false);
      }
      else {
        props.setStatus('Account not found.')
        console.log(user);
        setEmail('');
        setAmount('');
      }
    });
  }


  return(<>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}
