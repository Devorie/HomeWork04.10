import React from 'react';

function PersonRow({ person, isSelected, onEdit, onDelete, onSelect }) {
    const { firstName, lastName, age, id } = person;
    return (
        <tr>
            <td>
                <div className='d-flex justify-content-center align-items-center'>
                    <input
                        checked={isSelected}
                        onChange={onSelect}
                        type="checkbox"
                        style={{ transform: "scale(1.5)" }}
                        className="form-check-input mt-2" />
                </div>
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <button className='btn btn-outline-warning' onClick={onEdit}>Edit</button>
                <button style={{ marginLeft: 10 }} className='btn btn-outline-danger' onClick={onDelete}>Delete</button>
            </td>
        </tr>
    )
}

export default PersonRow;