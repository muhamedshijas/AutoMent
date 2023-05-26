import axios from "axios";
import Swal from "sweetalert2";

export async function addServiceCenterReview(rating, review, serviceCenterId,userId){
    const {data} = await axios.post('/user/feedback/servicecenter',{
        review, rating, serviceCenterId,userId
    })
    if(data.err){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message,  
          })
    }
    return data
}