import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';
// import { AuthContext } from 'src/auth/context/auth-context';

// ----------------------------------------------------------------------

// Overview
const IndexPage = lazy(() => import('src/pages/dashboard'));

// Admin
const SchoolYear = lazy(() => import('src/pages/dashboard/admin/school-year'));
const CreateSemester = lazy(() => import('src/pages/dashboard/admin/create-semester'));
const FacultyType = lazy(() => import('src/pages/dashboard/admin/faculty-type'));
const User = lazy(() => import('src/pages/dashboard/admin/user'));
const Campus = lazy(() => import('src/pages/dashboard/admin/campus'));
const Building = lazy(() => import('src/pages/dashboard/admin/building'));
const Room = lazy(() => import('src/pages/dashboard/admin/room'));
const Track = lazy(() => import('src/pages/dashboard/admin/track'));
const Strand = lazy(() => import('src/pages/dashboard/admin/strand'));
const Department = lazy(() => import('src/pages/dashboard/admin/department'));
const CourseGroup = lazy(() => import('src/pages/dashboard/admin/course-group'));
const CourseCollege = lazy(() => import('src/pages/dashboard/admin/course-college'));
const Program = lazy(() => import('src/pages/dashboard/admin/program'));
const DocumentsElem = lazy(() => import('src/pages/dashboard/admin/documents-elem'));
const DocumentsCollege = lazy(() => import('src/pages/dashboard/admin/documents-college'));
const DocumentsGS = lazy(() => import('src/pages/dashboard/admin/documents-gs'));
const EptSubject = lazy(() => import('src/pages/dashboard/admin/ept-subject'));
const CompanyProfile = lazy(() => import('src/pages/dashboard/admin/company-profile'));
const AccessControl = lazy(() => import('src/pages/dashboard/admin/access-control'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'admin',
        children: [
          { element: <IndexPage />, index: true },
          { path: 'school_year', element: <SchoolYear /> },
          { path: 'create_sem', element: <CreateSemester /> },
          { path: 'faculty_type', element: <FacultyType /> },
          { path: 'user', element: <User /> },
          { path: 'campus', element: <Campus /> },
          { path: 'building', element: <Building /> },
          { path: 'room', element: <Room /> },
          { path: 'track', element: <Track /> },
          { path: 'strand', element: <Strand /> },
          { path: 'department', element: <Department /> },
          { path: 'course_group', element: <CourseGroup /> },
          { path: 'course_college', element: <CourseCollege /> },
          { path: 'program_gs', element: <Program /> },
          { path: 'documents_elem', element: <DocumentsElem /> },
          { path: 'documents_college', element: <DocumentsCollege /> },
          { path: 'documents_gs', element: <DocumentsGS /> },
          { path: 'ept_subject', element: <EptSubject /> },
          { path: 'company_profile', element: <CompanyProfile /> },
          { path: 'access_control', element: <AccessControl /> },
        ],
      },
    ],
  },
];

