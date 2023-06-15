import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ServiceCenterHeader from '../ServiceCenterHeader/ServiceCenterHeader';
import ServiceCenterSideBar from '../ServiceCenterSideBar/ServiceCenterSideBar';
import { HiOutlineClipboardList } from "react-icons/hi";
import { GiMechanicGarage } from "react-icons/gi";
import { GrUserWorker, GrMoney } from "react-icons/gr";
import { AiOutlineSchedule, AiOutlineCheckCircle } from "react-icons/ai";
import { RiShieldUserLine } from "react-icons/ri";
import { Avatar, Rating, setRef, TextField } from "@mui/material"
import './ServiceCenterHome.css'
import BookingGraphs from '../AdminGraphs/BookingGraphs';
import WeeklyGraph from '../AdminGraphs/WeeklyGraph';
import ByPackageGraph from '../AdminGraphs/ByPackageGraph';

function ServiceCenterHome() {
  const dispatch = useDispatch()
  const serviceCenter = useSelector((state) => {
    return state.serviceCenter.details
  });
  const id = serviceCenter._id;
  const [refresh, serRefresh] = useState(false)
  const [upcoming, setUpcoming] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [totalBooking, setTotalBooking] = useState(0)
  const [worker, setWorker] = useState(0)
  const [bookings, setBookings] = useState([])
  const [workers, setWorkers] = useState([""])
  const [reviews, setReviews] = useState([])


  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(5);

  const [filterStatus, setFilterStatus] = useState('all');


  const [monthlyBooking, setMonthlyBooking] = useState([])
  const [weeklyData, setWeeklyData] = useState([])
  const [byCategory, setByCategory] = useState([])

  React.useEffect(() => {
    (
      async function () {
        try {
          const { data } = await axios.get("/servicecenter/dashboard/" + id)
          console.log(data)
          if (!data.err) {
            setWorkers(data.workers)
            setBookings(data.bookings)
            setCompleted(data.completed)
            setUpcoming(data.upcoming)
            setTotalBooking(data.totalBooking)
            setWorker(data.worker)
            setReviews(data.reviews)
            setMonthlyBooking(data.monthlyData)
            setWeeklyData(data.weeklyData)
            setByCategory(data.byPackage)
          }
        }
        catch (err) { 
          console.log(err)
        }
      }
    )()
  }, [refresh])

  const filteredBookings = bookings.filter((booking) => {
    if (filterStatus === 'all') {
      return true;
    }
    return booking.status === filterStatus;
  });

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredBookings.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const startingNumber = (currentPage - 1) * appointmentsPerPage;
  const calculateSiNo = (index) => startingNumber + index;

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  let totalAmount=0
  const orders=bookings.filter((item)=>{
    totalAmount=totalAmount+item.amount
  })
  return (
    <div className="app">
      <div className="service-center-home">
        <ServiceCenterSideBar />
        <div className="service-center-body">
          <div className="counts">
            <div className="service-card">
              <div className="service-card-icon">
                <GrMoney className='icons' />
              </div>
              <div className="service-card-counts">
                <h5> Revenue</h5>
                {totalAmount}
              </div>
            </div>

            <div className="service-card">
              <div className="service-card-icon">
                <HiOutlineClipboardList className='icons' />
              </div>
              <div className="service-card-counts">
                <h5>Total Booking</h5>
                {totalBooking}
              </div>
            </div>
            <div className="service-card">
              <div className="service-card-icon">
                <GiMechanicGarage className='icons' />
              </div>
              <div className="service-card-counts">
                <h5> Upcoming</h5>
                {upcoming}
              </div>
            </div>

            <div className="service-card">
              <div className="service-card-icon">
                <AiOutlineCheckCircle className='icons' />
              </div>
              <div className="service-card-counts">
                <h5>Completed</h5>
                {completed}
              </div>
            </div>

            <div className="service-card">
              <div className="service-card-icon">
                <RiShieldUserLine className='icons' />
              </div>
              <div className="service-card-counts">
                <h5> workers</h5>
                {worker}
              </div>
            </div>
          </div>

          <div className="booking-table">
            <div className='filter-bookings'>
              <label htmlFor="filter">Filter by status:</label>
              <select id="filter" value={filterStatus} onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="ongoing">On Going</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <h4 className='text-center'>Rececnt Bookings</h4>
            <table class="table striped mt-5" >
              <thead className="thead-dark">
                <tr className="table-head">
                  <th scope="col">SI No</th>
                  <th scope="col">Owner Name</th>
                  <th scope="col">Vehicle</th>
                  <th scope="col">Reg No</th>
                  <th scope="col">Worker</th>
                  <th scope="col">Package Choosen </th>
                  <th scope="col">Status </th>

                </tr>


              </thead>
              <tbody>
                {
                  currentAppointments.map((item, index) => {
                    return <tr>
                      <td>{calculateSiNo(index + 1)}</td>
                      <td>{item.ownerName}</td>
                      <td>{item.vehicleBrand}  {item.vehicleModel}</td>
                      <td>{item.vehicleNo}</td>
                      <td>{item.worker ? item.worker.name : "Not Assigned"}</td>
                      <td>{item.packageChoosen}</td>
                      <td className={item.status == "completed" ? "complete" : ""}>{item.status}</td>
                    </tr>
                  })
                }
              </tbody>
            </table>
            <div className='pagination'>
              {Array.from(Array(Math.ceil(totalBooking / appointmentsPerPage)).keys()).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePaginationClick(pageNumber + 1)}
                  disabled={currentPage === pageNumber + 1}
                >
                  {pageNumber + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="review-sec">
            <h4>Review and Ratings</h4>

            <div className="review-and-rating">
              {
                reviews &&
                reviews.map((item, index) => {
                  return <div className="servicecenter-review">
                    <div className="head-sec">
                      <div className="user-detials">
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                          sx={{ width: 32, height: 32 }}
                        />
                        <b>{item.userId.name}</b>
                      </div>
                      <p>{new Date(item.updatedAt).toLocaleDateString()}</p>
                    </div>
                    <p className="servicecenter-review-desc">
                      <Rating value={item.rating}
                        readOnly
                        size="small" />
                      {item.review}
                    </p>
                  </div>
                })
              }
            </div>
          </div>

          <div className="service-center-graphs">
            <div className="service-monthly-graph">
              <h5 className='text-center'>Revenue per Month</h5>
              <BookingGraphs monthlyData={monthlyBooking} />
            </div>

            <div className="service-weekly-graph">
              <h5 className='text-center'>Revenue per Week</h5>
              <WeeklyGraph weeklyData={weeklyData} />
            </div>
          </div>

          <div className="service-center-graphs">
            <div className="service-package-graph">
              <h5 className='text-center'>Package Choosen</h5>
              <ByPackageGraph byPackage={byCategory} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ServiceCenterHome