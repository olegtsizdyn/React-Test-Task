import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

function Appointments() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showAdd, setShowAdd] = useState(false);
    const handleAddClose = () => setShowAdd(false);
    const handleAddShow = () => setShowAdd(true);

    const [showSignOut, setSignOut] = useState(false);
    const handleSignOutClose = () => setSignOut(false);
    const handleSignOutShow = () => setSignOut(true);

    let day = new Date().getDay();
    if (day < 10) day = '0' + day;
    let month = new Date().getMonth() + 1;
    if (month < 10) month = '0' + month;
    let year = new Date().getFullYear();
    let hours = new Date().getHours();
    if (hours < 10) hours = '0' + hours;
    let minutes = new Date().getMinutes();
    if (minutes < 10) minutes = '0' + minutes;
    let time = `${hours}:${minutes}`;

    let name;
    let status;
    let type;
    let description;

    let [appointmentsArray, setAppointmentsArray] = React.useState(
        [
            {
                id: 1,
                name: 'name1',
                date: `${day} / ${month} / ${year} - ${time}`,
                status: 'Finished',
                type: 'Scan Visit',
                description: 'sdf'
            },
            {
                id: 2,
                name: 'name2',
                date: `${day} / ${month} / ${year} - ${time}`,
                status: 'Scheduled',
                type: 'Scan Visit',
                description: 'sdf'
            },
            {
                id: 3,
                name: 'name3',
                date: `${day} / ${month} / ${year} - ${time}`,
                status: 'Scheduled',
                type: 'Scan Visit',
                description: 'sdf'
            },
            {
                id: 4,
                name: 'name4',
                date: `${day} / ${month} / ${year} - ${time}`,
                status: 'Scheduled',
                type: 'Scan Visit',
                description: 'sdf'
            },
            {
                id: 5,
                name: 'name5',
                date: `${day} / ${month} / ${year} - ${time}`,
                status: 'Scheduled',
                type: 'Consultation',
                description: 'sdf'
            }
        ]
    )

    let remove = (id) => {
        setAppointmentsArray(appointmentsArray.filter(item => item.id !== id));
    }

    let [newName, setName] = React.useState('');
    let [newStatus, setStatus] = React.useState('');
    let [newType, setType] = React.useState('');
    let [newDescription, setDescription] = React.useState('');

    let edit = (id) => {
        setEditIndex(editIndex = id)
        setName(newName = appointmentsArray[id - 1].name);
        setStatus(newStatus = appointmentsArray[id - 1].status);
        setType(newType = appointmentsArray[id - 1].type);
        setDescription(newDescription = appointmentsArray[id - 1].description);

        handleShow();
    }

    let nameEditValue;
    let statusEditValue;
    let typeEditValue;
    let descriptionEditValue;

    let editName = () => {
        setName(newName = nameEditValue.value)
    }

    let editStatus = () => {
        setStatus(newStatus = statusEditValue.value)
    }

    let editType = () => {
        setType(newType = typeEditValue.value)
    }

    let editDescription = () => {
        setDescription(newDescription = descriptionEditValue.value)
    }

    let [editIndex, setEditIndex] = React.useState(0);

    let save = () => {
        appointmentsArray[editIndex - 1].name = nameEditValue.value
        appointmentsArray[editIndex - 1].status = statusEditValue.value
        appointmentsArray[editIndex - 1].type = typeEditValue.value
        appointmentsArray[editIndex - 1].description = descriptionEditValue.value
        console.log(appointmentsArray[editIndex - 1]);
        handleClose();
    }

    let add = () => {
        setAppointmentsArray(
            appointmentsArray.concat(
                {
                    id: appointmentsArray.length + 1,
                    name: name.value,
                    date: `${day} / ${month} / ${year} - ${time}`,
                    status: status.value,
                    type: type.value,
                    description: description.value
                }
            )
        )

        handleAddClose();
    }

    let SignInState = false;

    if (localStorage.getItem('SignInTime') !== null) {
        SignInState = true;
    }

    let chekedLocalStorage = () => {
        if ( new Date().getMinutes() * 60000 - +localStorage.getItem('SignInTime') >= 360000 )  {
            localStorage.removeItem('SignInTime');
            handleSignOutShow();
            SignInState = false;
            clearInterval(chekedLocalStorage);
        }
        else {
            SignInState = true;
        }
    }

    setInterval(chekedLocalStorage, 1000);

    if (!SignInState) return <Redirect to={'/'} />;

    return (

        <div className="container d-flex flex-column justify-content-center mt-5">

            <div className="mb-3 d-flex justify-content-between">
                <h1>Appointments</h1>
                <div>
                    <button className="btn btn-success btn-lg" onClick={handleAddShow}>Add</button>
                </div>
            </div>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                        <th scope="col">Type</th>
                        <th scope="col">Description</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {appointmentsArray.map((item, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.date}</td>
                                <td>{item.status}</td>
                                <td>{item.type}</td>
                                <td>{item.description}</td>
                                <td><button className="btn btn-warning" onClick={() => edit(item.id)}>Edit</button></td>
                                <td><button className="btn btn-danger" onClick={() => remove(item.id)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {/* Edit modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="text" class="form-control" value={newName} onChange={editName} ref={(value) => nameEditValue = value} />
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Status select</label>
                        <select class="form-control" id="exampleFormControlSelect1" value={newStatus} onChange={editStatus} ref={(value) => statusEditValue = value}>
                            <option>Scheduled</option>
                            <option>Finished</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Type select</label>
                        <select class="form-control" id="exampleFormControlSelect1" value={newType} onChange={editType} ref={(value) => typeEditValue = value}>
                            <option>Scan Visit</option>
                            <option>Consultation</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Description</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={newDescription} onChange={editDescription} ref={(value) => descriptionEditValue = value}></textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                                    </Button>
                    <Button variant="primary" onClick={save}>
                        Save
                                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add modal */}
            <Modal show={showAdd} onHide={handleAddClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="text" class="form-control" ref={(value) => name = value} />
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Status select</label>
                        <select class="form-control" id="exampleFormControlSelect1" ref={(value) => status = value}>
                            <option>Scheduled</option>
                            <option>Finished</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Type select</label>
                        <select class="form-control" id="exampleFormControlSelect1" ref={(value) => type = value}>
                            <option>Scan Visit</option>
                            <option>Consultation</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Description</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" ref={(value) => description = value}></textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddClose}>
                        Close
                                    </Button>
                    <Button variant="success" onClick={add}>
                        Add
                                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Sign Out Modal */}
            <Modal show={showSignOut} onHide={handleSignOutClose}>
                <Modal.Body>
                    <h1 className="text-danger">Time of login is end</h1>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={handleSignOutClose}>
                        Sign Out
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}

export default Appointments;