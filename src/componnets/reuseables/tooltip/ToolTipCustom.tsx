import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import * as icons from 'react-bootstrap-icons'
const ToolTipCustom = (props:any) => {
  return (
    <OverlayTrigger
      placement="bottom"
      
      overlay={<Tooltip id="button-tooltip-2"><p>{props.help}</p></Tooltip>}>
      <icons.QuestionOctagon style={{ marginLeft: "5px" }} />
     
    </OverlayTrigger>
  )
}
ToolTipCustom.defaultProps={
  help:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Non hic magni adipisci laboriosam beatae, libero velit possimus incidunt veniam doloremque provident quaerat vitae quis magnam debitis porro earum dolorum natus"
}
export default ToolTipCustom