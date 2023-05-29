import React, { useEffect, useState } from 'react'
import { Avatar,  Rating, setRef, TextField } from "@mui/material"
import { Link } from 'react-router-dom'
import './UserServiceHistory.css'
import { addServiceCenterReview } from "../../api/userApi"
import Swal from 'sweetalert2'
import axios from 'axios'

function UserServicehistory({ id }) {
    const [history, setHistory] = useState("")
    const [review, setReview] = useState("")
    const [rating, setRating] = useState("")
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        (async function () {
            let { data } = await axios.get("/user/servicehistory/" + id)
            if (!data.err) {
                setHistory(data)
            }
        })()
    }, [refresh])
    const serviceCenterId = history.serviceCenterId
    const userId = history.userId
    const handleSubmitReview = async () => {
        if (rating !== '' && review !== '') {
            const data = await addServiceCenterReview(rating, review, serviceCenterId, userId);
            if (!data.err) {
                Swal.fire(
                    'Success!',
                    'Review Added Successfull',
                    'success'
                )
            }
            setRefresh(!refresh)
        }
    }




    return (
        <div>
            <div className="service-history">
                <div className="history-card">
                    <div className="service-history-head">
                        <h4>service history</h4>
                        <p>{history.serviceCenterName}</p>
                    </div>
                    <div className="first-row">
                        <div className="service-history-vehicle">
                            <p className='text-center'>Vehicle Detials</p>
                            <p>{history.vehicleBrand}</p>
                            <p>{history.vehicleModel}</p>
                            <p>{history.vehicleNo}</p>
                        </div>

                        <div className="service-history-owner">
                            <p className='text-center'>Owner Detials</p>
                            <p>{history.ownerName}</p>
                            <p>{history.ownerMobileNo}</p>
                        </div>
                    </div>
                    <div className="first-row">
                        <div className="service-detials">
                            <p> Date Booked:{new Date(history.dateBooked).toLocaleDateString()}</p>
                            <p>Date of Service:{new Date(history.dateOfService).toLocaleDateString()}</p>
                            <p>Package Choosen:{history.packageChoosen}</p>
                            <p>Status:{history.status}</p>
                            <div className="history-worker">
                            <p>Worker:</p> {history.worker && <p>{history.worker.name}</p> }
                            </div>
                            <p>FeedBack:{history.vehicleCondition}</p>
                            
                        </div> 

                        <div className="add-review">
                            <TextField
                                id="outlined-multiline-flexible"  
                                label="Add Review"
                                multiline
                                fullwidth
                                maxRows={4}
                                minRows={2}
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                className={'mt-2'}
                            />
                            <div className='dr-profile-rating mt-3 justify-content-between'>
                                <Rating name="read-only" value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    size="large" />
                                <button className="btn btn-dark"
                                    disabled={rating === "" || review === ""}
                                    onClick={handleSubmitReview}
                                >Save</button>
                            </div>
                        </div>

                    </div>
                    <div className="go-back">
                    <Link to='/profile' className='text-center'>Go back</Link>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default UserServicehistory