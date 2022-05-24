import { Component } from "react";
import {
    Button, Form, Navbar, Input, UncontrolledDropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Card, CardBody, CardTitle, CardSubtitle,
    CardText, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Row, Col
} from "reactstrap";
import {
    BsPlusLg, BsSearch, BsFillDiagram3Fill, BsBasketFill, BsBoxSeam,
    BsListStars, BsInboxesFill, BsTable, BsPencilFill
} from "react-icons/bs";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/transactions.css';
import Logo from '../Images/northwindLogoUnico.png';
import Profile from '../Images/stone-cold-steve-austin-wwe.jpg';

export class Movement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false, data: []
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        fetch('/api/movements').then((response) => {
            return response.json();
        }).then((dataApi) => {
            this.setState({ data: dataApi })
        }).catch(function (error) {
            console.log(error);
        })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <div className="d-flex">
                    <div className="sidebar-container sidebar-color d-none d-md-block">
                        <div className="logo">
                            <h2 className="m-0 fw-bold" style={{ color: "#FFFFFF" }}><img src={Logo} width="25em"
                                height="25em" className="pb-1" /> Northwind</h2>
                        </div>
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
                                <UncontrolledDropdown>
                                    <DropdownToggle caret nav className="text-muted">
                                        <img src={Profile} alt="" className="rounded-circle avatar me-2" /> Austin
                                    </DropdownToggle>
                                    <DropdownMenu className="text-dark" right>
                                        <DropdownItem>Mi Perfil</DropdownItem>
                                        <DropdownItem>Configuración</DropdownItem>
                                        <DropdownItem divider></DropdownItem>
                                        <DropdownItem>Cerrar sesión</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
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
                                        <Button color="primary" onClick={this.toggle}><BsPlusLg /> Agregar </Button>
                                    </div>
                                    <div>
                                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} centered>
                                            <ModalHeader toggle={this.toggle} className="text-dark" close={<Button onClick={this.toggle} className="btn-close"></Button>}>Agregar Movimiento</ModalHeader>
                                            <ModalBody className="text-dark">
                                                <Form>
                                                    <FormGroup>
                                                        <label for="txt-company">ID del movimiento</label>
                                                        <input type="text" className="form-control mb-3" placeholder="" disabled="true" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <label for="txt-company">Fecha del movimiento</label>
                                                        <input type="date" className="form-control mb-3" placeholder="Juan López Zavala" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="txt-address">Proovedor</label>
                                                        <input type="text" className="form-control mb-3" placeholder="" />
                                                    </FormGroup>

                                                    <Row>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <label for="txt-city">Almacen de origen</label>
                                                                <input type="text" className="form-control mb-3" placeholder="" />
                                                            </FormGroup>
                                                        </Col>

                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <label for="txt-city">Almacen de destino</label>
                                                                <input type="text" className="form-control mb-3" placeholder="" />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                                    <FormGroup>
                                                        <label for="exampleInputPassword1">Tipo de movimiento</label>
                                                        <select class="form-select mb-3" aria-label="Default select example">
                                                            <option>COMPRA</option>
                                                            <option>TRASPASO</option>
                                                            <option>AJUSTE</option>
                                                            <option>VENTA</option>
                                                        </select>
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="txt-phone">Notas</label>
                                                        <Input type="textarea" className="mb-3" placeholder="" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="txt-phone">Empleado</label>
                                                        <input type="text" className="form-control mb-3" placeholder="XXX-XXX-XX-XX" />
                                                    </FormGroup>

                                                </Form>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="primary" onClick={this.toggle}>Agregar</Button>
                                                <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
                                            </ModalFooter>
                                        </Modal>
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
                                                        <td className="text-center"><button type="button" className="btn btn-primary">
                                                            <BsPencilFill /></button></td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}