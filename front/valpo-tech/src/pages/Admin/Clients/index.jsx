import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Layout from '../../../Layout/index.jsx';
import Carrousel from '../../../components/Carrousel/index.jsx';
import Clientservice from '../../../services/Admin/ProductData.service.js';
import { laptopL,laptop,tablet, mobileS, mobileL } from '../../../const/screens'

const Master = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 50px);
  color: white;
  position: relative;
  z-index: 1;
 
  @media(${tablet}){
    left: 0;
    z-index: 1;
    flex-direction: column;  
  }

`

const ContainerButtons = styled.div`
  width: 100vw;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ButtonMove = styled.button`
  width: fit-content;
  margin: 0 5px 0 5px;
  height: 40px;
  border-radius: 10px;
  background-color: #b74e11;
  color: white;
  cursor: pointer;
`
const Clients = () => {
    const [Clients, setClients] = useState([])
    const [populateData, setpopulateData] = useState({});

    useEffect(() => {
        Clientservice.getAll()
          .then(({ data }) => {
            console.log(data.Clients)
            setClients(data.Clients);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

  return (
    <Layout>
        <Master>
            <Carrousel
                data={Clients}
                // actualizar={getProducto} 
                // get={getProducto}
                tipo={"Product"}
            />

            
        </Master>
    </Layout>
  )
}

export default Clients