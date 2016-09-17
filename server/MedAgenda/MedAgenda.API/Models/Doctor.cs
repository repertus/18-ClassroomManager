﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MedAgenda.API.Models
{
    public class Doctor
    {
        public int DoctorId { get; set; }
        public int ExamRoomId { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }

        public virtual ICollection<DoctorCheckIn> DoctorCheckIns { get; set; }
        public virtual ICollection<Specialty> Specialties { get; set; }
        [ForeignKey("ExamRoomId")]
        public virtual ExamRoom ExamRoom { get; set; }
    }
}