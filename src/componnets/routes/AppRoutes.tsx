import React from "react";
import OutboundRoutes from "../call-routes/outbound-routes/OutboundRoutes";
import OutboundRoutesForm from "../call-routes/outbound-routes/OutboundRoutesForm";
import SipGlobals from "../sip/sip-globals/SipGlobals";
import SipProfileDetails from "../sip/sip-profile-details/SipProfileDetails";
import SipProfileForm from "../sip/sip-profiles/SipProfileForm";
import SipProfiles from "../sip/sip-profiles/SipProfiles";
import SipTrunkForm from "../sip/sip-trunks/SipTrunkForm";
import SipTrunks from "../sip/sip-trunks/SipTrunks";
import SipUsers from "../sip/sip-users/SipUsers";
import SipUsersForm from "../sip/sip-users/SipUsersForm";
import SystemSipSettings from "../sip/system-sip-settings/SystemSipSettings";
import SipUserGroups from "../sip/user-groups/SipUserGroups";
import SipUserGroupsForm from "../sip/user-groups/SipUserGroupsForm";
import SpecificOutboundsForm from "../call-routes/specific-outbound/SpecificOutboundsForm";
import ChangePassword from "../user/ChangePassword";
export interface IAppRouteNode {
  path: string;
  element: React.ReactNode;
}

export const AppRoutes = [
  { path: "/settings/sip-globals", element: <SipGlobals /> },
  { path: "/settings/system-sip-settings", element: <SystemSipSettings /> },
  { path: "/sip-profiles/index", element: <SipProfiles /> },
  { path: "/sip-profiles/edit/:id", element: <SipProfileForm /> },
  { path: "/sip-profiles/create", element: <SipProfileForm /> },
  { path: "/sip-profile-details/:id", element: <SipProfileDetails /> },
  { path: "/sip-trunks/index", element: <SipTrunks /> },
  { path: "/sip-trunks/edit/:id", element: <SipTrunkForm /> },
  { path: "/sip-trunks/create", element: <SipTrunkForm /> },
  { path: "/sip-users/index", element: <SipUsers /> },
  { path: "/sip-users/create", element: <SipUsersForm /> },
  { path: "/sip-users/edit/:id", element: <SipUsersForm /> },
  { path: "/sip-group-users/index", element: <SipUserGroups /> },
  { path: "/sip-group-users/create", element: <SipUserGroupsForm /> },
  { path: "/sip-group-users/edit/:id", element: <SipUserGroupsForm /> },
  { path: "/call-routes/outbound-routes/index", element: <OutboundRoutes /> },
  { path: "/call-routes/outbound-routes/create", element: <OutboundRoutesForm /> },
  { path: "/call-routes/outbound-routes/edit/:id", element: <OutboundRoutesForm /> },
  { path: "/call-routes/specific/create", element: <SpecificOutboundsForm /> },
  { path: "/sip-users/index", element: <SipUsers /> },
  { path: "/sip-users/create", element: <SipUsersForm /> },
  { path: "/sip-users/:id", element: <SipUsersForm /> },
  { path: "/change-password", element: <ChangePassword /> },
];
