import { useState } from 'react';

function EmailValidator() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(null);

  function handleInputChange(event) {
    setEmail(event.target.value);
  }

  async function handleValidate() {
    const apiKey = 'https://api.zerobounce.net/v2/validate?api_key=replacewithyours&email=valid@example.com&ip_address=192.168.1.254';
    const url = `https://api.zerobounce.net/v2/validate?apikey=${apiKey}&email=${email}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setIsValid(data.status === 'valid');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Label htmlFor="emailInput">Enter email address:</Label>
      <Input
        type="text"
        id="emailInput"
        name="emailInput"
        onChange={handleInputChange}
      />
      <button type="button" onClick={handleValidate}>
        Validate
      </button>
      {isValid === true && <p>Email is valid</p>}
      {isValid === false && <p>Email is invalid</p>}
    </div>
  );
}
