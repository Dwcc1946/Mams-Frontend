import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  admin: icon('ic-admin'),
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
  accounting: icon('ic-accounting'),
  registrar: icon('ic-registrar'),
  guidance: icon('ic-guidance'),
  dean: icon('ic-dean'),
  faculty: icon('ic-faculty'),
  student: icon('ic-student'),
  profile: icon('ic-profile'),
  schedule: icon('ic-schedule'),
  grades: icon('ic-grades'),
  ledger: icon('ic-ledger'),
  enrollment: icon('ic-enrollment'),
  id: icon('ic-id'),
  password: icon('ic-password'),
  report: icon('ic-report'),
  basiced: icon('ic-basiced'),
  saao: icon('ic-saao'),
  clearance: icon('ic-clearance'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Overview',
    items: [
      { title: 'Dashboard', path: paths.dashboard.root, icon: ICONS.dashboard },
      {
        title: 'Administrator',
        path: paths.dashboard.admin.root,
        icon: ICONS.admin,
        children: [
          { title: 'School Year', path: paths.dashboard.admin.schoolyear },
          { title: 'Creation of Semester', path: paths.dashboard.admin.createSem },
          { title: 'Faculty Type', path: paths.dashboard.admin.facultyType },
          { title: 'User', path: paths.dashboard.admin.user },
          { title: 'Campus', path: paths.dashboard.admin.campus },
          { title: 'Building', path: paths.dashboard.admin.building },
          { title: 'Room', path: paths.dashboard.admin.room },
          { title: 'Track', path: paths.dashboard.admin.track },
          { title: 'Strand', path: paths.dashboard.admin.strand },
          { title: 'Department', path: paths.dashboard.admin.department },
          { title: 'Course Group', path: paths.dashboard.admin.courseGroup },
          { title: 'Course [COLLEGE]', path: paths.dashboard.admin.courseCL },
          { title: 'Program [GS]', path: paths.dashboard.admin.programGS },
          { title: 'Documents [SPED - SHS]', path: paths.dashboard.admin.documentElem },
          { title: 'Documents [COLLEGE]', path: paths.dashboard.admin.documentCollege },
          { title: 'Documents [GS]', path: paths.dashboard.admin.documentGS },
          { title: 'EPT Subject', path: paths.dashboard.admin.ept },
          { title: 'Company Profile', path: paths.dashboard.admin.cp },
          { title: 'Access Control', path: paths.dashboard.admin.accessControl },
        ],
      },
      {
        title: 'Accounting',
        path: paths.dashboard.accounting.root,
        icon: ICONS.accounting,
        children: [
          {
            title: 'Setup',
            path: paths.dashboard.accounting.setup.root,
            children: [
              { title: 'Discount', path: paths.dashboard.accounting.setup.discount },
              { title: 'Payment', path: paths.dashboard.accounting.setup.payment },
              { title: 'Counter', path: paths.dashboard.accounting.setup.counter },
              { title: 'Chart of Account', path: paths.dashboard.accounting.setup.coa },
              { title: 'Fee [SPED - SHS]', path: paths.dashboard.accounting.setup.feeElem },
              { title: 'Fee [College - GS]', path: paths.dashboard.accounting.setup.feeCollege },
            ],
          },
          { title: 'Downpayment Override', path: paths.dashboard.accounting.downOverride },
          { title: 'Plot Discount', path: paths.dashboard.accounting.plotDiscount },
          { title: 'Student Discount', path: paths.dashboard.accounting.studentDiscount },
          { title: 'Debit / Credit Memo', path: paths.dashboard.accounting.dcMemo },
          { title: 'Tag as Promissory', path: paths.dashboard.accounting.tagPromisory },
          { title: 'Fees Assignment [SPED - JHS]', path: paths.dashboard.accounting.faElem },
          { title: 'Fees Assignment [SHS]', path: paths.dashboard.accounting.faShs },
          {
            title: 'Fees Assignment [COLLEGE]',
            path: paths.dashboard.accounting.faCollege.root,
            children: [
              { title: 'Tuition Fee', path: paths.dashboard.accounting.faCollege.tf },
              { title: 'Mandatory Fee', path: paths.dashboard.accounting.faCollege.mf },
              { title: 'Room Fee', path: paths.dashboard.accounting.faCollege.rf },
              { title: 'Subject Fee', path: paths.dashboard.accounting.faCollege.sf },
              { title: 'Course Fee', path: paths.dashboard.accounting.faCollege.cf },
            ],
          },
          {
            title: 'Fees Assignment [GS]',
            path: paths.dashboard.accounting.faGS.root,
            children: [
              { title: 'Tuition Fee', path: paths.dashboard.accounting.faGS.tf },
              { title: 'Mandatory Fee', path: paths.dashboard.accounting.faGS.mf },
              { title: 'Subject Fee', path: paths.dashboard.accounting.faGS.sf },
            ],
          },
          {
            title: 'Fees Adjustment [SPED - JHS]',
            path: paths.dashboard.accounting.faAdjustElem.root,
            children: [
              { title: 'Add Fee', path: paths.dashboard.accounting.faAdjustElem.addFee },
              { title: 'Delete Fee', path: paths.dashboard.accounting.faAdjustElem.deleteFee },
            ],
          },
          {
            title: 'Fees Adjustment [SHS]',
            path: paths.dashboard.accounting.faAdjustShs.root,
            children: [
              { title: 'Add Fee', path: paths.dashboard.accounting.faAdjustShs.addFee },
              { title: 'Delete Fee', path: paths.dashboard.accounting.faAdjustShs.deleteFee },
            ],
          },
          {
            title: 'Fees Adjustment [COLLEGE]',
            path: paths.dashboard.accounting.faAdjustCollege.root,
            children: [
              { title: 'Add Fee', path: paths.dashboard.accounting.faAdjustCollege.addFee },
              { title: 'Delete Fee', path: paths.dashboard.accounting.faAdjustCollege.deleteFee },
            ],
          },
          {
            title: 'Fees Adjustment [GS]',
            path: paths.dashboard.accounting.faAdjustGs.root,
            children: [
              { title: 'Add Fee', path: paths.dashboard.accounting.faAdjustGs.addFee },
              { title: 'Delete Fee', path: paths.dashboard.accounting.faAdjustGs.deleteFee },
            ],
          },
          { title: 'Payment Schedule [SPED - JHS]', path: paths.dashboard.accounting.psElem },
          { title: 'Payment Schedule [SHS]', path: paths.dashboard.accounting.psShs },
          { title: 'Payment Schedule [COLLEGE - GS]', path: paths.dashboard.accounting.psCollege },
          { title: 'Batch Assessment', path: paths.dashboard.accounting.batchAssessment },
        ],
      },
      {
        title: 'Registrar',
        path: paths.dashboard.registrar.root,
        icon: ICONS.registrar,
        children: [
          { title: 'Accreditation of Subjects', path: paths.dashboard.registrar.accreditation },
          {
            title: 'Assessment',
            path: paths.dashboard.registrar.root,
            children: [
              { title: 'Assessment [SPED - JHS]', path: paths.dashboard.registrar.assessment.elem },
              { title: 'Assessment SHS]', path: paths.dashboard.registrar.assessment.shs },
              { title: 'Assessment [COLLEGE]', path: paths.dashboard.registrar.assessment.college },
              { title: 'Assessment [GS]', path: paths.dashboard.registrar.assessment.gs },
            ],
          },
          { title: 'Application for Credentials', path: paths.dashboard.registrar.credentials },
          { title: 'Compute Incomplete Grades', path: paths.dashboard.registrar.computeIncomplete },
          { title: 'Comprehensive Exam Grade [GS]', path: paths.dashboard.registrar.computeIncomplete },
          {
            title: 'Enrollment',
            path: paths.dashboard.registrar.enrollment.root,
            children: [
              { title: 'Enrollment [SPED - JHS]', path: paths.dashboard.registrar.enrollment.elem },
              { title: 'Enrollment [SHS]', path: paths.dashboard.registrar.enrollment.shs },
              { title: 'Enrollment [COLLEGE]', path: paths.dashboard.registrar.enrollment.college },
              { title: 'Enrollment [GS]', path: paths.dashboard.registrar.enrollment.gs },
            ],
          },
          {
            title: 'Enrollment Adjustment',
            path: paths.dashboard.registrar.enrollmentAdjustment.root,
            children: [
              { title: 'Enrollment Adjustment [SHS]', path: paths.dashboard.registrar.enrollmentAdjustment.shs },
              {
                title: 'Enrollment Adjustment [COLLEGE]',
                path: paths.dashboard.registrar.enrollmentAdjustment.college,
              },
              { title: 'Enrollment Adjustment [GS]', path: paths.dashboard.registrar.enrollmentAdjustment.gs },
            ],
          },
          { title: 'Enrollment Monitoring [College]', path: paths.dashboard.registrar.enrollmentMonitoringCollege },
          {
            title: 'Equivalency',
            path: paths.dashboard.registrar.equivalency.root,
            children: [
              { title: 'Equivalency [AUTO]', path: paths.dashboard.registrar.equivalency.auto },
              { title: 'Equivalency [MANUAL]', path: paths.dashboard.registrar.equivalency.manual },
              { title: 'Equivalency [GS]', path: paths.dashboard.registrar.equivalency.gsManual },
            ],
          },
          {
            title: 'General Saving - Grading Sheet',
            path: paths.dashboard.registrar.generalSavingGradingSheet.root,
            children: [
              {
                title: 'General Saving - Grading Sheet [ELEM]',
                path: paths.dashboard.registrar.generalSavingGradingSheet.elem,
              },
              {
                title: 'General Saving - Grading Sheet [COLLEGE - GS]',
                path: paths.dashboard.registrar.generalSavingGradingSheet.college,
              },
            ],
          },
          { title: 'Graduation Details', path: paths.dashboard.registrar.graduationDetails },
          {
            title: 'Individual Year Leveling [College]',
            path: paths.dashboard.registrar.individualYearLevelingCollege,
          },
          { title: 'NSTP Assignment', path: paths.dashboard.registrar.nstpAssignment },
          { title: 'Old Student (Add Grade and Subject)', path: paths.dashboard.registrar.oldStudent },
          { title: 'Restore Deleted Grades', path: paths.dashboard.registrar.restoreGrade },
          {
            title: 'Schedule',
            path: paths.dashboard.registrar.schedule.root,
            children: [
              {
                title: 'Online Registration [SPED - JHS]',
                path: paths.dashboard.registrar.schedule.onlineRegistrationElem,
              },
              { title: 'Online Registration [SHS]', path: paths.dashboard.registrar.schedule.onlineRegistrationShs },
              {
                title: 'Online Registration [COLLEGE - GS]',
                path: paths.dashboard.registrar.schedule.onlineRegistrationCollege,
              },
              { title: 'Encoding of Grades [SPED - JHS]', path: paths.dashboard.registrar.schedule.encodingGradesElem },
              { title: 'Encoding of Grades [SHS]', path: paths.dashboard.registrar.schedule.encodingGradesShs },
              {
                title: 'Encoding of Grades [COLLEGE - GS]',
                path: paths.dashboard.registrar.schedule.encodingGradesCollege,
              },
              {
                title: 'Encoding of Section Offering',
                path: paths.dashboard.registrar.schedule.encodingSectionOffering,
              },
              { title: 'Section Offering Schedule', path: paths.dashboard.registrar.schedule.sectionOfferingSchedule },
              {
                title: 'Application for Graduation Schedule',
                path: paths.dashboard.registrar.schedule.graduationSchedule,
              },
            ],
          },
          {
            title: 'Section Assignment',
            path: paths.dashboard.registrar.sectionAssignment.root,
            children: [
              { title: 'Section Assignment [SPED - JHS]', path: paths.dashboard.registrar.sectionAssignment.elem },
              { title: 'Section Assignment [SHS]', path: paths.dashboard.registrar.sectionAssignment.shs },
            ],
          },
          { title: 'Section Offering [COLLEGE]', path: paths.dashboard.registrar.sectionOffering },
          {
            title: 'Setup',
            path: paths.dashboard.registrar.setup.root,
            children: [
              { title: 'COMPRE Unit(s) Requirements [GS]', path: paths.dashboard.registrar.setup.compreUnitsGs },
              { title: 'Course Grade Pre-requisite', path: paths.dashboard.registrar.setup.courseGradePrerequisite },
              { title: 'Curriculum [COLLEGE]', path: paths.dashboard.registrar.setup.curriculumCollege },
              { title: 'Curriculum [GS]', path: paths.dashboard.registrar.setup.curriculumGs },
              { title: 'Curriculum [SHS]', path: paths.dashboard.registrar.setup.curriculumShs },
              { title: 'Curriculum [SPED - JHS]', path: paths.dashboard.registrar.setup.curriculumElem },
              {
                title: 'Curriculum Type Required Units [GS]',
                path: paths.dashboard.registrar.setup.curriculumTypeUnitsGs,
              },
              {
                title: 'General Clearance Signatories',
                path: paths.dashboard.registrar.setup.generalClearanceSignatories,
              },
              {
                title: 'Grading System [COLLEGE - GS]',
                path: paths.dashboard.registrar.setup.gradingSystem.root,
                children: [
                  {
                    title: 'Grading System [CURRICULUM]',
                    path: paths.dashboard.registrar.setup.gradingSystem.curriculum,
                  },
                  { title: 'Grading System [SUBJECT]', path: paths.dashboard.registrar.setup.gradingSystem.subject },
                ],
              },
              { title: 'Grade Equivalent [College]', path: paths.dashboard.registrar.setup.gradeEquivalentCollege },
              { title: 'Grade Equivalent [GS]', path: paths.dashboard.registrar.setup.gradeEquivalentGs },
              { title: 'Section [COLLEGE - GS]', path: paths.dashboard.registrar.setup.sectionCollege },
              { title: 'Section [SPED - SHS]', path: paths.dashboard.registrar.setup.sectionElem },
              { title: 'Subject [COLLEGE - GS]', path: paths.dashboard.registrar.setup.subjectCollege },
              { title: 'Subject [SPED - SHS]', path: paths.dashboard.registrar.setup.subjectElem },
              { title: 'System Config', path: paths.dashboard.registrar.setup.systemConfig },
              { title: 'Year Leveling', path: paths.dashboard.registrar.setup.yearLeveling },
            ],
          },
          {
            title: 'Slot Monitoring',
            path: paths.dashboard.registrar.slotMonitoring.root,
            children: [
              { title: 'Slot Monitoring [College]', path: paths.dashboard.registrar.slotMonitoring.college },
              { title: 'Slot Monitoring [SHS]', path: paths.dashboard.registrar.slotMonitoring.shs },
              { title: 'Slot Monitoring [SPED - JHS]', path: paths.dashboard.registrar.slotMonitoring.elem },
            ],
          },
          {
            title: 'Subject Tagging [GS]',
            path: paths.dashboard.registrar.subjectTagging.root,
            children: [
              { title: 'Penalty Subject Tagging [GS]', path: paths.dashboard.registrar.subjectTagging.penalty },
              { title: 'Remedial Subject Tagging [GS]', path: paths.dashboard.registrar.subjectTagging.remedial },
            ],
          },
          {
            title: 'Year Leveling',
            path: paths.dashboard.registrar.yearLeveling.root,
            children: [
              { title: 'Individual Year Leveling [COLLEGE', path: paths.dashboard.registrar.yearLeveling.individual },
              { title: 'Compute Year Leveling [COLLEGE]', path: paths.dashboard.registrar.yearLeveling.compute },
            ],
          },
        ],
      },
      {
        title: 'Guidance',
        path: paths.dashboard.guidance.root,
        icon: ICONS.guidance,
        children: [
          {
            title: 'Application [SPED - SHS]',
            path: paths.dashboard.guidance.applicationElem.root,
            children: [
              { title: 'Application Form', path: paths.dashboard.guidance.applicationElem.form },
              { title: 'SHS Transition', path: paths.dashboard.guidance.applicationElem.shsTransition },
              { title: 'ELEM Transition', path: paths.dashboard.guidance.applicationElem.elemTransition },
              { title: 'Document Submitted', path: paths.dashboard.guidance.applicationElem.documents },
              { title: 'Interview', path: paths.dashboard.guidance.applicationElem.interview },
              { title: 'Application Process', path: paths.dashboard.guidance.applicationElem.process },
            ],
          },
          {
            title: 'Application [COLLEGE]',
            path: paths.dashboard.guidance.applicationCollege.root,
            children: [
              { title: 'Application Form', path: paths.dashboard.guidance.applicationCollege.form },
              { title: 'College Transition', path: paths.dashboard.guidance.applicationCollege.collegeTransition },
              { title: 'College Double Major', path: paths.dashboard.guidance.applicationCollege.doubleMajor },
              { title: 'Document Submitted', path: paths.dashboard.guidance.applicationCollege.documents },
              { title: 'EPT', path: paths.dashboard.guidance.applicationCollege.ept },
              { title: 'Interview', path: paths.dashboard.guidance.applicationCollege.interview },
              { title: 'Application Process', path: paths.dashboard.guidance.applicationCollege.process },
            ],
          },
          {
            title: 'Application [GS]',
            path: paths.dashboard.guidance.applicationGs.root,
            children: [
              { title: 'Application Form', path: paths.dashboard.guidance.applicationGs.form },
              { title: 'GS Transition', path: paths.dashboard.guidance.applicationGs.gsTransition },
              { title: 'GS Double Major', path: paths.dashboard.guidance.applicationGs.doubleMajor },
              { title: 'Document Submitted', path: paths.dashboard.guidance.applicationGs.documents },
              { title: 'GMAT', path: paths.dashboard.guidance.applicationGs.gmat },
              { title: 'Interview', path: paths.dashboard.guidance.applicationGs.interview },
              { title: 'Application Process', path: paths.dashboard.guidance.applicationGs.process },
            ],
          },
          { title: 'Shifting [COLLEGE]', path: paths.dashboard.guidance.shiftingCollege },
          { title: 'Grade Deficiency', path: paths.dashboard.guidance.gradeDeficiency },
        ],
      },
      {
        title: 'Dean',
        path: paths.dashboard.dean.root,
        icon: ICONS.dean,
        children: [
          { title: 'Curriculum [COLLEGE]', path: paths.dashboard.dean.curriculumCollege },
          { title: 'Section Offering [SPED - JHS]', path: paths.dashboard.dean.sectionOfferingElem },
          { title: 'Section Offering [SHS]', path: paths.dashboard.dean.sectionOfferingShs },
          { title: 'Section Offering [COLLEGE]', path: paths.dashboard.dean.sectionOfferingCollege },
          { title: 'Section Offering [GS]', path: paths.dashboard.dean.sectionOfferingGs },
          { title: 'Faculty Loading [COLLEGE]', path: paths.dashboard.dean.facultyLoadingCollege },
          { title: 'Faculty Loading [GS]', path: paths.dashboard.dean.facultyLoadingGs },
          { title: 'Faculty Loading Schedule', path: paths.dashboard.dean.facultyLoadingSchedule },
          { title: 'Maximum Units Allowed For Enrollment [GS]', path: paths.dashboard.dean.maxUnitsAllowedGs },
          { title: 'Comprehensive Exam [GS]', path: paths.dashboard.dean.comprehensiveExamGs },
          { title: 'Comprehensive Exam Approval [GS]', path: paths.dashboard.dean.comprehensiveExamApprovalGs },
          { title: 'Comprehensive Exam Grade [GS]', path: paths.dashboard.dean.comprehensiveExamGradeGs },
          { title: 'Room Availability', path: paths.dashboard.dean.roomAvailability },
          { title: 'Faculty Availability', path: paths.dashboard.dean.facultyAvailability },
          { title: 'Subjects Offered', path: paths.dashboard.dean.subjectsOffered },
          { title: 'Faculty Schedule Query', path: paths.dashboard.dean.facultyScheduleQuery },
          { title: 'Tutorial Query', path: paths.dashboard.dean.tutorialQuery },
          { title: 'Class Schedule Query', path: paths.dashboard.dean.classScheduleQuery },
          { title: 'Student - Grade Deficiency', path: paths.dashboard.dean.studentGradeDeficiency },
          { title: 'Student - Grade Retention', path: paths.dashboard.dean.studentGradeRetention },
          { title: 'Faculty Evaluation Schedule', path: paths.dashboard.dean.facultyEvaluationSchedule },
        ],
      },
      {
        title: 'Faculty',
        path: paths.dashboard.faculty.root,
        icon: ICONS.faculty,
        children: [
          { title: 'Grading Sheet [KINDER]', path: paths.dashboard.faculty.gradingSheet.kinder },
          { title: 'Grading Sheet [ELEM - JHS]', path: paths.dashboard.faculty.gradingSheet.elemJhs },
          { title: 'Grading Sheet [SHS]', path: paths.dashboard.faculty.gradingSheet.shs },
          { title: 'Grading Sheet [COLLEGE]', path: paths.dashboard.faculty.gradingSheet.college },
          { title: 'Grading Sheet [GS]', path: paths.dashboard.faculty.gradingSheet.gs },
        ],
      },
      {
        title: 'Student',
        path: paths.dashboard.student.root,
        icon: ICONS.student,
        children: [
          { title: 'Student Profile', icon: ICONS.profile, path: paths.dashboard.student.profile },
          { title: 'Student Schedule', icon: ICONS.schedule, path: paths.dashboard.student.schedule },
          { title: 'Student Grades', icon: ICONS.grades, path: paths.dashboard.student.grades },
          { title: 'Periodical Grade', icon: ICONS.grades, path: paths.dashboard.student.periodicalGrade },
          { title: 'Student Ledger', icon: ICONS.ledger, path: paths.dashboard.student.ledger },
          {
            title: 'Student Enrollment and Assessment',
            icon: ICONS.enrollment,
            path: paths.dashboard.student.enrollmentAssessment,
          },
          { title: 'Student ID Master', icon: ICONS.id, path: paths.dashboard.student.idMaster },
          { title: 'Student Change Password', icon: ICONS.password, path: paths.dashboard.student.changePassword },
        ],
      },
      {
        title: 'Reports',
        path: paths.dashboard.reports.root,
        icon: ICONS.report,
        children: [
          {
            title: 'Registrar',
            path: paths.dashboard.reports.registrar.root,
            children: [
              { title: 'Class Schedule', path: paths.dashboard.reports.registrar.classSchedule },
              { title: 'Faculty Class List', path: paths.dashboard.reports.registrar.facultyClassList },
              { title: 'Enrollment Data', path: paths.dashboard.reports.registrar.enrollmentData },
              {
                title: 'Enrollment Data [Yr Lvl/Gender]',
                path: paths.dashboard.reports.registrar.enrollmentDataYrLvlGender,
              },
              { title: 'Enrollment Data [Gender]', path: paths.dashboard.reports.registrar.enrollmentDataGender },
              { title: 'Enrollment List', path: paths.dashboard.reports.registrar.enrollmentList },
              {
                title: 'Enrollment List [w/Bridging Course]',
                path: paths.dashboard.reports.registrar.enrollmentListBridgingCourse,
              },
              { title: 'Subject Offering', path: paths.dashboard.reports.registrar.subjectOffering },
              { title: 'Year Leveling', path: paths.dashboard.reports.registrar.yearLeveling },
              { title: 'Enrolled Students', path: paths.dashboard.reports.registrar.enrolledStudents },
              {
                title: 'Certification',
                path: paths.dashboard.reports.registrar.certification.root,
                children: [
                  { title: 'Certification', path: paths.dashboard.reports.registrar.certification.certification },
                  {
                    title: 'Certification with GWA',
                    path: paths.dashboard.reports.registrar.certification.certificationWithGwa,
                  },
                ],
              },
              {
                title: 'Request',
                path: paths.dashboard.reports.registrar.request.root,
                children: [
                  {
                    title: 'Form-137-A / Transcript of Records',
                    path: paths.dashboard.reports.registrar.request.form137a,
                  },
                  { title: 'SF10', path: paths.dashboard.reports.registrar.request.sf10 },
                ],
              },
              { title: 'Student Grades', path: paths.dashboard.reports.registrar.studentGrades },
              {
                title: 'Application for Graduation',
                path: paths.dashboard.reports.registrar.applicationForGraduation.root,
                children: [
                  {
                    title: 'Application for Graduation',
                    path: paths.dashboard.reports.registrar.applicationForGraduation.application,
                  },
                  {
                    title: 'Manually Tag Applicants',
                    path: paths.dashboard.reports.registrar.applicationForGraduation.manualTag,
                  },
                ],
              },
              {
                title: 'Transcript of Records',
                path: paths.dashboard.reports.registrar.transcriptOfRecords.root,
                children: [
                  { title: 'TOR - OLD', path: paths.dashboard.reports.registrar.transcriptOfRecords.old },
                  { title: 'TOR - NEW', path: paths.dashboard.reports.registrar.transcriptOfRecords.new },
                  {
                    title: 'Transcript of Records [GS]',
                    path: paths.dashboard.reports.registrar.transcriptOfRecords.gs,
                  },
                ],
              },
              { title: 'Gradingsheet Report', path: paths.dashboard.reports.registrar.gradingsheetReport },
              { title: 'GWA', path: paths.dashboard.reports.registrar.gwa },
              { title: 'Grade Deficiency', path: paths.dashboard.reports.registrar.gradeDeficiency },
            ],
          },
          {
            title: 'Dean',
            path: paths.dashboard.reports.dean.root,
            children: [
              { title: 'Student Evaluation of Faculty', path: paths.dashboard.reports.dean.studentEvaluation },
              { title: 'Summary of Ratings', path: paths.dashboard.reports.dean.summaryOfRatings },
              { title: 'Class Schedule', path: paths.dashboard.reports.dean.classSchedule },
              { title: 'Faculty Schedule Report', path: paths.dashboard.reports.dean.facultySchedule },
              { title: 'Tutorial Report', path: paths.dashboard.reports.dean.tutorialReport },
              { title: 'HR Report', path: paths.dashboard.reports.dean.hrReport },
              { title: 'Faculty by Department Report', path: paths.dashboard.reports.dean.facultyByDepartment },
              {
                title: 'Room',
                path: paths.dashboard.reports.dean.room.root,
                children: [
                  { title: 'All Rooms Report', path: paths.dashboard.reports.dean.room.allRooms },
                  { title: 'By Room Schedule', path: paths.dashboard.reports.dean.room.byRoomSchedule },
                  { title: 'Room with Conflict Schedule', path: paths.dashboard.reports.dean.room.conflictSchedule },
                ],
              },
            ],
          },
          {
            title: 'Accounting',
            path: paths.dashboard.reports.accounting.root,
            children: [
              {
                title: 'Educational Income Schedule',
                path: paths.dashboard.reports.accounting.educationalIncomeSchedule,
              },
              {
                title: 'Educational Income Summary',
                path: paths.dashboard.reports.accounting.educationalIncomeSummary,
              },
              {
                title: 'Educational Income Total Summary',
                path: paths.dashboard.reports.accounting.educationalIncomeTotalSummary,
              },
              {
                title: 'Summary of Students / Units Enrolled',
                path: paths.dashboard.reports.accounting.studentsUnitsEnrolled,
              },
              {
                title: 'Summary of Students / Tuition Fee',
                path: paths.dashboard.reports.accounting.studentsTuitionFee,
              },
              {
                title: 'Detailed Students Tuition Units',
                path: paths.dashboard.reports.accounting.studentsTuitionUnits,
              },
              { title: 'Individual Assessment', path: paths.dashboard.reports.accounting.individualAssessment },
              { title: 'Statement of Account', path: paths.dashboard.reports.accounting.statementOfAccount },
              { title: 'Tuition/Misc/Lab', path: paths.dashboard.reports.accounting.tuitionMiscLab },
              {
                title: 'Admission Slip',
                path: paths.dashboard.reports.accounting.admissionSlip.root,
                children: [
                  { title: 'Admission Slip', path: paths.dashboard.reports.accounting.admissionSlip.slip },
                  { title: 'Generate Admission Slip', path: paths.dashboard.reports.accounting.admissionSlip.generate },
                  { title: 'Admission Slip Ind', path: paths.dashboard.reports.accounting.admissionSlip.ind },
                ],
              },
              { title: 'Account Slip', path: paths.dashboard.reports.accounting.accountSlip },
              { title: 'Receivables', path: paths.dashboard.reports.accounting.receivables },
              { title: 'Daily Collection', path: paths.dashboard.reports.accounting.dailyCollection },
              { title: 'Void Payments', path: paths.dashboard.reports.accounting.voidPayments },
              { title: 'Subject Fee', path: paths.dashboard.reports.accounting.subjectFee },
              {
                title: 'Debit/Credit/Discount',
                path: paths.dashboard.reports.accounting.debitCreditDiscount.root,
                children: [
                  {
                    title: 'Summary of Debit/Credit/Discount',
                    path: paths.dashboard.reports.accounting.debitCreditDiscount.summary,
                  },
                  {
                    title: 'Detailed Student Cash Discount',
                    path: paths.dashboard.reports.accounting.debitCreditDiscount.cashDiscount,
                  },
                  {
                    title: 'Detailed Credit/Debit',
                    path: paths.dashboard.reports.accounting.debitCreditDiscount.creditDebit,
                  },
                ],
              },
              { title: 'Student Balance', path: paths.dashboard.reports.accounting.studentBalance },
            ],
          },
        ],
      },
      {
        title: 'Basic Education',
        path: paths.dashboard.basicEducation.root,
        icon: ICONS.basiced,
        children: [
          { title: 'Class Schedule BE', path: paths.dashboard.basicEducation.classSchedule },
          { title: 'Hide Grades [SPED - JHS]', path: paths.dashboard.basicEducation.hideGradesElem },
          { title: 'Hide Grades [SHS]', path: paths.dashboard.basicEducation.hideGradesShs },
          {
            title: 'SHS - Transfer/Irregular Students [Add Grade and Subject]',
            path: paths.dashboard.basicEducation.shsTransferIrreg,
          },
          { title: 'Student Profile - BE', path: paths.dashboard.basicEducation.studentProfileBe },
        ],
      },
      {
        title: 'SAAO',
        path: paths.dashboard.saao.root,
        icon: ICONS.saao,
        children: [{ title: 'Application for Good Moral and Certification', path: paths.dashboard.saao.goodMoral }],
      },
      {
        title: 'Clearance',
        path: paths.dashboard.clearance.root,
        icon: ICONS.clearance,
        children: [
          { title: 'View Clearance [COLLEGE]', path: paths.dashboard.clearance.viewCollege },
          {
            title: 'Tagging of Clearance',
            path: paths.dashboard.clearance.tagging.root,
            children: [
              { title: "School Dean's Office", path: paths.dashboard.clearance.tagging.deansOffice },
              { title: 'Student Affairs Office', path: paths.dashboard.clearance.tagging.studentAffairs },
              { title: 'Student Council', path: paths.dashboard.clearance.tagging.studentCouncil },
              { title: 'Library', path: paths.dashboard.clearance.tagging.library },
              { title: 'Guidance Office', path: paths.dashboard.clearance.tagging.guidanceOffice },
              {
                title: 'SCHOOL',
                path: paths.dashboard.clearance.tagging.school.root,
                children: [
                  { title: 'Accountancy', path: paths.dashboard.clearance.tagging.school.accountancy },
                  { title: 'Liberal Arts', path: paths.dashboard.clearance.tagging.school.liberalArts },
                  { title: 'Business', path: paths.dashboard.clearance.tagging.school.business },
                  {
                    title: 'Hospitality and Tourism Management',
                    path: paths.dashboard.clearance.tagging.school.hospitalityTourism,
                  },
                  { title: 'Criminal Justice', path: paths.dashboard.clearance.tagging.school.criminalJustice },
                  { title: 'Education', path: paths.dashboard.clearance.tagging.school.education },
                  { title: 'Information Technology', path: paths.dashboard.clearance.tagging.school.it },
                  { title: 'Engineering', path: paths.dashboard.clearance.tagging.school.engineering },
                  {
                    title: 'Architecture and Fine Arts',
                    path: paths.dashboard.clearance.tagging.school.architectureFineArts,
                  },
                ],
              },
            ],
          },
          {
            title: 'AAO Clearance Tagging for Graduating Students',
            path: paths.dashboard.clearance.aaoTaggingGraduates,
          },
        ],
      },
    ],
  },
];

