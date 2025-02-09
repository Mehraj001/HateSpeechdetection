import React from 'react'
import styled from 'styled-components'
import Robot from '../assets/robot.gif'
export default function Welcome({currentUser}) {
  
      return ( 
            <Container>
          
              <img src={Robot} alt="Robot" />
              
              <h1>
                 Welcome, <span>{currentUser?.username}.</span>
              </h1>
              <h3>Please select a chat to Start messaging.</h3>
            </Container>
          );
        }   
        const Container = styled.div`
            display: flex;
            justify-content: center;
            align-items: center;
            color: #000000;
            flex-direction: column;
         img {
             height: 20rem;
      
          }
         span {
           color: ##000000;
          }
    `;