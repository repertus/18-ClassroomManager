using Classroom.API.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Classroom.API.Controllers
{
    public class DashboardController : ApiController
    {
        private ClassroomDataContext _db;

        public DashboardController()
        {
            _db = new ClassroomDataContext();
        }

        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok(new
            {
                StudentCount = _db.Students.Count(),
                ProjectCount = _db.Projects.Count(),
                AssignmentCount = _db.Assignments.Count()

            });
        }
    }
}
