import './Chat.css';

function App() {

  const send = async () => {

    const val = document.getElementById('input-box').value;
    console.log(val);

    if (val === "") {
      alert("No ingreso un texto valido")
      return
    }

    document.getElementById('input-box').value = ""

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          "sender": "test_user",
          "message": val
        }
      )
    };

    let a = await fetch('http://localhost:5005/webhooks/rest/webhook', requestOptions)
      .catch(err => {
        alert("Ocurrio un problema en la conexión...")
        return null
      })

    if (a === null) return

    try {

      let b = await a.json()
      let response = b[0]
      console.log(response);
      console.log(response.text)

      document.getElementById('mensaje_user').innerText = val;
      document.getElementById('mensaje').innerText = response.text;

    } catch (err) {
      console.log(err);
      alert("Ocurrio un problema, intente de nuevo...")
      return
    }

  }

  const handleKeyDown = (event) => { if (event.key === 'Enter') send() }

  // useEffect(() => {
    
  
  //   return () => {
      
  //   }
  // }, [])
  

  return (
    <div className="App">
      <h1>ChatBot</h1>
      <div className='chat-box'>
        <h4 className='mensaje_title'>Mensajes</h4>
        <br></br>
        <br></br>
        <div className='container'>
          <div className='user-container'>
            {/* <p className='user_title'>Tu: </p> */}
            <p id='mensaje_user'>...</p>
          </div>
          <br></br>
          <div className='bot-container'>
            {/* <p className='bot_title'>Bot: </p> */}
            <p id='mensaje'>...</p>
          </div>
        </div>
      </div>
        <div className='container-send-box'>

          <div className='message-box'>
            <input onKeyDown={handleKeyDown} id='input-box' className='message-box-text'
              placeholder='Enviar mensaje'
            />
            <div onClick={send} className='message-box-button'>
              Enviar
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
