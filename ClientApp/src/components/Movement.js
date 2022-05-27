import { Component } from "react";
import {
    Button, Form, Navbar, Input, UncontrolledDropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Card, CardBody, CardTitle, CardSubtitle,
    CardText, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Row, Col
} from "reactstrap";
import {
    BsPlusLg, BsSearch, BsFillDiagram3Fill, BsBasketFill, BsBoxSeam,
    BsListStars, BsInboxesFill, BsTable, BsPencilFill, BsFillTrashFill
} from "react-icons/bs";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/transactions.css';
import Logo from '../Images/northwindLogoUnico.png';
import Profile from '../Images/stone-cold-steve-austin-wwe.jpg';

export class Movement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //modal: false, 
            data: [],
            suppliers: [],
            companies: [],
            employees: [],
            warehouses: [],
            accion: 0,
            movementId: 0,
            dateMov: "",
            provName: null,//foranea
            sourceWare: 0,//foranea
            targetWare: null,//foranea
            typeMov: "",
            notesMov: null,
            empId: "",//foranea
            compania: 1,
            movEditable: {}
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        fetch('/api/movements').then((response) => {
            return response.json();
        }).then((dataApi) => {
            this.setState({ data: dataApi })
            //console.log(dataApi);
        }).catch(function (error) {
            console.log(error);
        })

        fetch('/api/suppliers').then((response) => {
            return response.json();
        }).then((dataApi) => {
            this.setState({ suppliers: dataApi })
            //console.log(dataApi);
        }).catch(function (error) {
            console.log(error);
        })

        fetch('/api/companies').then((response) => {
            return response.json();
        }).then((dataApi) => {
            this.setState({ companies: dataApi })
            //console.log(dataApi);
        }).catch(function (error) {
            console.log(error);
        })

        fetch('/api/employees').then((response) => {
            return response.json();
        }).then((dataApi) => {
            this.setState({ employees: dataApi })
            // console.log(dataApi);
        }).catch(function (error) {
            console.log(error);
        })

        fetch('/api/warehouses').then((response) => {
            return response.json();
        }).then((dataApi) => {
            this.setState({ warehouses: dataApi })
            //console.log(dataApi);
        }).catch(function (error) {
            console.log(error);
        })
    }

    mitoggle = () => {
        this.setState({
            accion: 0,
            movementId: 0,
            dateMov: "",
            provName: null,//foranea
            sourceWare: 0,//foranea
            targetWare: null,//foranea
            typeMov: "",
            notesMov: null,
            empId: 0,//foranea
            compania: 1
        });
    }

    mostrarInsertar = () => {
        this.setState({
            accion: 1

        });
    }

    handleChange = (event) => {
        //Actualizo el estado segun los valores
        this.setState({ [event.target.name]: event.target.value });
        //console.log(this.state);
    }

    handleClick() {

        if (this.state.accion === 1) {

            var fecha = this.state.dateMov + "T00:00:00.000Z"

            var movimiento = {
                movementId: 0,
                date: fecha,
                supplierId: this.state.provName,
                originWarehouseId: this.state.sourceWare,
                targetWarehouseId: this.state.targetWare,
                type: this.state.typeMov,
                notes: this.state.notesMov,
                companyId: 1,
                employeeId: this.state.empId
            }

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(movimiento)
            };

            fetch('/api/movements', options)
                .then(
                    (response) => { return response.status; }
                ).then(
                    (code) => {
                        if (code == 201) {
                            console.log(code);
                            const allMoves = Array.from(this.state.data);
                            allMoves.push(movimiento);
                            this.componentDidMount();
                            this.mitoggle();
                        }
                    }
                );
        }
        else if (this.state.accion == 2) {
            var fecha = this.state.dateMov + "T00:00:00.000Z"

            var movimiento = {
                movementId: this.state.movementId,
                date: fecha,
                supplierId: this.state.provName,
                originWarehouseId: this.state.sourceWare,
                targetWarehouseId: this.state.targetWare,
                type: this.state.typeMov,
                notes: this.state.notesMov,
                companyId: this.state.compania,
                employeeId: this.state.empId
            }

            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(movimiento)
            };

            fetch('/api/movements/' + this.state.movEditable.movementId, options)
                .then(
                    (response) => { return response.status; }
                ).then(
                    (code) => {
                        console.log(code);
                        if (code == 204) {
                            console.log(code);
                            const allMoves = Array.from(this.state.data);
                            allMoves.push(movimiento);
                            this.componentDidMount();
                            this.mitoggle();
                        }
                    }
                );
        }
        else if (this.state.accion === 3) {

            var movimiento = {
                movementId: this.state.movementId,
                date: this.state.movEditable.date,
                supplierId: this.state.movEditable.supplierId,
                originWarehouseId: this.state.movEditable.originWarehouseId,
                targetWarehouseId: this.state.movEditable.targetWarehouseId,
                type: this.state.movEditable.type,
                notes: this.state.movEditable.notes,
                companyId: 1,
                employeeId: this.state.movEditable.employeeId
            }

            const options = {
                method: "DELETE"
            };

            fetch('/api/movements/' + this.state.movEditable.movementId, options)
                .then(
                    (response) => { return response.status; }
                ).then(
                    (code) => {
                        console.log("El código es: " + code);
                        if (code == 204 || code == 200) {
                            console.log(code);
                            const allMoves = Array.from(this.state.data);
                            allMoves.pop(movimiento);
                            this.componentDidMount();
                            this.mitoggle();
                        }
                    }
                );
        }

    }

    editar = (item) => {

        fetch('/api/movements/' + item.movementId)
            .then(response => { return response.json() })
            .then(o => {
                console.log("primer fetch " + o);
                this.setState({
                    accion: 2,
                    movementId: o.movementId,
                    dateMov: o.date.slice(0, 10),
                    provName: o.supplierId,//foranea
                    sourceWare: o.originWarehouseId,//foranea
                    targetWare: o.targetWarehouseId,//foranea
                    typeMov: o.type,
                    notesMov: o.notes,
                    empId: o.employeeId,//foranea
                    compania: o.companyId,
                    movEditable: o,
                });
            });
    }

    eliminar = (item) => {

        fetch('/api/movements/' + item.movementId)
            .then(response => { return response.json() })
            .then(o => {
                console.log(o);
                this.setState({ accion: 3, movEditable: o, movementId: o.movementId, typeMov: o.type })
            });
    }

    render() {
        return (
            <div>
                <div className="d-flex">
                    <div className="sidebar-container sidebar-color d-none d-md-block">
                        <div className="menu">
                            {/*<a href="/" className="d-block p-3 text-white active"><BsFillDiagram3Fill className="me-2 lead" /> Compañias</a>*/}
                            <a href="/suppliers" className="d-block p-3 text-white"><BsBasketFill className="me-2 lead" /> Proveedores</a>
                            <a href="/warehouses" className="d-block p-3 text-white"><BsInboxesFill className="me-2 lead" /> Almacenes</a>
                            <a href="/movements" className="d-block p-3 text-white selected"><BsTable className="me-2 lead" /> Movimientos</a>
                            <a href="/products" className="d-block p-3 text-white"><BsBoxSeam className="me-2 lead" /> Productos</a>
                            <a href="/categorys" className="d-block p-3 text-white"><BsListStars className="me-2 lead" /> Categorias</a>
                        </div>
                    </div>
                    <div className=" w-100">
                        <Navbar className="bg-light">
                            <div className="container">
                                <Form className="d-flex align-items-center position-relative w-75">
                                    <Input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
                                    <Button className="btn btn-search position-absolute" type="submit"><BsSearch /></Button>
                                </Form>
                            </div>
                        </Navbar>
                        <div className="content">
                            <section className="py-5 px-3" style={{ backgroundColor: "#d3e0ef" }}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-9">
                                            <h1 className="fw-bold mb-0 text-dark">Bienvenido Austin</h1>
                                            <p className="lead text-muted">Revisa la ultima información de movimientos</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-md-row flex-column mx-4 pt-3">
                                    <Card className="mx-3 border-s mt-3 mt-md-0">
                                        <CardBody>
                                            <CardTitle tag="h6" className="text-primary mb-3">Productos totales</CardTitle>
                                            <CardSubtitle tag="h5" className="text-dark">Cantidad de productos:</CardSubtitle>
                                            <CardText className="fs-2 fw-bold text-dark">452</CardText>
                                        </CardBody>
                                    </Card>
                                    <Card className="mx-3 border-s mt-3 mt-md-0">
                                        <CardBody>
                                            <CardTitle tag="h6" className="text-primary mb-3">Producto con más stock</CardTitle>
                                            <CardSubtitle tag="h5" className="text-dark">%product-name%:</CardSubtitle>
                                            <CardText className="fs-2 fw-bold text-dark">61</CardText>
                                        </CardBody>
                                    </Card>
                                    <Card className="mx-3 border-s mt-3 mt-md-0">
                                        <CardBody>
                                            <CardTitle tag="h6" className="text-primary mb-3">Almacenes totales</CardTitle>
                                            <CardSubtitle tag="h5" className="text-dark">Almacenes vinculados:</CardSubtitle>
                                            <CardText className="fs-2 fw-bold text-dark">4</CardText>
                                        </CardBody>
                                    </Card>
                                </div>
                            </section>
                            <div style={{ backgroundcolor: "#0055FF" }}>
                                <div className="py-3 my-5 bg-light mx-5 px-3">
                                    <div>
                                        <Button color="primary" onClick={this.mostrarInsertar}><BsPlusLg /> Agregar </Button>
                                    </div>
                                    <table id="example" className="table dt-responsive nowrap align-middle px-2">
                                        <thead>
                                            <tr>
                                                <th>Clave</th>
                                                <th>Fecha</th>
                                                <th>Proovedor</th>
                                                <th>Almacen origen</th>
                                                <th>Almacen destino</th>
                                                <th>Tipo de movimiento</th>
                                                <th>Notas</th>
                                                <th>Empleado</th>
                                                <th className="text-center">Operacion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.data.map(movements =>
                                                    <tr key={movements.movementId}>
                                                        <th scope="row">{movements.movementId}</th>
                                                        <td>{movements.date}</td>
                                                        <td>{movements.supplierId}</td>
                                                        <td>{movements.originWarehouseId}</td>
                                                        <td>{movements.targetWarehouseId}</td>
                                                        <td>{movements.type}</td>
                                                        <td>{movements.notes}</td>
                                                        <td>{movements.companyId}</td>
                                                        <td className="text-center">
                                                            <button type="button" className="btn btn-primary" onClick={() => this.editar(movements)}>
                                                                <BsPencilFill />
                                                            </button>
                                                            <button type="button" className="btn btn-danger" onClick={() => this.eliminar(movements)}>
                                                                <BsFillTrashFill />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                    <div>
                                        <Modal
                                            isOpen={this.state.accion > 0 && this.state.accion < 3 && true}
                                            toggle={this.mitoggle}
                                            className={this.props.className}
                                            centered
                                        >
                                            <ModalHeader toggle={this.mitoggle} className="text-dark" close={<Button onClick={this.mitoggle} className="btn-close"></Button>}>Movimiento</ModalHeader>
                                            <ModalBody className="text-dark">
                                                <Form>
                                                    <FormGroup>
                                                        <label for="movementId">ID del movimiento</label>
                                                        <input id="movementId" name="movementId" type="text" className="form-control mb-3" placeholder="" disabled="true" value={this.state.movementId} />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <label for="dateMov">Fecha del movimiento*</label>
                                                        <input id="dateMov" name="dateMov" type="date" className="form-control mb-3" onChange={this.handleChange} value={this.state.dateMov} />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="provName">Proovedor</label>
                                                        <select id="provName" name="provName" class="form-select mb-3" aria-label="Default select example" onChange={this.handleChange} value={this.state.provName}>
                                                            <option>Selecciona...</option>
                                                            {
                                                                this.state.suppliers.map(s =>
                                                                    <option value={s.supplierId}>{s.companyName}</option>
                                                                )
                                                            }
                                                        </select>
                                                    </FormGroup>

                                                    <Row>

                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <label for="sourceWare">Almacen origen*</label>
                                                                <select id="sourceWare" name="sourceWare" class="form-select mb-3" aria-label="Default select example" onChange={this.handleChange} value={this.state.sourceWare}>
                                                                    <option>Selecciona...</option>
                                                                    {
                                                                        this.state.warehouses.map(w =>
                                                                            <option value={w.warehouseId}>{w.description}</option>
                                                                        )
                                                                    }
                                                                </select>
                                                            </FormGroup>
                                                        </Col>

                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <label for="targetWare">Almacen destino</label>
                                                                <select id="targetWare" name="targetWare" class="form-select mb-3" aria-label="Default select example" onChange={this.handleChange} value={this.state.targetWare} >
                                                                    <option>Selecciona...</option>
                                                                    {
                                                                        this.state.warehouses.map(w =>
                                                                            <option value={w.warehouseId}>{w.description}</option>
                                                                        )
                                                                    }
                                                                </select>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                                    <FormGroup>
                                                        <label for="typeMov">Tipo de movimiento*</label>
                                                        <select id="typeMov" name="typeMov" class="form-select mb-3" aria-label="Default select example" onChange={this.handleChange} value={this.state.typeMov} >
                                                            <option>Selecciona...</option>
                                                            <option value={'COMPRA'} >COMPRA</option>
                                                            <option value={'TRASPASO'}>TRASPASO</option>
                                                            <option value={'AJUSTE'}>AJUSTE</option>
                                                            <option value={'VENTA'}>VENTA</option>
                                                        </select>
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="notesMov">Notas</label>
                                                        <Input id="notesMov" name="notesMov" type="textarea" className="mb-3" placeholder="" onChange={this.handleChange} value={this.state.notesMov} />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="empId">Empleado*</label>
                                                        <select id="empId" name="empId" class="form-select mb-3" aria-label="Default select example" onChange={this.handleChange} value={this.state.empId}>
                                                            <option>Selecciona...</option>
                                                            {
                                                                this.state.employees.map(e =>
                                                                    <option value={e.employeeId}>{e.firstName + " " + e.lastName}</option>
                                                                )
                                                            }
                                                        </select>
                                                    </FormGroup>
                                                </Form>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="primary" onClick={this.handleClick}>Agregar</Button>
                                                <Button color="secondary" onClick={this.mitoggle}>Cancelar</Button>
                                            </ModalFooter>
                                        </Modal>

                                        <Modal
                                            isOpen={this.state.accion == 3 && true}
                                            centered
                                            toggle={this.mitoogle}>

                                            <ModalHeader className="text-dark" toggle={this.mitoogle}>
                                                Eliminar
                                            </ModalHeader>
                                            <ModalBody className="text-dark">
                                                ¿Desea elimninar?
                                                <Row>
                                                    <Col md={2}>
                                                        <FormGroup>
                                                            <label for="elimination">ID</label>
                                                            <input id="elimination" name="elimination" type="text" className="form-control mb-3" placeholder="" disabled="true" value={this.state.movementId} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={10}>
                                                        <FormGroup>
                                                            <label for="movimiento">Tipo de movimiento</label>
                                                            <input id="movimiento" name="movimiento" type="text" className="form-control mb-3" placeholder="" disabled="true" value={this.state.typeMov} />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>

                                            </ModalBody>
                                            <ModalFooter>
                                                <Button
                                                    color="danger"
                                                    onClick={this.handleClick}
                                                >
                                                    Eliminar
                                                </Button>
                                                {' '}
                                                <Button onClick={this.mitoggle}>
                                                    Cancelar
                                                </Button>
                                            </ModalFooter>
                                        </Modal>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}