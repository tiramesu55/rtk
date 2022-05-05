import axios from "axios";

export const getAllOrganizations = () => axios.get('http://localhost:5000/organizations');

export const updateOrganization = (organization: any, id: number) => axios.put(`http://localhost:5000/organizations/${id}`, organization);

export const createOrganization = (organization: any) => axios.post(`http://localhost:5000/organizations/`, organization);

