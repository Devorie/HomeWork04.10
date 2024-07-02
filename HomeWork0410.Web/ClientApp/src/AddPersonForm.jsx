import React from 'react';

export default function AddPersonForm({ firstName, lastName, age, id,onTextChange, onAddClick, isAdding, updating, onUpdate, onCancel}) {
    return <div className="row p-5 rounded" style={{ backgroundColor: '#E9ECEF' }}>
        <div className="col-md-3 mt-3">
            <input value={firstName} onChange={onTextChange} name='firstName' type="text" className="form-control" placeholder="First Name" />
        </div>
        <div className="col-md-3 mt-3">
            <input value={lastName} onChange={onTextChange} name='lastName' type="text" className="form-control" placeholder="Last Name" />
        </div>
        <div className="col-md-3 mt-3">
            <input value={age} onChange={onTextChange} name='age' type="text" className="form-control" placeholder="Age" />
        </div>
        {!updating &&
            <div className="col-md-3 mt-3">
                <button disabled={isAdding} onClick={onAddClick} className='btn btn-primary w-100'>Add</button>
            </div>}

        {updating && <><div className="col-md-3">
            <button onClick={() => this.onSelect(id)} className='btn btn-warning w-100'>Update</button>
        </div><div className="col-md-3 offset-md-9 mt-1">
                <button onClick={onCancel} className='btn btn-secondary w-100'>Cancel</button>
            </div></>

            }

    </div>
}