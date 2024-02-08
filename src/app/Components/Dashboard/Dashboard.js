import React from 'react'
import Image from 'next/image'
import logo from '../../images/logo.png'
import profile from '../../images/profile.png'
import { FaAngleDown } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import Overview from '../Overview/Overview';
import { FiExternalLink } from "react-icons/fi";
import { TbTransfer } from "react-icons/tb";
import { MdHistory } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { useState, useEffect } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import { IoIosRemoveCircle } from "react-icons/io";


function Dashboard() {

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [formData, setFormData] = useState({
        description: '',
        type: "",
        amount: '',
        category: '',
        date: '',
    });


    const showForm = () => setIsFormVisible(true);
    const hideForm = () => setIsFormVisible(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };


    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const timestamp = new Date().getTime(); // Generate a unique timestamp
                const url = `/api/transaction?timestamp=${timestamp}`; // Append timestamp as query parameter
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch transactions');
                }
                const data = await response.json();
                setTransactions(data.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchTransactions();
    }, [transactions]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to add transaction');
            }

            const newTransaction = await response.json();
            setTransactions([...transactions, newTransaction.data]);
            setFormData({
                description: '',
                type: '',
                amount: '',
                category: '',
                date: ''
            });
            hideForm()
        } catch (error) {
            console.error(error);
            alert('Failed to add transaction');
        }
    };



    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear().toString().slice(2);
        return `${day}/${month < 10 ? '0' + month : month}/${year}`;
    };


    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Month is zero-based
    const currentYear = currentDate.getFullYear();


    useEffect(() => {
        setSelectedMonth(currentMonth.toString());
        setSelectedYear(currentYear.toString());
    }, [])

    return (
        <div className='w-full min-h-screen bg-gray-900 rounded-3xl dashboard-bg md:p-12 lg:p-12 p-4'>
            <div className='w-full  h-auto grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1 pb-6 lg:grid-cols-3'>
                <div className='text-3xl text-white font-semibold flex justify-start'>
                    TrackFinance <Image className='h-10 w-6 mx-2 ' src={logo} />
                </div>
                <div className='flex sm:flex-wrap  items-center justify-end space-x-5'>
                    <input
                        type='text' placeholder='Search...'
                        className='w-auto h-[5vh] px-5 rounded-xl outline-none bg-neutral-500  bg-opacity-10'
                    />
                    <div className='relative'>
                        <Image style={{ border: "3px solid blue" }} src={profile} className=' md:h-12 md:w-12 lg:h-12 lg:w-12 w-8 h-8 rounded-full' />
                        <button className=' absolute ml-3 top-0 bottom-0 right-[-3vh]'><FaAngleDown /></button>
                    </div>
                </div>
                <div className='flex justify-end items-center space-x-4 mt-3 relative'>
                    <FaRegBell className=' cursor-pointer' />
                    <div className='relative cursor-pointer'>
                        <FaRegEnvelope />
                        <span className='absolute  right-[-7px] top-[-14px] text-red-500'>•</span>
                    </div>
                </div>
            </div>

            {/* Sections for overview , transactions , graphical representation*/}
            <div className=" w-[65%] flex justify-end px-4">
                <select
                    className="mr-2 px-2 py-1 rounded text-white bg-gray-800 border-gray-300"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    {/* Options for selecting month */}
                    <option value="">Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">Augast</option>
                    <option value="9">September</option>
                    <option value="10">Octomber</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                    {/* Add options for other months */}
                </select>
                <select
                    className="px-2 py-1 rounded text-white bg-gray-800 border-gray-300"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    {/* Options for selecting year */}
                    <option value="">Year</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    {/* Add options for other years */}
                </select>
            </div>
            <div className='w-full flex-wrap md:flex lg:flex'>

                <Overview selectedMonth={selectedMonth} selectedYear={selectedYear} />

                <div className=' lg:w-[35%] md:w-[35%] space-y-3 w-full mt-5 p-3 max-h-[110vh] overflow-y-auto scrollbar-hide rounded-2xl border border-white'>
                <div className='w-full relative h-[35vh] rounded-2xl border border-gray-500 bg-gradient-to-l from-blue-400 via-blue-600 to-blue-900 p-7 flex flex-col justify-between'>
    <div className='flex relative justify-between'>
        <h1 className='text-xl font-bold'>My Wallet</h1>
        <h1 className='text-white'>***256</h1>
    </div>
    <div className='flex justify-between'>
        <h1 className='text-2xl font-bold text-white'>₹ 4,936.56</h1>
        <h1 className='font-serif font-semibold text-xl'>Visa</h1>
    </div>
    <div className='absolute z-50 top-0 bottom-0 left-0 right-0 text-3xl text-white font-semibold flex items-center opacity-20 justify-center'>
        <span>TrackFinance</span>
        <Image className='h-10 w-6 mx-2' src={logo} />
    </div>
</div>

                    <div className='w-full min-h-[10vh] rounded-2xl border border-gray-500 bg-gradient-to-t from-gray-700 via-gray-800 to-gray-900  '>
                        <div className=' flex justify-center'>
                            <h1 className='flex  p-2 text-center text-gray-400 text-lg cursor-pointer hover:text-blue-500' onClick={isFormVisible ? hideForm : showForm}>
                                Add New Transaction
                                {isFormVisible ? <IoIosRemoveCircle className='mx-2 text-3xl text-red-500' /> : <IoIosAddCircle className='mx-2 text-3xl text-green-500' />}
                            </h1>

                        </div>
                        <div>
                            {/* Form Popup */}
                            {isFormVisible && (
                                <div className=' from-blue-500 to-blue-700 p-6 rounded-md shadow-md w-full'>
                                    <form onSubmit={handleSubmit} className='space-y-4'>
                                        <label className='text-white'>
                                            Description:
                                            <textarea
                                                type='text'
                                                required
                                                placeholder='eg : Salary , Rent , Grocery , Name.'
                                                name='description'
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                className='w-full h-[5vh] px-5   rounded-xl outline-none bg-neutral-500  bg-opacity-10'
                                            />
                                        </label>
                                        <label className='text-white'>
                                            Transaction Type:
                                            <select
                                                name='type'
                                                value={formData.type}
                                                required
                                                onChange={handleInputChange}
                                                style={{ backgroundColor: 'rgba(115, 115, 115)' }}
                                                className='w-full h-[5vh] px-5 rounded-xl outline-none'
                                            >
                                                <option value='' disabled>Select a category</option>
                                                <option value='debit'>Debit</option>
                                                <option value='credit'>Credit</option>
                                            </select>
                                        </label>
                                        <label className='text-white'>
                                            Amount:
                                            <input
                                                type='text'
                                                pattern='\d*'
                                                inputMode='numeric'
                                                name='amount'
                                                required
                                                value={formData.amount}
                                                onChange={(e) => {
                                                    // Allow only numeric input
                                                    const numericValue = e.target.value.replace(/\D/g, '');
                                                    handleInputChange({ target: { name: 'amount', value: numericValue } });
                                                }}
                                                className='w-full h-[5vh] px-5 rounded-xl outline-none bg-neutral-500 bg-opacity-10'
                                            />

                                        </label>
                                        <label className='text-white'>
                                            Category:
                                            <select
                                                name='category'
                                                value={formData.category}
                                                required
                                                onChange={handleInputChange}
                                                style={{ backgroundColor: 'rgba(115, 115, 115)' }}
                                                className='w-full h-[5vh] px-5 text-white rounded-xl outline-none'
                                            >
                                                <option value='' disabled>Select a category</option>
                                                <option value='Groceries'>Groceries</option>
                                                <option value='Utilities'>Utilities</option>
                                                <option value='Rent/Mortgage'>Rent/Mortgage</option>
                                                <option value='Transportation'>Transportation</option>
                                                <option value='Entertainment'>Entertainment</option>
                                                <option value='Dining Out'>Dining Out</option>
                                                <option value='Healthcare'>Healthcare</option>
                                                <option value='Insurance'>Insurance</option>
                                                <option value='Education'>Education</option>
                                                <option value='Shopping'>Shopping</option>
                                                <option value='Personal Care'>Personal Care</option>
                                                <option value='Debt Repayment'>Debt Repayment</option>
                                                <option value='Subscription Services'>Subscription Services</option>
                                                <option value='Home Maintenance'>Home Maintenance</option>
                                                <option value='Pets'>Pets</option>
                                                <option value='Savings'>Savings</option>
                                                <option value='Miscellaneous'>Miscellaneous</option>
                                                <option value='Gifts/Donations'>Gifts/Donations</option>
                                                <option value='Travel'>Travel</option>
                                                <option value='Childcare'>Childcare</option>
                                                <option value='Bill'>Bill</option>
                                                <option value='Other'>Other</option>


                                                {/* Add more categories as needed */}
                                            </select>
                                        </label>
                                        <label className='text-white'>
                                            Date:
                                            <input
                                                type='date'
                                                required
                                                name='date'
                                                value={formData.date}
                                                onChange={handleInputChange}
                                                className='w-full h-[5vh] px-5 rounded-xl outline-none bg-neutral-500  bg-opacity-10'
                                            />
                                        </label>

                                        <div className='flex justify-end'>
                                            <button type='submit' className='bg-emerald-500 text-black font-semibold px-4  py-2 rounded-md'>
                                                Submit
                                            </button>
                                            <button type='button' onClick={hideForm} className='ml-2 bg-red-500 text-white px-4 py-2 rounded-md'>
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='relative w-full h-[57vh] overflow-y-auto rounded-2xl border px-2 border-gray-500 '>
                        <div className='flex justify-center p-2 text-green-500 bg-gray-900  sticky top-0 z-10'>Transaction History <MdHistory className=' mx-2 text-lg text-slate-50' /></div>
                        {transactions.slice().reverse().map((transaction, index) => (
                            <div key={index} className='flex w-full h-16  p-1'>
                                {transaction && (
                                    <>
                                        <div className='w-[10%] p-3'>
                                            <div className='w-4 h-4 mx-auto my-auto bg-red-400 rounded-full'></div>
                                        </div>
                                        <div className='w-[35%] p-1'>
                                            <h1 className='text-sm'>{transaction.description ? transaction.description : 'No Description'}</h1>
                                            <h1 className='text-xs text-gray-500'>{formatDate(transaction.date)}</h1>
                                        </div>
                                        <div className='w-[35%] p-1 flex justify-center items-center'>
                                            <h1 className='text-xs text-gray-500'>{transaction.category}</h1>
                                        </div>
                                        <div className='flex justify-center items-center w-[20%]'>
                                            <h1 className={transaction.type === "credit" ? 'text-green-500 text-bold' : 'text-red-500 text-bold'}>{transaction.type === "credit" ? "+ " : "- "}{transaction.amount}</h1>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Dashboard
