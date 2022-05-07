import {useAppSelector} from '../../app/hooks';
import { selectOrganizations as allOrgs} from '../organizations/organizationsSlice';

const UserOrganization = ({orgId }:{orgId: number}) =>{
    const orgs = useAppSelector( allOrgs);
    const org = orgs.find( o => o.id === orgId);
    return <div>{`orgcode:${org?.code} org name: ${org?.name} `} </div>
}
export default UserOrganization;