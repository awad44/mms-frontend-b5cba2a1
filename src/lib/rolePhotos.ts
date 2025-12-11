// Static role avatars - predefined photos for each system role
import citizenPhoto from '@/assets/citizen-photo.jpg';
import financePhoto from '@/assets/finance-photo.jpg';
import adminPhoto from '@/assets/admin-photo.jpg';

export const rolePhotos: Record<string, string> = {
  admin: adminPhoto,
  clerk: 'https://api.dicebear.com/7.x/avataaars/svg?seed=clerk&backgroundColor=c0aede',
  finance: financePhoto,
  hr_manager: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hrmanager&backgroundColor=ffd5dc',
  project_manager: 'https://api.dicebear.com/7.x/avataaars/svg?seed=projectmgr&backgroundColor=ffdfbf',
  citizen: citizenPhoto,
};

export const getRolePhoto = (role: string): string => {
  return rolePhotos[role] || rolePhotos.citizen;
};

export const getRoleDisplayName = (role: string): string => {
  const roleNames: Record<string, string> = {
    admin: 'Admin',
    clerk: 'Clerk',
    finance: 'Finance Officer',
    hr_manager: 'HR Manager',
    project_manager: 'Project Manager',
    citizen: 'Citizen',
  };
  return roleNames[role] || role.replace('_', ' ');
};
