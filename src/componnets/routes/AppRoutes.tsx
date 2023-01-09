import React from "react";
import GlobalOutbounds from "../call-routes/global-outbound/GlobalOutbounds";
import GlobalOutboundsForm from "../call-routes/global-outbound/GlobalOutboundsForm";
import Inbounds from "../call-routes/inbound/Inbounds";
import InboundsForm from "../call-routes/inbound/InboundsForm";
import OutboundRoutes from "../call-routes/outbound-routes/OutboundRoutes";
import OutboundRoutesForm from "../call-routes/outbound-routes/OutboundRoutesForm";
import SpecificOutbound from "../call-routes/specific-outbound/SpecificOutbound";
import SpecificOutboundsForm from "../call-routes/specific-outbound/SpecificOutboundsForm";
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
  { path: "/sip-suer-groups/index", element: <SipUserGroups /> },
  { path: "/sip-user-groups/create", element: <SipUserGroupsForm /> },
  { path: "/sip-user-groups/edit/:id", element: <SipUserGroupsForm /> },
  { path: "/call-routes/outbound-routes/index", element: <OutboundRoutes /> },
  { path: "/call-routes/outbound-routes/create", element: <OutboundRoutesForm /> },
  { path: "/call-routes/outbound-routes/edit/:id", element: <OutboundRoutesForm /> },
  // { path: "/call-routes/inbound/index", element: <Inbounds /> },
  // { path: "/call-routes/inbound/create", element: <InboundsForm /> },
  // { path: "/call-routes/inbound/edit/:id", element: <InboundsForm /> },
  // { path: "/call-routes/specific-outbound/index", element: <SpecificOutbound /> },
  // { path: "/call-routes/specific-outbound/create", element: <SpecificOutboundsForm /> },
  // { path: "/call-routes/specific-outbound/edit/:id", element: <SpecificOutboundsForm /> },
  
  
];
