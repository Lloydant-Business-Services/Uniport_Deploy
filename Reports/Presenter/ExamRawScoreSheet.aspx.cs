﻿using Abundance_Nk.Business;
using Abundance_Nk.Model.Model;
using Abundance_Nk.Web.Models;
using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Web.UI;

namespace Abundance_Nk.Web.Reports.Presenter
{
    public partial class ExamRawScoreSheet :Page
    {
        private readonly List<Semester> semesters = new List<Semester>();
        private Course course;
        private string courseId;
        private List<Course> courses;
        private Department department;
        private List<Department> departments;
        private string deptId;
        private Level level;
        private string levelId;
        private string progId;
        private Programme programme;
        private Semester semester;
        private string semesterId;
        private Session session;
        private string sessionId;

        public Session SelectedSession
        {
            get
            {
                return new Session { Id = Convert.ToInt32(ddlSession.SelectedValue),Name = ddlSession.SelectedItem.Text };
            }
            set { ddlSession.SelectedValue = value.Id.ToString(); }
        }

        public Semester SelectedSemester
        {
            get
            {
                return new Semester
                {
                    Id = Convert.ToInt32(ddlSemester.SelectedValue),
                    Name = ddlSemester.SelectedItem.Text
                };
            }
            set { ddlSemester.SelectedValue = value.Id.ToString(); }
        }

        public Programme SelectedProgramme
        {
            get
            {
                return new Programme
                {
                    Id = Convert.ToInt32(ddlProgramme.SelectedValue),
                    Name = ddlProgramme.SelectedItem.Text
                };
            }
            set { ddlProgramme.SelectedValue = value.Id.ToString(); }
        }

        public Department SelectedDepartment
        {
            get
            {
                return new Department
                {
                    Id = Convert.ToInt32(ddlDepartment.SelectedValue),
                    Name = ddlDepartment.SelectedItem.Text
                };
            }
            set { ddlDepartment.SelectedValue = value.Id.ToString(); }
        }

        public Level SelectedLevel
        {
            get { return new Level { Id = Convert.ToInt32(ddlLevel.SelectedValue),Name = ddlLevel.SelectedItem.Text }; }
            set { ddlLevel.SelectedValue = value.Id.ToString(); }
        }

        public Course SelectedCourse
        {
            get
            {
                return new Course { Id = Convert.ToInt32(ddlCourse.SelectedValue),Name = ddlCourse.SelectedItem.Text };
            }
            set { ddlCourse.SelectedValue = value.Id.ToString(); }
        }

        protected void Page_Load(object sender,EventArgs e)
        {
            try
            {
                lblMessage.Text = "";

                if(Request.QueryString["levelId"] != null && Request.QueryString["semesterId"] != null &&
                    Request.QueryString["progId"] != null && Request.QueryString["deptId"] != null &&
                    Request.QueryString["sessionId"] != null && Request.QueryString["courseId"] != null)
                {
                    levelId = Request.QueryString["levelId"];
                    semesterId = Request.QueryString["semesterId"];
                    progId = Request.QueryString["progId"];
                    deptId = Request.QueryString["deptId"];
                    sessionId = Request.QueryString["sessionId"];
                    courseId = Request.QueryString["courseId"];
                    int deptId1 = Convert.ToInt32(deptId);
                    int progId1 = Convert.ToInt32(progId);
                    int sessionId1 = Convert.ToInt32(sessionId);
                    int levelId1 = Convert.ToInt32(levelId);
                    int semesterId1 = Convert.ToInt32(semesterId);
                    int courseId1 = Convert.ToInt32(courseId);
                    session = new Session { Id = sessionId1 };
                    semester = new Semester { Id = semesterId1 };
                    course = new Course { Id = courseId1 };
                    department = new Department { Id = deptId1 };
                    level = new Level { Id = levelId1 };
                    programme = new Programme { Id = progId1 };
                }
                else
                {
                    Display_Button.Visible = true;
                }

                if(!Request.IsAuthenticated)
                {
                    Response.Redirect("http://www.abiastateuniversity.edu.ng/",true);
                }

                if(!IsPostBack)
                {
                    if(string.IsNullOrEmpty(deptId) || string.IsNullOrEmpty(progId) || string.IsNullOrEmpty(sessionId))
                    {
                        Utility.BindDropdownItem(ddlSession,Utility.GetAllSessions(),Utility.ID,Utility.NAME);

                        ddlSemester.Visible = false;
                        Utility.BindDropdownItem(ddlProgramme,Utility.GetAllProgrammes(),Utility.ID,Utility.NAME);

                        Utility.BindDropdownItem(ddlLevel,Utility.GetAllLevels(),Utility.ID,Utility.NAME);

                        ddlDepartment.Visible = false;
                        ddlCourse.Visible = false;
                    }
                    else
                    {
                        DisplayStaffReport(session,semester,course,department,level,programme);
                        ddlDepartment.Visible = false;
                        ddlCourse.Visible = false;
                        ddlLevel.Visible = false;
                        ddlProgramme.Visible = false;
                        ddlSemester.Visible = false;
                        ddlSession.Visible = false;
                    }
                }
            }
            catch(Exception ex)
            {
                lblMessage.Text = ex.Message + ex.InnerException.Message;
            }
        }

