function Deposit(){
    const [show, setShow]           = React.useState(true);
    const [status, setStatus]       = React.useState('');
    const [amount,setAmount]        = React.useState('');
    const [btnstatus, setBtnstatus] = React.useState(true);
    const ctx = React.useContext(UserContext);
    const type = 'deposit';

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
            console.log(number);
            if(number < 0){
                setStatus('Error: Is negative');
                setTimeout(() => setStatus(''), 3000);
                return false;
            }
    
            return true;
    
        }


    function handleDeposit(){
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

        const newBalance = loggedUser.balance + Number(amount);
        const userSearched = loggedUser.email;
        const date = new Date().toString();

        const db = firebase.database();
        
        // Actualizar balance en Firebase
        db.ref('users/' + ctx.loggedUserKey).update({
            balance: newBalance
        }, (error) => {
            if (error) {
                setStatus('Error al realizar depósito: ' + error.message);
                setTimeout(() => setStatus(''), 3000);
                console.error('Error al actualizar balance:', error);
            } else {
                // Crear operación en Firebase
                db.ref('ops').push({userSearched,type,amount,newBalance,date}, (opError) => {
                    if (opError) {
                        console.error('Error al guardar operación:', opError);
                        // Aunque falle guardar la operación, el depósito ya se hizo
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
            header="Deposit"
            status={status}
            body={show ? (
                <>
                Balance<br/>
                <h2>USD: {ctx.loggedUserKey ? (ctx.users.find(user => user.firebaseKey === ctx.loggedUserKey)?.balance || 0) : '(No user logged)'}</h2><br/><br/>
                <p>Set a deposit</p>
                Amount<br/>
                <input type="text" className="form-control" id="amount" placeholder="Enter amount" value={amount} onChange={handleOnChange} /><br/>
                <button type="submit" className="btn btn-light" onClick={handleDeposit} disabled={btnstatus}>Confirm deposit</button>
                </>
            ) : (
                <>
                Balance<br/>
                <h2>USD: {ctx.users.find(user => user.firebaseKey === ctx.loggedUserKey)?.balance || 0}</h2><br/><br/>
                <h5>Success deposit</h5>
                <button type="submit" className="btn btn-light" onClick={clearForm}>Set another deposit</button>
                </>
            )}

        />
    )
}
