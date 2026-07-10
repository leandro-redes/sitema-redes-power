import React, { useEffect, useRef, useState } from "react";

// DataTable
import DataTable from "react-data-table-component";

// Utils
import ExcelExport from "utils/ExportExcel";

// Reactstrap
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

// Pell
import pell from "pell";
import "pell/dist/pell.min.css";

const PellEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const pellInstance = useRef(null);

  useEffect(() => {
    pellInstance.current = pell.init({
      element: editorRef.current,
      defaultParagraphSeparator: "p",
      onChange: (html) => {
        onChange(html);
      },
      actions: [
        "bold",
        "italic",
        "underline",
        "heading1",
        "heading2",
        "olist",
        "ulist",
        "quote",
        "code",
        "line",
        "link",
        "image",
      ],
    });

    pellInstance.current.content.innerHTML = value || "";
  }, []);

  useEffect(() => {
    if (!pellInstance.current) return;

    const content = pellInstance.current.content;

    if (content.innerHTML !== value) {
      content.innerHTML = value || "";
    }
  }, [value]);

  return <div ref={editorRef} className="pell-editor-wrapper" />;
};

const Proyectos = () => {
  const [show, setShow] = useState(false);  
  const handleModalShow = () => setShow(true);
  const handleModalClose = () => setShow(false);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [i_cliente, setInputClienteValue] = useState("");
  const [i_fecha, setInputFechaValue] = useState("");
  const [i_nombre, setInputNombreValue] = useState("");
  const [i_descripcion, setInputDescripcionValue] = useState("");
  const [i_sede, setInputSedeValue] = useState("");
  const [i_iso, setInputIsoValue] = useState("");

  const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <FormGroup className="d-flex align-items-center">
      <Input
        id="busqueda-nombre"
        type="text"
        placeholder="Filtrar por orden"
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />

      <Button type="button" color="secondary" onClick={onClear}>
        x
      </Button>
    </FormGroup>
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const handleGuardarProyecto = () => {
    const nuevoProyecto = {
      cliente: i_cliente,
      fecha: i_fecha,
      nombre: i_nombre,
      descripcion: i_descripcion,
    };

    console.log(nuevoProyecto);
  };

  let xlsxSave = [];

  return (
    <div className="content">
      <Button color="primary" onClick={handleModalShow}>
        Nuevo proyecto
      </Button>

      <ExcelExport data={xlsxSave} fileName="Listado de proyectos FECHA" />

      <Modal size="xl" isOpen={show} toggle={handleModalClose}>
        <ModalHeader toggle={handleModalClose}>Nuevo Proyecto</ModalHeader>

        <ModalBody>
          <Form>
            <Row><Col>
              <FormGroup>
                <Label for="i_nombre">Nombre de proyecto</Label>
                <Input
                  type="text"
                  id="i_nombre"
                  value={i_nombre}
                  onChange={(e) => setInputNombreValue(e.target.value)}
                />
              </FormGroup>
            </ Col></Row>

            <Row>
              <Col xl="6">
                <FormGroup>
                  <Label for="i_cliente">Cliente</Label>
                  <Input
                    type="text"
                    id="i_cliente"
                    value={i_cliente}
                    onChange={(e) => setInputClienteValue(e.target.value)}
                  />
                </FormGroup>
              </ Col>

              <Col xl="6">
                <FormGroup>
                  <Label for="i_sede">Sede</Label>
                  <Input
                    type="text"
                    id="i_sede"
                    value={i_sede}
                    onChange={(e) => setInputSedeValue(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col xl="6">
                <FormGroup>
                  <Label for="i_sede">ISO</Label>
                  <Input
                    type="text"
                    id="i_iso"
                    value={i_iso}
                    onChange={(e) => setInputIsoValue(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col xl="6">
                <FormGroup>
                  <Label for="i_fecha">Fecha de caratula</Label>
                  <Input
                    type="date"
                    id="i_fecha"
                    value={i_fecha}
                    onChange={(e) => setInputFechaValue(e.target.value)}
                  />
                </FormGroup></Col>
            </Row>


            <Col>
              <FormGroup>
                <Label>Descripción</Label>
                <PellEditor
                  value={i_descripcion}
                  onChange={setInputDescripcionValue}
                />
              </FormGroup>
            </Col>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={handleModalClose}>
            Cerrar
          </Button>

          <Button
            color="primary"
            onClick={handleGuardarProyecto}
            id="saveProyectoButton"
          >
            Guardar
          </Button>
        </ModalFooter>
      </Modal>

      <DataTable
        title="Lista de proyectos"
        columns={[]}
        data={[]}
        paginationResetDefaultPage={resetPaginationToggle}
        pointerOnHover
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
        highlightOnHover
      />
    </div>
  );
};

export default Proyectos;