        private void DisplayStaffReport(Session session,Semester semester,Course course,Department department,
            Level level,Programme programme)
        {
            try
            {
                DisplayReportBy(session,semester,course,department,level,programme);
            }
            catch(Exception ex)
            {
                lblMessage.Text = ex.Message + ex.InnerException.Message;
                ;
            }
        }

        protected void Display_Button_Click1(object sender,EventArgs e)
        {
            try
            {
                if(InvalidUserInput())
                {
                    lblMessage.Text = "All fields must be selected";
                    return;
                }

                DisplayReportBy(SelectedSession,SelectedSemester,SelectedCourse,SelectedDepartment,SelectedLevel,
                    SelectedProgramme);
            }
            catch(Exception ex)
            {
                lblMessage.Text = ex.Message + ex.InnerException.Message;
                ;
            }
        }

        private bool InvalidUserInput()
        {
            try
            {
                if(SelectedSession == null || SelectedSession.Id <= 0 || SelectedDepartment == null ||
                    SelectedDepartment.Id <= 0 || SelectedProgramme == null || SelectedProgramme.Id <= 0)
                {
                    return true;
                }

                return false;
            }
            catch(Exception)
            {
                throw;
            }
        }

        private void DisplayReportBy(Session session,Semester semester,Course course,Department department,
            Level level,Programme programme)
        {
            try
            {
                var studentResultLogic = new StudentResultLogic();
                List<Model.Model.Result> studeResults = studentResultLogic.GetStudentResultBy(session,semester,level,
                    programme,department,course);
                string bind_dsStudentResultSummary = "dsExamRawScoreSheet";
                string reportPath = @"Reports\Result\ExamRawScoreSheet.rdlc";

                ReportViewer1.Reset();
                ReportViewer1.LocalReport.DisplayName = "Examination Raw Score Sheet ";
                ReportViewer1.LocalReport.ReportPath = reportPath;

                if(studeResults != null)
                {
                    ReportViewer1.ProcessingMode = ProcessingMode.Local;
                    ReportViewer1.LocalReport.DataSources.Add(new ReportDataSource(bind_dsStudentResultSummary.Trim(),
                        studeResults));
                    ReportViewer1.LocalReport.Refresh();
                    ReportViewer1.Visible = true;
                }
            }
            catch(Exception ex)
            {
                lblMessage.Text = ex.Message + ex.InnerException.Message;
            }
        }

        protected void ddlProgramme_SelectedIndexChanged1(object sender,EventArgs e)
        {
            var programme = new Programme { Id = Convert.ToInt32(ddlProgramme.SelectedValue) };
            var departmentLogic = new DepartmentLogic();
            departments = departmentLogic.GetBy(programme);
            departments.Insert(0,new Department { Name = "-- Select Department--" });
            Utility.BindDropdownItem(ddlDepartment,departments,Utility.ID,Utility.NAME);

            ddlDepartment.Visible = true;
        }

        protected void ddlSession_SelectedIndexChanged1(object sender,EventArgs e)
        {
            var session = new Session { Id = Convert.ToInt32(ddlSession.SelectedValue) };
            var sessionSemesterLogic = new SessionSemesterLogic();
            List<SessionSemester> semesterList = sessionSemesterLogic.GetModelsBy(p => p.Session_Id == session.Id);
            foreach(SessionSemester sessionSemester in semesterList)
            {
                semesters.Add(sessionSemester.Semester);
            }
            semesters.Insert(0,new Semester { Name = "-- Select Semester--" });
            Utility.BindDropdownItem(ddlSemester,semesters,Utility.ID,Utility.NAME);
            ddlSemester.Visible = true;
        }

        protected void ddlDepartment_SelectedIndexChanged(object sender,EventArgs e)
        {
            try
            {
                var courseLogic = new CourseLogic();
                courses =
                    courseLogic.GetModelsBy(
                        p =>
                            p.Programme_Id == SelectedProgramme.Id && p.Department_Id == SelectedDepartment.Id && p.Level_Id == SelectedLevel.Id &&
                            p.Semester_Id == SelectedSemester.Id);
                courses.Insert(0,new Course { Name = "-- Select Course--" });
                Utility.BindDropdownItem(ddlCourse,courses,Utility.ID,Utility.NAME);

                ddlCourse.Visible = true;
            }
            catch(Exception ex)
            {
                lblMessage.Text = ex.Message + ex.InnerException.Message;
            }
        }
    }
}