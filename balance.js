function Balance(){
    const ctx = React.useContext(UserContext);
    const [status, setStatus]       = React.useState('');

    React.useEffect(() => {
        if (!ctx.loggedUserKey){
            setStatus('Please LOGIN first')
        }
        },[ctx]);

    return(
        <Card
            bgcolor="primary"
            header="Balance"
            status={status}
            body={
                <>
                Balance<br/>
                <h2>USD: {ctx.loggedUserKey ? (ctx.users.find(user => user.firebaseKey === ctx.loggedUserKey)?.balance || 0) : '-'}</h2><br/><br/>
                </>
            }

        />
    )
}