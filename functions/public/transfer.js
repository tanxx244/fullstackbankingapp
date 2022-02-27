function transfer(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [existed, setExisted] = React.useState(false);

  return (
    <Card
      bgcolor="success"
      header="transfer"
      status={status}
      body={show ? 
        <TransferForm setShow={setShow} setStatus={setStatus}/> :
        <TransferMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function TransferMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Transfer again
    </button>
  </>);
}

function TransferForm(props){
  const [email1, setEmail1]   = React.useState('');
  const [email2, setEmail2]   = React.useState('');
  const [amount, setAmount] = React.useState('');

  function handle(){
    const auth = firebase.auth();
    const firestore = firebase.firestore();
    const accountRef = firestore.collection('accounts');
    // var FieldValue = firestore.FieldValue;
    var realamount = Number(amount);

    const doc = accountRef.doc(email2).get();
    doc.then((snap) => {
      console.log(snap.exists);
      auth.onAuthStateChanged((user) => {
        if (user){
          accountRef.doc(user.email).update({balance: firebase.firestore.FieldValue.increment( - realamount)});
          accountRef.doc(email2).update({balance: firebase.firestore.FieldValue.increment(realamount)});
          props.setStatus('Transferred.');
          props.setShow(false);
        }
        else {
          props.setStatus('Account not found.')
          console.log(user);
          setEmail('');
          setAmount('');
        }
      });
    }).catch(e => {
      setStatus('Target Account Not Found');
      console.log(e.message);
    });
  }


  return(<>

    Transfer to<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email2} 
      onChange={e => setEmail2(e.currentTarget.value)}/><br/>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Transfer
    </button>

  </>);
}
