import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import GridView, { IColumns, IGridViewState } from "../../grid-view/GridView";
import ModalC from "../../modal/ModalC";
import PlineTools, { TypeAlert } from "../../services/PlineTools";
import SipGlobals from "../../sip/sip-globals/SipGlobals";
import SipProfileForm from "../../sip/sip-profiles/SipProfileForm";
import GlobalOutboundsForm from "../global-outbound/GlobalOutboundsForm";
import SpecificOutboundsForm from "../specific-outbound/SpecificOutboundsForm";


const OutboundRoutes = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modaltype, setmodalType]=useState({
 });
  const [state, setState] = useState<IGridViewState>({
    content: [],
    pageable: {
      offset: 0,
      pageNumber: 0,
      pageSize: 0,
      totalElements: 0,
      totalPages: 0,
    },
    totalPages: 0,
    totalElements: 0,
    size: 0,
  });
  const [searchParams, setSearchParams] = useState<any>();
  const [sortParams, setSortParams] = useState<string>();
  const navigate = useNavigate();

  const pageSize = 10;
  const columns: IColumns[] = [
    {
      label: "Row",
      id: "#",
      search: false,
    },
    {
      label: "Name",
      id: "name",
      search: true,
      sort: true,
    },
    {
      
      label: "Route Type",
      id: "routeType",
      value: (value: object) => {
        return (
          <select className={"form-select"}
            onChange={(e) => {
              let tmp = e.target.value;
              if(tmp==="global")
              {
                setModalIsOpen(true);
                setmodalType(<SipProfileForm/>)
              }if(tmp==="specific"){
                setModalIsOpen(true);
                setmodalType(<SpecificOutboundsForm/>)
              }
              
            }}
          >
            <option value={""}>Route Type</option>
            <option value="private">Private</option>
            <option value="global">Global</option>
            <option value="specific">Specific</option>
          </select>
        )
      }
    },
    {
      label: "Edit",
      id: "id",
      value: (value: Object) => {
        return (
          <p
            className="edit"
            onClick={() => {
              Edit(value);
            }}
          >
            <PencilSquare />
          </p>
        );
      },
    },
    {
      label: "Delete",
      id: "id",
      value: (value: string) => {
        return (
          <p
            className="delete"
            onClick={() => {
              Delete(value);
            }}
          >
            <Trash />
          </p>
        );
      },
    },
  ];

  const getData = (page = 0, size = pageSize) => {
    const searchUrl = new URLSearchParams(searchParams).toString();

    let sort = "";
    if (sortParams !== undefined) {
      sort = "sort=" + sortParams;
    }

    PlineTools.getRequest(
      `/sip-trunks/index?page=${page}&size=${size}&${searchUrl}&${sort}`)
      .then((data: any) => {
        setState(data.data);
      })
      .catch((error: any) => {
        PlineTools.errorDialogMessage(
          "An error occurred while executing your request. Contact the system administrator\n" +
          error
        );
      });
  };

  const Delete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this Profile?")) {
      PlineTools.postRequest("/sip-trunks/delete", { id: id }).then((result) => {
        if (result.data.hasError) {
          PlineTools.showAlert(result.data.messages, TypeAlert.Danger);
        } else {
          getData();
        }
      });
    }
  };

  const Edit = (id: Object) => {
    navigate("/call-routes/outbound-routes/edit/" + id);
  };

  useEffect(() => {
    getData();
    return () => { };
  }, [searchParams, sortParams]);

  const search = (f: string, v: string) => {
    let tmp = { ...searchParams };
    tmp[f] = v;
    setSearchParams(tmp);
  };

  const sort = (f: string) => {
    setSortParams(f);
  };

  return (
    <div>
      <Row>
        <ModalC show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
          {modaltype}
        </ModalC>
        <Col>
          <Button
            onClick={() => {
              navigate("/call-routes/outbound-routes/create");
            }}
          >
            New Outbound Route
          </Button>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h4>List of Outbound Routes</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <GridView
            Columns={columns}
            Data={state.content}
            Events={{
              first: () => {
                getData(0);
              },
              pre: () => {
                if (state.pageable.pageNumber - 1 >= 0)
                  getData(state.pageable.pageNumber - 1);
              },
              next: () => {
                if (state.totalPages > state.pageable.pageNumber + 1)
                  getData(state.pageable.pageNumber + 1);
              },
              last: () => {
                getData(state.totalPages - 1);
              },
            }}
            Pagination={{
              totalElements: state.totalElements,
              totalPages: state.totalPages,
              pageSize: state.pageable.pageSize,
              offset: state.pageable.offset,
              pageNumber: state.pageable.pageNumber,
            }}
            SearchEvent={search}
            SortEvent={sort}
          />
        </Col>
      </Row>
    </div>
  );
};

export default OutboundRoutes;