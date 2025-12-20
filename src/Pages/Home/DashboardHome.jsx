import React from 'react';
import useRole from '../../Hooks/useRole';
import LoadingSpinner from '../../Utilities/LoadingSpinner';
import HrHome from './HrHome';
import EmployeeHome from './EmployeeHome';

const DashboardHome = () => {
    const [role, isRoleLoading] = useRole()
    if (isRoleLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            {/* Render Home based on role */}
            {role === 'hr' && <HrHome></HrHome>}
            {role === 'employee' && <EmployeeHome></EmployeeHome>}
        </div>
    );
};

export default DashboardHome;