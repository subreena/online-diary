import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from "react-hook-form";

const ModalBox = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [details, setDetails] = useState({
    date: '',
    note: ''
  })
  const handleBlur = (e) => {
    const newDetails = { ...details };
    newDetails[e.target.name] = e.target.value;
    setDetails(newDetails)
  }
  const onSubmit = () => {
    console.log(details);
    fetch('https://aqueous-atoll-82209.herokuapp.com/allNotes', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(details)
    })

      .then(response => response.json())
      .then(data => {
        console.log(data)
        window.location.reload();
      })
      .catch(error => {
        console.error(error)
      })
    props.onHide();
 
  }

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Your Note
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-4">
                <h4>Your Note For</h4>
              </div>
              <div className="col-8">
                <div className="form-group">
                  <input type="date" id="date" ref={register({ required: true })} onBlur={handleBlur} name="date" style={{ width: '100%' }} className="form-control" />
                  {errors.date && <span className="text-danger">This Field is required</span>}
                </div>
              </div>
            </div>
            <div className="form-group">
              <textarea type="text" id="note" ref={register({ required: true })} onBlur={handleBlur} name="note" placeholder="Your Note" className="form-control" ></textarea>
              {errors.note && <span className="text-danger">This Field is required</span>}
              <br />
            </div>
            <input type="submit" value="Submit" className="btn btn-primary" />
          </form>
        </Modal.Body>
     
      </Modal>
    </>
  );
};

export default ModalBox;