using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Classroom.API.Infrastructure;
using Classroom.API.Models;

namespace Classroom.API.Controllers
{
    public class AssignmentsController : ApiController
    {
        private ClassroomDataContext db = new ClassroomDataContext();

        // GET: api/Assignments
        public IQueryable<Assignment> GetAssignments()
        {
            return db.Assignments;
        }

        // GET: api/Assignments/3/8
        [ResponseType(typeof(Assignment))]
        [HttpGet, Route("api/assignments/{studentId}/{projectId}")]//added
        public IHttpActionResult GetAssignment(int studentId, int projectId)//Changed int id
        {
            Assignment assignment = db.Assignments.Find(studentId, projectId);//changed id
            if (assignment == null)
            {
                return NotFound();
            }

            return Ok(assignment);
        }

        // PUT: api/Assignments/5
        [ResponseType(typeof(void))]
        [HttpPut, Route("api/assignments/{studentId}/{projectId}")]//added api address for grades
        public IHttpActionResult PutAssignment(int studentId, int projectId, Assignment assignment)//changed int id
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (studentId != assignment.StudentId || projectId != assignment.ProjectId)//changed id != assignment.StudentId
            {
                return BadRequest();
            }

            db.Entry(assignment).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssignmentExists(studentId, projectId))//changed id
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Assignments
        [ResponseType(typeof(Assignment))]
        public IHttpActionResult PostAssignment(Assignment assignment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Assignments.Add(assignment);

            try
            {
                db.SaveChanges();

                //Added code to refresh data on front end
                assignment.Project = db.Projects.Find(assignment.ProjectId);
                assignment.Student = db.Students.Find(assignment.StudentId);
                
            }
            catch (DbUpdateException)
            {
                if (AssignmentExists(assignment.StudentId, assignment.ProjectId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = assignment.StudentId }, assignment);
        }

        // DELETE: api/Assignments/5
        [ResponseType(typeof(Assignment))]
        [HttpDelete, Route("api/assignments/{studentId}/{projectId}")]//added
        public IHttpActionResult DeleteAssignment(int studentId, int projectId)//replaced int Id
        {
            Assignment assignment = db.Assignments.Find(studentId, projectId);//replaced Id
            if (assignment == null)
            {
                return NotFound();
            }

            db.Assignments.Remove(assignment);
            db.SaveChanges();

            return Ok(assignment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AssignmentExists(int studentId, int projectId)//changed int Id
        {
            return db.Assignments.Count(e => e.StudentId == studentId && e.ProjectId == projectId) > 0;//changed e => e.StudentId == id
        }
    }
}