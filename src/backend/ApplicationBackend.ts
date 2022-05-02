/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'src/boot/axios';
import { IApplication } from 'src/components/models/application';

export const getApplication = async (owner: string, name: string): Promise<IApplication> => {
  return await api.get(`/api/get-application?id=${owner}/${encodeURIComponent(name)}`);
};
