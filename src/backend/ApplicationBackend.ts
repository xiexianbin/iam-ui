/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'src/boot/axios';
import { IApplication } from 'src/components/models/application';

export const getApplicationsByOrganization = async (owner: string, organization: string): Promise<IApplication[]>  => {
  return api.get(`/api/get-applications?owner=${owner}&organization=${organization}`);
}

export const getApplication = async (owner: string, name: string): Promise<IApplication> => {
  return await api.get(`/api/get-application?id=${owner}/${encodeURIComponent(name)}`);
};

export const getUserApplication = async (owner: string, name: string | number | boolean): Promise<IApplication> => {
  return await api.get(`/api/get-user-application?id=${owner}/${encodeURIComponent(name)}`);
}
