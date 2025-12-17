import React from 'react';
import useAuth from './useAuth';
import { useQuery } from "@tanstack/react-query";
import useAxios from './useAxios';

const useRole = () => {
    const { user, loading } = useAuth()
    const axiosInstance = useAxios()
    const { data: role, isLoading: isRoleLoading } = useQuery({

        queryKey: [user?.email, 'role'],

        enabled: !loading && !!user?.email,

        queryFn: async () => {
            const res = await axiosInstance.get(`/users/${user?.email}`)
            return res.data.role
        }
    })

    return [role, isRoleLoading]
};

export default useRole;