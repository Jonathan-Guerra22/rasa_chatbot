import './Chat.css';

function App() {

  const send = async () => {

    const val = document.getElementById('input-box').value;
    console.log(val);

    if (val === ""){
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
    let b = await a.json()

    let response = b[0]
    console.log(response);
    console.log(response.text)

    document.getElementById('mensaje').innerText = response.text;

  }

  const handleKeyDown = (event) => { if (event.key === 'Enter') send() }

  return (
    <div className="App">
      <h1>ChatBot</h1>
      <div className='chat-box'>
        <h4>Mensajes</h4>
        <p id='mensaje'></p>
      </div>
      <div className='message-box'>
        <input onKeyDown={handleKeyDown} id='input-box' className='message-box-text'
          placeholder='Enviar mensaje'
        />
        <div onClick={send} className='message-box-button'>
          Enviar
        </div>
      </div>
    </div>
  );
}

export default App;
