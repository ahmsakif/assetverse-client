import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';

import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    console.log('initially after load',sessionId);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(true);
console.log(sessionId);
    useEffect(() => {
        if (sessionId) {
            console.log('inside',sessionId);
            // Call backend to validate and save
            axiosSecure.post('/validate-payment', { sessionId })
                .then(res => {
                    if (res.data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Payment Confirmed!',
                            text: 'Your package limit has been updated.',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        navigate('/dashboard');
                    }
                })
                .catch(err => {
                    console.error("Validation Error:", err);
                    Swal.fire('Error', 'Could not verify payment.', 'error');
                })
                .finally(() => setIsProcessing(false));
        }
    }, [sessionId, axiosSecure, navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            {isProcessing ? (
                <>
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <h2 className="text-xl mt-4 font-semibold">Confirming your payment...</h2>
                </>
            ) : (
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-green-600">Success!</h1>
                    <p>Redirecting you to dashboard...</p>
                </div>
            )}
        </div>
    );
};

export default PaymentSuccess;