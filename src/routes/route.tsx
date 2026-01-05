import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "@/error/ErrorPage";
import ResetPasswordForm from "@/pages/authentication/NewPassword";
import Login from "@/pages/authentication/Login";
import ForgetPassword from "@/pages/authentication/ForgetPassword";
import VerifyOtp from "@/pages/authentication/VerifyOtp";
import AboutUS from "@/pages/setting/About";
import PrivacyPolicy from "@/pages/setting/PrivacyPolicy";
import TermsCondition from "@/pages/setting/TermsCondition";
import Notifications from "@/pages/notifications/Notifications";
import Profile from "@/pages/profile/Profile";
import EditProfile from "@/pages/profile/EditProfile";
import ChangePassword from "@/pages/profile/ChangePassword";
import Dashboard from "@/pages/dashboard/dashboard/Dashboard";
import Apartment from "@/pages/dashboard/apartment/Projects";
import Faq from "@/pages/faq/FAQ";
import Subscriptions from "@/pages/subscriptions/Subscriptions";
import AddCreateProject from "@/pages/dashboard/apartment/ProjectForm";

import PrivateRoute from "./PrivateRoute";
import Subscriber from "@/pages/dashboard/dashboard/Subscriber";
// import ApartmentCreate from "@/pages/dashboard/apartment/ApartmentCreate";
import ApartmentDetails from "@/pages/dashboard/apartment/ProjectDetails";
import UserTable from "@/components/userTable";
import PushNotification from "@/pages/pushNotification/PushNotification";
import Policy from "@/components/public-routes/Policy";
import Support from "@/components/public-routes/Support";
import DeleteAccount from "@/components/public-routes/DeleteAccount";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "Subscriber", element: <Subscriber /> },
      { path: "projectForm", element: <AddCreateProject /> },
      { path: "projects", element: <Apartment /> },
      // { path: "new-apartment", element: <NewApartment /> },
      { path: "projects-details", element: <ApartmentDetails /> },
      { path: "subscriptions", element: <Subscriptions /> },
      { path: "faq", element: <Faq /> },
      { path: "push-notification", element: <PushNotification /> },
      { path: "users", element: <UserTable /> },
      { path: "about", element: <AboutUS /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-condition", element: <TermsCondition /> },
      { path: "notifications", element: <Notifications /> },
      { path: "profile", element: <Profile /> },
      { path: "edit-profile", element: <EditProfile /> },
      { path: "change-password", element: <ChangePassword /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/forget-password", element: <ForgetPassword /> },
  { path: "/verify-otp", element: <VerifyOtp /> },
  { path: "/new-password", element: <ResetPasswordForm /> },
  { path: "/policy", element: <Policy /> },
  { path: "/support", element: <Support /> },
  { path: "/delete-account", element: <DeleteAccount /> },
]);

export default router;
