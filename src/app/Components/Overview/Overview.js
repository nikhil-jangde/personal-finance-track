import React from 'react';
import HistogramChart from '../HistogramChart/HistogramChart';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { IoIosAddCircle } from "react-icons/io";
import { useState, useEffect } from 'react';

function Overview({ selectedMonth, selectedYear }) {
    const targetedAmount = 10000;
    const submittedAmount = 5954;
    const progressPercentage = ((submittedAmount / targetedAmount) * 100).toFixed(2);

    const [overviewData, setOverviewData] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalSpendings, setTotalSpendings] = useState(0);
    const [spendingData,setSpendingData] = useState();
    


  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const timestamp = new Date().getTime(); // Generate a unique timestamp
        const url = `/api/overview?timestamp=${timestamp}`; // Append timestamp as query parameter
        const response = await fetch(url, {
          cache: 'no-store',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch overview data');
        }
        const data = await response.json();
        setOverviewData(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOverview();
  }, [overviewData]);



    useEffect(() => {
        if (selectedMonth && selectedYear) {
            let incomeSum = 0;
            let spendingsSum = 0;
            const filteredSpendings = [];

            // Iterate over each overview item
            overviewData.forEach(item => {
                // Iterate over spendings
                item.spendings.forEach(spending => {
                    // Extract month and year from spending date
                    const spendingDate = new Date(spending.date);
                    const spendingMonth = spendingDate.getMonth() + 1; // Month is zero-based
                    const spendingYear = spendingDate.getFullYear();

                    // Check if spending is from selected month and year
                    if (spendingMonth === parseInt(selectedMonth) && spendingYear === parseInt(selectedYear)) {
                        spendingsSum += spending.amount; // Add spending amount to total spendings
                    }

                    // Check if spending is from selected month and year
                    if (spendingMonth === parseInt(selectedMonth) && spendingYear === parseInt(selectedYear)) {
                        filteredSpendings.push(spending); // Add spending to filteredSpendings array
                    }

                });

                // Iterate over income
                item.income.forEach(income => {
                    // Extract month and year from income date
                    const incomeDate = new Date(income.date);
                    const incomeMonth = incomeDate.getMonth() + 1; // Month is zero-based
                    const incomeYear = incomeDate.getFullYear();

                    // Check if income is from selected month and year
                    if (incomeMonth === parseInt(selectedMonth) && incomeYear === parseInt(selectedYear)) {
                        incomeSum += income.amount; // Add income amount to total income
                    }
                });
            });

            // Update state with the calculated sums
            setTotalIncome(incomeSum);
            setTotalSpendings(spendingsSum);
            // Update state with the filtered spendings
            setSpendingData(filteredSpendings);
        }
    }, [selectedMonth, selectedYear, overviewData]);


    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        "https://5.imimg.com/data5/SELLER/Default/2022/2/FB/HW/HQ/146182240/google-display-banner-ads.jpg",
        "https://as1.ftcdn.net/v2/jpg/02/97/28/30/1000_F_297283064_qw1LuGw58vsvjBRDXLiTaRM297kwBzCr.jpg",
        "https://as1.ftcdn.net/v2/jpg/02/97/28/30/1000_F_297283064_qw1LuGw58vsvjBRDXLiTaRM297kwBzCr.jpg",
        // Add more image URLs as needed
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <div className='lg:w-[65%] md:w-[65%] w-full md:p-3 h-auto '>

                <div className='w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3'>
                    {/* Reusable component for each card */}
                    <div className='h-32 rounded-2xl border my-1 border-gray-500 bg-gradient-to-t from-gray-700 via-gray-800 to-gray-900 p-7 flex flex-col justify-between'>
                        <div>
                            <h1 className='text-gray-400'>Total Balance</h1>
                        </div>
                        <div>
                            <h1 className='text-2xl font-bold'>
                                ₹ {overviewData.length > 0 ? overviewData[0].totalBalance : 0}
                            </h1>

                        </div>
                    </div>
                    <div className='h-32 rounded-2xl border my-1 border-gray-500 bg-gradient-to-t from-gray-700 via-gray-800 to-gray-900 p-7 flex flex-col justify-between'>
                        <div>
                            <h1 className='text-gray-400'>Total Income</h1>
                        </div>
                        <div>
                            <h1 className='text-2xl font-bold'>₹ {totalIncome}</h1>
                        </div>
                    </div>
                    <div className='h-32 rounded-2xl border my-1 border-gray-500 bg-gradient-to-t from-gray-700 via-gray-800 to-gray-900 p-7 flex flex-col justify-between'>
                        <div>
                            <h1 className='text-gray-400'>Total Spent</h1>
                        </div>
                        <div>
                            <h1 className='text-2xl font-bold'>₹ {totalSpendings}</h1>
                        </div>
                    </div>
                    <div className='h-32 rounded-2xl border my-1 border-gray-500 bg-gradient-to-t from-gray-700 via-gray-800 to-gray-900 p-7 flex flex-col justify-between'>
                        <div>
                            <h1 className='text-gray-400'>Total Savings</h1>
                        </div>
                        <div>
                            <h1 className='text-2xl font-bold'>
                                ₹ {totalIncome - totalSpendings >= 0 ? totalIncome - totalSpendings : 0}
                            </h1>
                        </div>
                    </div>
                </div>

                <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 my-3'>
                    {/* Reusable component for Monthly Savings */}

                    <div className='h-52 rounded-2xl border border-gray-500 bg-gradient-to-t from-gray-700 via-gray-800 to-gray-900 p-3 flex flex-col justify-between'>
                        <div className='flex relative  justify-center'>
                            <h1 className='text-gray-400 flex'>
                                Items Wishlist <IoIosAddCircle className='mx-2 text-2xl text-green-500 cursor-pointer'
                                    onMouseEnter={() => document.getElementById("hidden-text").style.display = "block"}
                                    onMouseLeave={() => document.getElementById("hidden-text").style.display = "none"}
                                /></h1>
                            <h1 id='hidden-text' className='absolute top-0 right-0 text-white text-sm bg-black p-2 rounded-lg'>Add New Wishlist </h1>
                        </div>
                        <div className='flex items-center mx-auto my-auto'>
                            <img src="https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iphone13_hero_09142021_inline.jpg.large.jpg"
                                className='h-28 w-28 border border-gray-200' />
                            <div className='ml-4'> {/* Add margin to separate the image from the text */}
                                <h1 className='text-sm whitespace-nowrap'>Aim : {targetedAmount}</h1>
                                <h1 className='text-sm whitespace-nowrap'>Saving : {submittedAmount}</h1>
                            </div>
                            <CircularProgressbar
                                className="h-20 w-20"
                                value={parseFloat(progressPercentage)}
                                text={`${progressPercentage}%`}
                                styles={buildStyles({
                                    pathColor: 'blue', 
                                    textColor: 'white', 
                                })}
                            />
                        </div>

                    </div>
                    <div className='h-52 rounded-2xl border border-gray-500 bg-gradient-to-t from-gray-700 via-gray-800 to-gray-900 p-2 flex flex-col justify-between'>

            <div className='relative overflow-hidden h-48'>
                <img src={images[currentImageIndex]} className='absolute inset-0 w-full h-48 rounded-md object-cover transition-opacity duration-1000' alt={`Ad ${currentImageIndex}`} />
                <h1 className=' absolute bg-gray-800 top-2 left-2 rounded-xl py-1 px-2 bg-opacity-70'>adds</h1>
            </div>
         
        </div>

                </div>

                <div className='w-full h-auto rounded-2xl border mt-3 border-gray-500 bg-gradient-to-t from-gray-700 via-gray-800 to-gray-900 p-7 flex flex-col justify-between'>
                    <HistogramChart spendingData={spendingData}/>
                </div>
            </div>
        </>
    );
}

export default Overview;
