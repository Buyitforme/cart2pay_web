import React from 'react';
import logo from "./Cart2Pay.png";
import { Button } from './Components/Button';
import { Input } from './Components/Inputfield';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          // leftIcon={<User />}
          // value={formData.name}
          // onChange={(e) => handleInputChange("name", e.target.value)}
          // error={errors.name}
          required
        />
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </header>
    </div>
  );
}

export default App;
