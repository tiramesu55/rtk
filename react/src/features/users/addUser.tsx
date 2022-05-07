import {useAppSelector, useAppDispatch} from '../../app/hooks';
import { selectOrganizations as allOrgs} from '../organizations/organizationsSlice';
import { useNavigate } from "react-router-dom";
import {addNewUser, User} from './usersSlice';

import { useState } from "react"; // replace from states with formix or something 
const AddUserForm = () =>{
    const orgs = useAppSelector(allOrgs);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
//form below should be replaced
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [orgId, setOrgId] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)
    const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)
    const onOrgChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setOrgId(e.target.value)

    const orgOptions = orgs.map(o => (
        <option key={o.id} value={o.id}>
            {o.name}
        </option>
    ));

    const onSaveUserClicked = () => {    
            try {
                setAddRequestStatus('pending')
                const pld: User ={
                    id: undefined,
                    name,
                    content,
                    orgId: Number(orgId),
                    date: new Date().toDateString()
                } 
                dispatch(addNewUser(  pld)).unwrap()

                setName('')
                setContent('')
                setOrgId('')
                navigate('/')
            } catch (err) {
                console.error('Failed to save the user', err)
            } finally {
                setAddRequestStatus('idle')
            }
        

        }

    return (
        <section>
            <h2>Add a New Organization</h2>
            <form>
                <label htmlFor="userName">User Name:</label>
                <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={name}
                    onChange={onNameChanged}
                />
                <label htmlFor="postAuthor">Organization:</label>
                <select id="organization" value={orgId} onChange={onOrgChanged}>
                    <option value=""></option>
                    {orgOptions}
                </select>
                <label htmlFor="userContent">User Content:</label>
                <textarea
                    id="userContent"
                    name="userContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSaveUserClicked}

                >Save User</button>
            </form>
        </section>
    )

}
export default AddUserForm;