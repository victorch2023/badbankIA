function Withdraw(){
    const [show, setShow]           = React.useState(true);
    const [status, setStatus]       = React.useState('');
    const [amount,setAmount]        = React.useState('');
    const [btnstatus, setBtnstatus] = React.useState(true);
    const ctx = React.useContext(UserContext);
    const type = 'withdraw'

    React.useEffect(() => {
        if (!ctx.loggedUserKey){
            setStatus('Please LOGIN first')
        }
        },[ctx]);

        function validate(field){
            if (!field){
                setStatus('Empty field');
                setTimeout(() => setStatus(''), 3000);
                setBtnstatus(true)
                return false;
            }
    
            if(isNaN(field)){
                setStatus('Error: Is not a number');
                setTimeout(() => setStatus(''), 3000);
                return false;
            }
    
            const number = parseFloat(field);
            if (!ctx.loggedUserKey) {
                setStatus('Please LOGIN first');
                setTimeout(() => setStatus(''), 3000);
                return false;
            }
            const loggedUser = ctx.users.find(user => user.firebaseKey === ctx.loggedUserKey);
            if (!loggedUser) {
                setStatus('Usuario no encontrado');
                setTimeout(() => setStatus(''), 3000);
                return false;
            }
            const balance = loggedUser.balance;
            if(number > balance){
                setStatus('Error: Withdraw exceeds balance');
                setTimeout(() => setStatus(''), 3000);
                return false;
            }
            return true;
        }


    function handleWithdraw(){
        console.log(amount);
        if (!validate(amount))        return;
        
        if (!ctx.loggedUserKey) {
            setStatus('Please LOGIN first');
            setTimeout(() => setStatus(''), 3000);
            return;
        }

        const loggedUser = ctx.users.find(user => user.firebaseKey === ctx.loggedUserKey);
        if (!loggedUser) {
            setStatus('Usuario no encontrado');
            setTimeout(() => setStatus(''), 3000);
            return;
        }

        const newBalance = loggedUser.balance - Number(amount);
        const userSearched = loggedUser.email;
        const date = new Date().toString();

        const db = firebase.database();
        
        // Actualizar balance en Firebase
        db.ref('users/' + ctx.loggedUserKey).update({
            balance: newBalance
        }, (error) => {
            if (error) {
                setStatus('Error al realizar retiro: ' + error.message);
                setTimeout(() => setStatus(''), 3000);
                console.error('Error al actualizar balance:', error);
            } else {
                // Crear operación en Firebase
                db.ref('ops').push({userSearched,type,amount,newBalance,date}, (opError) => {
                    if (opError) {
                        console.error('Error al guardar operación:', opError);
                        // Aunque falle guardar la operación, el retiro ya se hizo
                    }
                    // El listener en init.js actualizará automáticamente el estado
                    setShow(false);
                });
            }
        });
    }


    function clearForm(){
        setAmount('');
        setShow(true);
        setBtnstatus(true);
    }

    function handleOnChange (event){
        const newContent = event.target.value;
        setAmount(newContent);
        setBtnstatus(newContent === '');
    };

    return(
        <Card
            bgcolor="primary"
            header="Withdraw"
            status={status}
            body={show ? (
                <>
                Balance<br/>
                <h2>USD: {ctx.loggedUserKey ? (ctx.users.find(user => user.firebaseKey === ctx.loggedUserKey)?.balance || 0) : '(No user logged)'}</h2><br/><br/>
                <p>Set a withdraw</p>
                Amount<br/>
                <input type="text" className="form-control" id="amount" placeholder="Enter amount" value={amount} onChange={handleOnChange} /><br/>
                <button type="submit" className="btn btn-light" onClick={handleWithdraw} disabled={btnstatus}>Confirm withdraw</button>
                </>
            ) : (
                <>
                Balance<br/>
                <h2>USD: {ctx.users.find(user => user.firebaseKey === ctx.loggedUserKey)?.balance || 0}</h2><br/><br/>
                <h5>Success withdraw</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Set another withdraw</button>
                </>
            )}

        />
    )
}
