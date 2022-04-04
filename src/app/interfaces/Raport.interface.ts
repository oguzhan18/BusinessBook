import {Material} from '../interfaces/Material.interface';
export interface Raport {
  id?: string;
  projectAndClient?: string;
  date: string;
  team: string;
  materialsUsed: string;
  description: string;
  projectId?: string;
  requestId?: string;
  materialsQuantity?: Material[];
  bill: boolean;

}
