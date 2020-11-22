import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

const Notes = (props) => {
  const [notes, setNotes] = useState([]);
  const [reverse, setReverse] = useState(false);
 
  const [details, setDetails] = useState({})
  let [deleted, setDeleted] = useState({
    delete: false,
    display: "",
  });

  // Loading notes
  useEffect(() => {
    fetch('https://aqueous-atoll-82209.herokuapp.com/allNotes')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setNotes(data)
      
        setReverse(false)
        document.getElementById('order-btn').innerHTML = 'See Older Notes first'
      })
  }, [])

  //older notes
  const seeOlder = () => {
   
    setReverse(true);
    const olderNotes = notes.reverse();
    setNotes(olderNotes);
    document.getElementById('order-btn').innerHTML = 'See Newer Notes first'
    // if reverse is set true then
    if (reverse) {
      const newerNotes = notes
      setNotes(newerNotes);
      setReverse(false)
      document.getElementById('order-btn').innerHTML = 'See Older Notes first'
    }
  }

  //Selecting the specific note for edit
  function loadNote(id) {
  
    console.log(id);
    fetch(`https://aqueous-atoll-82209.herokuapp.com/allNotes/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setDetails(data);
        const update = document.getElementById('update');
        update.style.display = 'block';
      })
  }

  //Edit Note
  function updateNote(id) {
    console.log(id)
    console.log("updateProduct came");
    const date = document.getElementById('date').value;
    const note = document.getElementById('note').value;
    const details = { id, date, note };

    fetch(`https://aqueous-atoll-82209.herokuapp.com/update/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(details)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          console.log(data)
          document.getElementById('update').style = 'display: none';
          window.location.reload();
        }
      })
  }
  //ends here
  // DELETE Note function starts here
  const handleDelete = (id) => {
    console.log(id);
    fetch(`https://aqueous-atoll-82209.herokuapp.com/delete/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then((result => {
        console.log(result)
        if (result) {
          setDeleted({
            delete: true,
            display: "none",
            
          });
         


        }
 window.location.reload();
      }
      ));
  }
  //fumction ends here
  return (
    <>
     <div className="container">
      <button className="mt-3 btn btn-info" id="order-btn" onClick={() => seeOlder()}>See Older notes first</button>
        <div className="row">
          {
            notes.map(note => <div key={note._id} className="col-12 col-md-3" >
              <div className="note-card" style={{display: `${deleted.display}`}}>
              <p><strong>Date: </strong>{note.date}</p>
              <h3>{note.note}</h3>
             <div className="buttons mt-5">
             <button className="btn btn-warning mr-4" onClick={() => loadNote(`${note._id}`)}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleDelete(`${note._id}`)}>Delete</button>
             </div>
              </div>
            </div>

            )
          }
        </div>
        <div id="update" className="w-50" style={{ display: 'none', position: 'absolute', top: '50%', left: '30%', backgroundColor: 'white', padding: '50px'}}>  
        <Modal.Header closeButton onClick={() => {document.getElementById('update').style.display = 'none'}}>

        <h3>Update Note</h3>
        </Modal.Header>
        <form action="" className="form" onSubmit={() => { updateNote(`${details._id}`) }}>
          
            <div className="form-group">
              <input type="date" name="date" value={`${details.date}`} id="date" className="form-control" />
            </div>

            <div className="form-group">
              <input type="text" name="note" placeholder={`${details.note}`} id="note" className="form-control" required />
            </div>
            <div className="form-group">
            <input type="submit" value="Update" className="btn btn-lg btn-warning" />
            </div> 
        </form>
          </div>
          </div>
         
    </>
  );
};

export default Notes;