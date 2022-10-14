import logo from './logo.svg';
import { useRef, useState } from 'react'
import './App.css';
import { Peer } from "peerjs";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// import { loadPlayer } from './Player/index'
import { JSMpeg } from './Player'

function App() {
  const canvas = useRef()
  function handleStart() {
      const peer = new Peer("client", {
        host: '212.111.203.181',
        port: 9000,
        path: '/myapp'
      });


      const player = new JSMpeg.Player('pipe', {
        canvas: canvas.current
      });

      peer.on("open", () => {
        const conn = peer.connect("server");

        conn.on("open", () => {
          conn.on("data", (data) => {
            player.write(data)
          });
        });
      })
      
    }

  return (
    <div className="App">
      <Button variant="contained" onClick={handleStart}>start</Button>
      <Container maxWidth="sm"><canvas ref={canvas}></canvas></Container>
    </div>
  );
}

export default App;
