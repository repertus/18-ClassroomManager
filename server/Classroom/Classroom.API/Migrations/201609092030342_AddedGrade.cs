namespace Classroom.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedGrade : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Assignments", "AssignmentGrade", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Assignments", "AssignmentGrade");
        }
    }
}
