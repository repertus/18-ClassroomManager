﻿using System.Collections.Generic;

namespace MedAgenda.API.Models
{
    public class Assignment
    {
        public int PatientCheckInId { get; set; }
        public int DoctorCheckInId { get; set; }
        public int ExamRoomId { get; set; }

        public System.DateTime CheckInTime { get; set; }
        public System.DateTime CheckOutTime { get; set; }


        public virtual PatientCheckIn PatientCheckIn { get; set; }
        public virtual DoctorCheckIn DoctorCheckIn { get; set; }
        public virtual ExamRoom ExamRoom { get; set; }
    }
}