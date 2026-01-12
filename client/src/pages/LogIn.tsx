import {useState, type FormEvent} from "react";
import TransFlowLogo from "../components/TransFlowLogo";
import {useMutation} from "@tanstack/react-query";
import {axiosInstance} from "../services/axiosInstance";
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface LoginFormData {
    username: string;
    password: string;
    company: string;
}
export interface IErrorMessage {
    location?: string;
    type?: string;
    value?: string;
    path?: string;
    msg?: string;
}
export default function LogIn() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginFormData>({
        username: "",
        password: "",
        company: "",
    });
    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<IErrorMessage | string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    //
    const {mutate}: any = useMutation({
        mutationKey: ["signin"],
        mutationFn: async (data) => {
            try {
                const response = await axiosInstance.post(`/api/auth/login`, data);
                return response.data;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error(error);
                    console.log(error.response?.data.messageError);
                    setErrorMessage(error.response?.data.messageError || error.response?.data.message);
                } else {
                    setErrorMessage("An unexpected error occurred");
                }
                throw Error;
            }
        },
        onSuccess: (statusData) => {
            console.log(statusData);
            navigate("/");
        },
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        mutate(formData);
        // TODO: integrate authentication logic
    };
    const companies = ["RGSOI NORTH"];

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
            <div className='w-full max-w-md rounded-2xl bg-white shadow-lg p-8'>
                {/* Header */}
                <div className='mb-6 text-center'>
                    <div className='flex justify-center'>
                        <TransFlowLogo />
                    </div>
                    <p className='text-sm text-gray-500'>Enter your credentials to continue</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className='space-y-5'>
                    {/* Company */}
                    <div className='relative'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Company</label>

                        <input
                            type='text'
                            value={formData.company}
                            onFocus={() => setIsOpen(true)}
                            onChange={(e) => {
                                setIsOpen(true);
                                setFormData((prev) => ({...prev, company: e.target.value}));
                            }}
                            placeholder='Select or search company...'
                            className='w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
               focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none'
                        />

                        {isOpen && (
                            <ul className='absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-md max-h-48 overflow-auto'>
                                {companies
                                    .filter((company) => company.toLowerCase().includes(formData.company.toLowerCase()))
                                    .map((company) => (
                                        <li
                                            key={company}
                                            onMouseDown={() => {
                                                // onMouseDown prevents input blur before click
                                                setFormData((prev) => ({...prev, company}));
                                                setIsOpen(false);
                                            }}
                                            className='cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-50'
                                        >
                                            {company}
                                        </li>
                                    ))}

                                {companies.length === 0 && (
                                    <li className='px-4 py-2 text-sm text-gray-400'>No companies found</li>
                                )}
                            </ul>
                        )}
                    </div>
                         <div className='my-1'>
                            {Array.isArray(errorMessage) &&
                                errorMessage?.find((mes: IErrorMessage) => mes?.path === "name") && (
                                    <p className='text-red-400 font-semibold text-xs'>
                                        {errorMessage.find((err: IErrorMessage) => err?.path === "email")?.msg}
                                    </p>
                                )}
                        </div>
                    {/* Username */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Username</label>
                        <input
                            type='text'
                            name='username'
                            value={formData.username}
                            onChange={handleChange}
                            placeholder='Enter your username'
                            className='w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none'
                        />
                         {Array.isArray(errorMessage) &&
                                errorMessage?.find((mes: IErrorMessage) => mes?.path === "username") && (
                                    <p className='text-red-400 font-semibold text-xs'>
                                        {errorMessage.find((err: IErrorMessage) => err?.path === "username")?.msg}
                                    </p>
                                )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                        <input
                            type='password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Enter your password'
                            className='w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none'
                        />
                         {Array.isArray(errorMessage) &&
                                errorMessage?.find((mes: IErrorMessage) => mes?.path === "password") && (
                                    <p className='text-red-400 font-semibold text-xs'>
                                        {errorMessage.find((err: IErrorMessage) => err?.path === "password")?.msg}
                                    </p>
                                )}
                    </div>

                    {/* Submit */}
                    <button
                        type='submit'
                        className='w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition'
                    >
                        Sign In
                    </button>
                </form>

                {/* Footer */}
                <div className='mt-6 text-center text-xs text-gray-400'>
                    © {new Date().getFullYear()} TransFlow. All rights reserved.
                </div>
            </div>
        </div>
    );
}
