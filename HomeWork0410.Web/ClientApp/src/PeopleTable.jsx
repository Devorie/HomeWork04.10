import React from 'react';
import PersonRow from './PersonRow';
import AddPersonForm from './AddPersonForm';
import axios from 'axios';
import { produce } from 'immer';

class PeopleTable extends React.Component {

    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        isLoading: true,
        updating: false,
        isAdding: false,
        selectedPeople: [],
        
    }

    loadPeople = () => {
        this.setState({ isLoading: true });
        axios.get('/api/people/getall').then(reponse => {
            this.setState({ people: reponse.data, isLoading: false});
        });
    }

    componentDidMount = () => {
        this.loadPeople();
    }

    generateTable = () => {
        const { people, isLoading, selectedPeople } = this.state;
        //if (isLoading) {
        //    return <h1>Loading....</h1>
        //}

        return people.map(p => <PersonRow
            key={p.id}
            person={p}
            onEdit={() => this.onEditClick(p)}
            isSelected={selectedPeople.includes(p.id)}
            onDelete={() => this.onDelete(p)}
            onSelect={() => this.onSelect(p)} />)

    }
    

    onTextChange = e => {
        const copy = this.state.person;
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }

    onAddClick = () => {
        this.setState({ isAdding: true });
        axios.post('/api/people/add', this.state.person).then(response => {
            this.loadPeople();
            this.setState({
                person: {
                    firstName: '',
                    lastName: '',
                    age: ''
                },
                isAdding: false
            })
        });
    }

    onUpdateClick = (p) => {
        axios.post('/api/people/update', this.state.person).then(response => {
            this.loadPeople();
            this.setState({
                person: {
                    firstName: '',
                    lastName: '',
                    age: ''
                },
                updating: false
            })
        });
    }

    onEditClick = (p) => {

        this.setState({ updating: true });
        this.setState({
            person: {
                id: p.id,
                firstName: p.firstName,
                lastName: p.lastName,
                age: p.age
            }
        });
    }

    onSelect = (id) => {
        const { selectedPeople } = this.state;
        if (selectedPeople.includes(id)) {
            this.setState({ selectedPeople: selectedPeople.filter(p => p !== id) });
        } else {
            this.setState({ selectedPeople: [...selectedPeople, id] });
        }
    }

    onDelete = async id => {
        await axios.post('/api/people/delete', { id })
        this.setState({ selectedPeople: selectedPeople.filter(p => p !== id) });
        this.loadPeople();
    }

    onDeleteMany = async () => {
        await axios.post('/api/people/deletemany', { ids: this.state.selectedPeople });
        this.loadPeople();
    }

    onSelectAll = () => {
        this.setState({ selectedPeople: this.state.people.map(p => p.id) })
    }

    onDeselectAll = () => {
        this.setState({ selectedPeople: [] })
    }

    render() {
        const { firstName, lastName, age } = this.state.person;
        const { isAdding, updating} = this.state;
        return (
            <>
                <div className='container mt-5'>
                    <div className='row'>
                        <AddPersonForm
                            firstName={firstName}
                            lastName={lastName}
                            age={age}
                            onTextChange={this.onTextChange}
                            onAddClick={this.onAddClick}
                            isAdding={isAdding}
                            updating={updating}
                            onCancel={() => this.setState({ person: { firstName: '', lastName: '', age: '' } })}
                            onUpdate={this.onUpdateClick}
                        />
                    </div>
                </div>
                <div className='container mt-5'>
                    <div className='row'>
                        <div className="col-md-3 mt-3">
                            <button  onClick={this.onSelectAll} className='btn btn-outline-dark w-100'>Select All</button>
                        </div>

                        <div className="col-md-3 mt-3">
                            <button onClick={this.onDeselectAll} className='btn btn-outline-dark w-100'>Deselect All</button>
                        </div>

                        <div className="col-md-3 mt-3">
                            <button onClick={this.onDeleteMany} className='btn btn-outline-danger w-100'>Delete All Selected</button>
                        </div>




                    </div>
                </div>
                <div className='container mt-5'>
                <div className='row'>
                    <table className='table table-hover table-striped table-bordered mt-3'>
                        <thead>
                            <tr>
                                <td>Select</td>
                                <td>First Name</td>
                                <td>Last Name</td>
                                <td>Age</td>
                                <td>Edit</td>
                            </tr>
                        </thead>

                        <tbody>
                            {this.generateTable()}
                        </tbody>

                    </table>
                    </div>
                </div>
            </>
        )
    }
}

export default PeopleTable;