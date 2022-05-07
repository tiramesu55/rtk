import {useAppSelector, useAppDispatch} from '../../app/hooks';
import  {  useEffect } from "react";
import {fetchUsers, allUsers} from './usersSlice';
import '../../App.css'
const ListUsers = () =>{
    const dispatch = useAppDispatch();
    const users = useAppSelector(allUsers);
    useEffect(() => {
        dispatch(fetchUsers());
      }, [dispatch]);
    return(
    <table>
        <tbody>
       { users.map(itm =>
        <tr key={itm.id}>
            <td>{itm.id} </td>
            <td>{itm.name} </td>
            <td>{itm.content} </td>
            <td>{itm.date}</td>
            <td>{itm.orgId} </td>
        </tr>
        )}
        </tbody>
    </table>
    );
}
export default ListUsers