import React, { useEffect } from 'react'
import { useAppContext } from './AppContext';
import AssignmentCard from './AssignmentCard';
import { useState } from 'react';
import SubAssignmentCard from './SubAssignmentCard';
import axios from 'axios';
import FloatingButton from './FloatingButton';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

export default function Assignments() {
    const navigate = useNavigate()
    const { handleClose, close, handleOpen, handleLogout } = useAppContext();
    const [currentAssignment, setcurrentAssignment] = useState("")
    const [currentAssignmentId, setcurrentAssignmentId] = useState(null)
    const [currentSubAssignmentId, setcurrentSubAssignmentId] = useState(null)
    const [institutes, setinstitutes] = useState([]);
    const [InstituteId, setInstituteId] = useState(null);
    const fetchInstitutes = async () => {
        await axios
            .get("http://151.106.39.4:8080/getAllInstitute")
            .then((res) => {
                setinstitutes(
                    res.data.data.map((inst) => ({
                        value: inst.institute_id,
                        label: inst.InstituteName,
                    }))
                );
            });
    };

    const [currentSubAssignment, setcurrentSubAssignment] = useState("")
    const [assignment, setassignment] = useState(null)
    const [subassignment, setsubassignment] = useState(null)


    useEffect(() => {
        const fetchAssignment = async () => {
            const resp = await axios.get("http://151.106.39.4:8080/getAllAssignment").then((res) => { return res.data.data })
            console.log('resp', resp)
            if (localStorage.getItem("role") === "principal") {
                let newArr = resp.filter((x) => x.instituteId === parseInt(localStorage.getItem("institutionId")))
                setassignment(newArr)
            }
            else {
                let newArr = resp.filter((x) => x.instituteId === parseInt(InstituteId))
                setassignment(newArr)
            }
        }

        fetchInstitutes()
        fetchAssignment()
    }, [InstituteId])

    useEffect(() => {
        
        fetchStudents()
    }, [currentAssignmentId])
    useEffect(() => {
        fetchStudents()
    }, [currentSubAssignmentId])

    const fetchStudents = async () => {
        const resp = await axios.get("http://151.106.39.4:8080/getUserAssignment").then((res) => { return res.data.data })
        let newArr = resp.filter((x) => x.assignmentId === parseInt(currentSubAssignmentId))
        console.log('students', resp, newArr, currentAssignmentId)

    }

    const handleAssignmentName = (e, id) => {
        console.log('id', id)
        navigate("/subassignment/" + id)
        setcurrentAssignmentId(id)
        setcurrentAssignment(e)
    }

    const handleSubName = (e, id) => {
        console.log('e', e, id)
        setcurrentSubAssignmentId(id)
        setcurrentSubAssignment(e)
    }

    const addAssignment = () => {
        if (currentAssignmentId) {
            navigate("/assignment-creation/" + currentAssignmentId)
        }
        else navigate("/assignment-creation")
    }

    return (
        <div className="flex min-h-full flex-1 flex-col  bg-white px-6 lg:px-8 ">
            {
                localStorage.getItem("role") === "principal" &&
                <FloatingButton onClick={() => addAssignment()}>Add Assignments</FloatingButton>


            }
            <div className="navbar flex justify-between w-full">
                <div className="navleftitemflex flex flex-row items-center gap-5 w-1/2 p-10">
                    <div>
                        <h1
                            className="text-4xl cursor-pointer"
                        >
                            Assignment
                        </h1>
                    </div>
                </div>
                <div className="navitemright flex flex-col items-center gap-5 w-1/2 p-10">
                    <div className=" flex items-center justify-end w-full gap-5">
                        <div>
                            <img src={localStorage.getItem("profilePic")} className="w-8 h-8" />

                        </div>
                        <div onClick={handleOpen}>
                            <p>{localStorage.getItem("role") === "principal" ? "Principal" : "Admin"}</p>
                        </div>
                        <div onClick={handleLogout} className='cursor-pointer'>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16.8307 17.7C16.5804 17.4111 16.4552 17.0833 16.4552 16.7167C16.4552 16.35 16.5804 16.0444 16.8307 15.8L19.357 13.3333H9.55903C9.17212 13.3333 8.8478 13.2056 8.58606 12.95C8.32432 12.6944 8.19346 12.3778 8.19346 12C8.19346 11.6222 8.32432 11.3056 8.58606 11.05C8.8478 10.7944 9.17212 10.6667 9.55903 10.6667H19.357L16.8307 8.2C16.5576 7.93333 16.4211 7.61667 16.4211 7.25C16.4211 6.88333 16.5576 6.56667 16.8307 6.3C17.0811 6.03333 17.394 5.9 17.7696 5.9C18.1451 5.9 18.458 6.02222 18.7084 6.26667L23.6245 11.0667C23.761 11.2 23.8578 11.3444 23.9147 11.5C23.9715 11.6556 24 11.8222 24 12C24 12.1778 23.9715 12.3444 23.9147 12.5C23.8578 12.6556 23.761 12.8 23.6245 12.9333L18.7084 17.7333C18.4125 18.0222 18.0882 18.15 17.7354 18.1167C17.3826 18.0833 17.0811 17.9444 16.8307 17.7ZM2.73115 24C1.98009 24 1.33713 23.7389 0.802276 23.2167C0.267425 22.6944 0 22.0667 0 21.3333V2.66667C0 1.93333 0.267425 1.30556 0.802276 0.783333C1.33713 0.261111 1.98009 0 2.73115 0H10.9246C11.3115 0 11.6358 0.127778 11.8976 0.383333C12.1593 0.638889 12.2902 0.955556 12.2902 1.33333C12.2902 1.71111 12.1593 2.02778 11.8976 2.28333C11.6358 2.53889 11.3115 2.66667 10.9246 2.66667H2.73115V21.3333H10.9246C11.3115 21.3333 11.6358 21.4611 11.8976 21.7167C12.1593 21.9722 12.2902 22.2889 12.2902 22.6667C12.2902 23.0444 12.1593 23.3611 11.8976 23.6167C11.6358 23.8722 11.3115 24 10.9246 24H2.73115Z"
                                    fill="#1C1C1C"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div class="border-b-2 border-black mb-2"></div>

            <>
                <div className="flex justify-center mb-4">
                    {
                        localStorage.getItem("role") === "admin" && <Select
                            options={institutes}
                            onChange={(option) => {
                                setInstituteId(option.value);
                            }}
                            placeholder="Select Institute"
                        />
                    }

                </div>
                <div className="flex justify-around gap-4 flex-wrap"  >
                    {
                        assignment && assignment.length > 0 && assignment.map((x) => {
                            return (
                                <AssignmentCard name={x.assignmentsName} assignments={5} key={x.id} id={x.id} handleAssignment={handleAssignmentName} />
                            )
                        })
                    }

                </div>
            </>

        </div>

    )
}
