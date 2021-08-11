import React, { useRef, useState } from "react";
import { Alert, Button, Form, Modal, Table } from "react-bootstrap";
import { useAuth } from "../../context/authContext";
import { useDb } from "../../context/dbContext";
import dateFormat from "dateformat";
import { createBrowserHistory } from "history";

const history = createBrowserHistory({
  forceRefresh: true,
});

const Home = () => {
  const weightRef = useRef();
  const editWeightRef = useRef();
  const { currentUser, signout } = useAuth();
  const { weights, deleteEntry, addEntry, editEntry } = useDb();
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (docId) => {
    setShow(true);
    setEditId(docId);
  };

  const signoutClick = async () => {
    try {
      setError("");
      await signout();
      history.push("/login");
    } catch (error) {
      setError("Logout failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await addEntry(weightRef.current.value);
    } catch (error) {
      setError("Invalid username or password");
      console.log(error);
    }
    setLoading(false);
  };

  const deleteClick = async (docId) => {
    try {
      setError("");
      await deleteEntry(docId);
    } catch (error) {
      setError("Couldn't delete, try again");
    }
  };

  const editClick = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await editEntry(editWeightRef.current.value, editId);
      setShow(false);
    } catch (error) {
      setError("Couldn't edit, try again");
    }
  };

  return (
    <div className='home container'>
      <div className='home__header'>
        <h1>
          {"Email: " + (currentUser.email ? currentUser.email : "Guest User")}
        </h1>

        <Button
          variant='danger'
          style={{ fontSize: "1.5rem" }}
          onClick={signoutClick}>
          Log Out
        </Button>
      </div>
      {error && <Alert variant='danger'>{error}</Alert>}

      <div className='home__add'>
        <h2 className='titleStyle2'>Add new entry</h2>
        <Form className='home__add-formcontainer' onSubmit={handleSubmit}>
          <Form.Group className='home__add-form' id='email'>
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type='number'
              min='0'
              max='1000'
              autoComplete='new-password'
              placeholder='Enter numeric value'
              ref={weightRef}
              required></Form.Control>
          </Form.Group>
          <Button variant='success' disabled={loading} type='submit'>
            Add
          </Button>
        </Form>
      </div>

      <div className='home__entries'>
        <h2 className='titleStyle2'>View entries</h2>
        <Table striped bordered hover size='sm' className='home__entries-table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Weight</th>
              <th>Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {weights &&
              weights.map((weight, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{weight.weight}</td>
                  <td>{dateFormat(weight.date, "mmmm dS, yyyy")}</td>
                  <td>
                    <Button
                      onClick={() => handleShow(weight.id)}
                      variant='info'>
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => deleteClick(weight.id)}
                      variant='danger'>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='titleStyle2'>Edit entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='home__edit'>
            <Form
              className='home__edit-formcontainer'
              onSubmit={(e) => {
                editClick(e);
              }}>
              <Form.Group className='home__edit-form' id='email'>
                <Form.Label>Weight</Form.Label>
                <Form.Control
                  type='number'
                  min='0'
                  max='1000'
                  autoComplete='new-password'
                  placeholder='Enter numeric value'
                  ref={editWeightRef}
                  required></Form.Control>
              </Form.Group>
              <Button
                style={{ marginTop: "1rem", padding: "0.5rem 1rem " }}
                variant='success'
                disabled={loading}
                type='submit'>
                Edit
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
