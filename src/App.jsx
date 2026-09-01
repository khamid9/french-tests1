import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from './context/AppContext.jsx'
import { ToastProvider } from './components/ui.jsx'
import Layout from './components/Layout.jsx'
const Home = lazy(() => import('./pages/Home.jsx'))
const TestsPage = lazy(() => import('./pages/TestsPage.jsx'))
const TestInfo = lazy(() => import('./pages/TestInfo.jsx'))
const TestRun = lazy(() => import('./pages/TestRun.jsx'))
const TestResult = lazy(() => import('./pages/TestResult.jsx'))
const ReviewPage = lazy(() => import('./pages/ReviewPage.jsx'))
const Jeu = lazy(() => import('./pages/Jeu.jsx'))
const Profile = lazy(() => import('./pages/Profile.jsx'))
const PublicProfile = lazy(() => import('./pages/PublicProfile.jsx'))
const Favorites = lazy(() => import('./pages/Favorites.jsx'))
const ErrorsPage = lazy(() => import('./pages/ErrorsPage.jsx'))
const Settings = lazy(() => import('./pages/Settings.jsx'))
const AuthPage = lazy(() => import('./pages/AuthPage.jsx'))
const AccessPage = lazy(() => import('./pages/AccessPage.jsx'))
const PasswordReset = lazy(() => import('./pages/PasswordReset.jsx'))
const Admin = lazy(() => import('./pages/admin/Admin.jsx'))

function Protected({ children }) {
  const { user } = useApp()
  if (!user) return <Navigate to="/auth" replace />
  if (user.accessStatus && user.accessStatus !== 'active') return <Navigate to="/acces" replace />
  return children
}

function AdminRoute({ children }) {
  const { user } = useApp()
  if (!user) return <Navigate to="/auth" replace />
  if (user.role !== 'admin') return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <ToastProvider>
      <Suspense fallback={<div className="container" style={{ display: 'grid', placeItems: 'center', minHeight: '70vh' }}><div className="spinner"></div></div>}>
        <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tests" element={<TestsPage />} />
          <Route path="/tests/:id" element={<TestInfo />} />
          <Route path="/jeu" element={<Protected><Jeu /></Protected>} />
          <Route path="/classement" element={<Navigate to="/jeu" replace />} />
          <Route path="/profil" element={<Protected><Profile /></Protected>} />
          <Route path="/user/:id" element={<PublicProfile />} />
          <Route path="/favoris" element={<Protected><Favorites /></Protected>} />
          <Route path="/erreurs" element={<Protected><ErrorsPage /></Protected>} />
          <Route path="/parametres" element={<Protected><Settings /></Protected>} />
          <Route path="/admin/*" element={<AdminRoute><Admin /></AdminRoute>} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/acces" element={<AccessPage />} />
          <Route path="/password-reset" element={<PasswordReset />} />
        </Route>
        <Route path="/run/:id" element={<Protected><TestRun /></Protected>} />
        <Route path="/result/:attemptId" element={<Protected><TestResult /></Protected>} />
        <Route path="/review/:attemptId" element={<Protected><ReviewPage /></Protected>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Suspense>
    </ToastProvider>
  )
}
