function AllData(){
    const [data, setData] = React.useState('');    
    const firestore = firebase.firestore();
    const accountRef = firestore.collection('accounts');

    React.useEffect(() => {
        
        // fetch all accounts from API
        accountRef.get()
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(JSON.stringify(data));                
            });

    }, []);

    return (<>
        <h5>All Data in Store:</h5>
        {data}
    </>);
}
