import React from 'react';
import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import ModalBox from '../ModalBox/ModalBox';
import Notes from '../Notes/Notes';
import Footer from './Footer';
import Header from './Header';


const Home = () => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
      
            <Header></Header>
           
            <div className="body-content">
                <Container>
                    <Button variant="primary" onClick={() => setModalShow(true)}>
                        Add a Note
                    </Button>
                    <ModalBox
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </Container>
                <Notes></Notes>
            </div>
          
            <Footer></Footer>
        </>
    );
};

export default Home;