// Static role photos - predefined avatars for each system role
export const rolePhotos: Record<string, string> = {
  admin: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  clerk: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
  finance: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  hr_manager: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  project_manager: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  citizen: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
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
