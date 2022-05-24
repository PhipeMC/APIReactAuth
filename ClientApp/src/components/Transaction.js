import { Component } from "react";
import {
    Button, Form, Navbar, Input, UncontrolledDropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Card, CardBody, CardTitle, CardSubtitle,
    CardText, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Table
} from "reactstrap";
import {
    BsPlusLg, BsSearch, BsFillDiagram3Fill, BsBasketFill, BsBoxSeam,
    BsListStars, BsInboxesFill, BsTable, BsPencilFill
} from "react-icons/bs";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/transactions.css';
import Logo from '../Images/northwindLogoUnico.png';
import Profile from '../Images/stone-cold-steve-austin-wwe.jpg';

export class Transaction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false, data: []
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        fetch('/api/suppliers').then((response) => {
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
                            <a href="/suppliers" className="d-block p-3 text-white selected"><BsBasketFill className="me-2 lead" /> Proveedores</a>
                            <a href="/warehouses" className="d-block p-3 text-white"><BsInboxesFill className="me-2 lead" /> Almacenes</a>
                            <a href="/movements" className="d-block p-3 text-white"><BsTable className="me-2 lead" /> Movimientos</a>
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
                                            <ModalHeader toggle={this.toggle} className="text-dark" close={<Button onClick={this.toggle} className="btn-close"></Button>}>Agregar Proveedor</ModalHeader>
                                            <ModalBody className="text-dark">
                                                <Form>
                                                    <FormGroup>
                                                        <label for="txt-company">ID de la compañia</label>
                                                        <input type="text" className="form-control mb-3" placeholder="" disabled="true" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <label for="txt-company">Nombre de la compañia</label>
                                                        <input type="text" className="form-control mb-3" placeholder="Empresa-X" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="txt-company">Nombre del proovedor</label>
                                                        <input type="text" className="form-control mb-3" placeholder="Juan López Zavala" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="txt-address">Direccion del proovedor</label>
                                                        <input type="text" className="form-control mb-3" placeholder="Prolongacion Emiliano Zapata 654" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="txt-city">Ciudad</label>
                                                        <input type="text" className="form-control mb-3" placeholder="Morelia" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="txt-cp">Codigo postal</label>
                                                        <input type="text" className="form-control mb-3" placeholder="384571" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="txt-country">Pais</label>
                                                        <input type="text" className="form-control mb-3" placeholder="México" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="txt-phone">Telefono de contacto</label>
                                                        <input type="tel" className="form-control mb-3" placeholder="XXX-XXX-XX-XX" />
                                                    </FormGroup>
                                                </Form>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="primary" onClick={this.toggle}>Agregar</Button>
                                                <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
                                            </ModalFooter>
                                        </Modal>
                                    </div>
                                    <Table id="example" className="table dt-responsive nowrap align-middle px-2">
                                        <thead>
                                            <tr>
                                                <th>Clave</th>
                                                <th>Compañia</th>
                                                <th>Contacto</th>
                                                <th>Dirección</th>
                                                <th>Ciudad</th>
                                                <th>C.P.</th>
                                                <th>Pais</th>
                                                <th>Telefono</th>
                                                <th className="text-center">Operacion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.data.map(suppliers => 
                                                    //console.log(suppliers);
                                                    <tr key={suppliers.supplierId}>
                                                        <th scope="row">{suppliers.supplierId}</th>
                                                        <td>{suppliers.companyName}</td>
                                                        <td>{suppliers.contactName}</td>
                                                        <td>{suppliers.address}</td>
                                                        <td>{suppliers.city}</td>
                                                        <td>{suppliers.postalCode}</td>
                                                        <td>{suppliers.country}</td>
                                                        <td>{suppliers.phone}</td>
                                                        <td className="text-center"><Button type="button" onClick={this.toggle} className="btn btn-primary">
                                                            <BsPencilFill /></Button>
                                                            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} centered>
                                            <ModalHeader toggle={this.toggle} className="text-dark" close={<Button onClick={this.toggle} className="btn-close"></Button>}>Agregar Proveedor</ModalHeader>
                                            <ModalBody className="text-dark">
                                                <Form>
                                                    <FormGroup>
                                                        <label for="txt-company">ID de la compañia</label>
                                                        <input type="text" className="form-control mb-3" placeholder="" disabled="true" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <label for="txt-company">Nombre de la compañia</label>
                                                        <input type="text" className="form-control mb-3" placeholder="Empresa-X" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="txt-company">Nombre del proovedor</label>
                                                        <input type="text" className="form-control mb-3" placeholder="Juan López Zavala" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="txt-address">Direccion del proovedor</label>
                                                        <input type="text" className="form-control mb-3" placeholder="Prolongacion Emiliano Zapata 654" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="txt-city">Ciudad</label>
                                                        <input type="text" className="form-control mb-3" placeholder="Morelia" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="txt-cp">Codigo postal</label>
                                                        <input type="text" className="form-control mb-3" placeholder="384571" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="txt-country">Pais</label>
                                                        <input type="text" className="form-control mb-3" placeholder="México" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="txt-phone">Telefono de contacto</label>
                                                        <input type="tel" className="form-control mb-3" placeholder="XXX-XXX-XX-XX" />
                                                    </FormGroup>
                                                </Form>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="primary" onClick={this.toggle}>Agregar</Button>
                                                <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
                                            </ModalFooter>
                                        </Modal>
                                                            </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                            {/*<div className="modal" tabindex="-1" id="exampleModal">
                                <div className="modal-dialog modal-lg">
                                    <div className="modal-content ">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Detalles del producto</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="d-flex flex-md-row flex-column justify-content-between">
                                                <div className="card mx-3 border-s mt-3 mt-md-0">
                                                    <div className="card-body">
                                                        <h2 className="fs-6 pb-2 text-primary">Producto</h2>
                                                        <h2 className="fs-4">Totopos DelHogar</h2>
                                                        <h2 className="fs-6 pb-2 text-primary">Proveedor</h2>
                                                        <h2 className="fs-4">Surtidora Zeta</h2>
                                                    </div>
                                                </div>
                                                <div className="card mx-3 border-s mt-3 mt-md-0">
                                                    <div className="card-body">
                                                        <h2 className="fs-6 pb-2 text-primary">Nota</h2>
                                                        <h2 className="fs-4">Hacia falta producto</h2>
                                                        <h2 className="fs-6 pb-2 text-primary">Cantidad</h2>
                                                        <h2 className="fs-4">25</h2>
                                                    </div>
                                                </div>
                                                <div className="card mx-3 border-s mt-3 mt-md-0">
                                                    <div className="card-body">
                                                        <h2 className="fs-6 pb-2 text-primary">Almacen de origen</h2>
                                                        <h2 className="fs-4">Francisco I. Madero #13</h2>
                                                        <h2 className="fs-6 pb-2 text-primary">Almacen de destino</h2>
                                                        <h2 className="fs-4">Puebla #4</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>*/}
                            {/*<div className="modal" tabindex="-1" id="ModalAgregar">
                                <div className="modal-dialog modal-sm">
                                    <div className="modal-content ">
                                        <div className="modal-header">
                                            <h5 className="modal-title ">Agregar Movimiento</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="d-flex flex-md-row flex-column justify-content-between">
                                                <div className="card mx-3 border-s mt-3 mt-md-0">
                                                    <div className="card-body">
                                                        <div className="form">
                                                            <label for="exampleInputPassword1">Fecha</label>
                                                            <input type="date" className="form-control mb-3" placeholder="dd-mm-yyyy" />

                                                            <label for="exampleInputPassword1">Tipo de Movimiento</label>
                                                            <select className="form-select mb-3" aria-label="Default select example">
                                                                <option>Selecciona...</option>
                                                                <option>Compra</option>
                                                                <option>Venta</option>
                                                                <option>Ajuste</option>
                                                                <option>Traspaso</option>
                                                            </select>

                                                            <label for="exampleInputPassword1">Almacen Origen</label>
                                                            <select className="form-select mb-3" aria-label="Default select example">
                                                                <option>Selecciona...</option>
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                            </select>

                                                            <label for="exampleInputPassword1">Almacen Destino</label>
                                                            <select className="form-select mb-3" aria-label="Default select example">
                                                                <option>Selecciona...</option>
                                                                <option>1</option>
                                                                <option>2</option>
                                                                <option>3</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" className="btn btn-primary">Guardar movimiento</button>
                                        </div>
                                    </div>
                                </div>
                        </div>*/}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}