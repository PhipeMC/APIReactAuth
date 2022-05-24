import { Component, useEffect, useState } from "react";
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
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../Images/northwindLogoUnico.png';
import Profile from '../Images/stone-cold-steve-austin-wwe.jpg';
import { post } from "jquery";


export class Warehouse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false, modal2: false, data: [],accion: 0, id: 0,
            description: "", address: ""
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        fetch('/api/warehouses').then((response) => {
            return response.json();
        }).then((dataApi) => {
            this.setState({ data: dataApi })
        }).catch(function (error) {
            console.log(error);
        })
    }

    create = (warehouse) => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(warehouse)
        };

        fetch('/api/warehouses', options)
            .then(
                (response) => { return response.status; }
            ).then(
                (code) => {
                    if (code == 201) {
                        console.log(code);

                        const warehouses = Array.from(this.state.data);
                        warehouses.push({ warehouseId: warehouse.warehouseId, 
                                        description: warehouse.description,
                                        address: warehouse.address});
                        this.componentDidMount();
                        this.setState({ accion: 0 });

                    }
                }
            );
        }

        handleClick() {
            /*console.log('this is:', this);
            console.log('e:', e.target);
            console.log('e:', e);*/
            //this.setState({ modalUpdate: true });
            const warehouse = {
                //WarehouseId: null,
                Description: this.state.description,
                Address: this.state.address,
                CompanyId: 1
            };
    
            console.log(warehouse);
    
            switch (this.state.accion) {
                case 1:
                    this.create(warehouse);
                    break;
    
                case 2:
                    this.edit(warehouse);
                    break;
            }
    
        }
    
        handleChange = (e) => {
            if (e.target.name == 'warehouseId') {
                const alm = Array.from(e.target.selectedOptions, option => option.value);
                console.log(alm);
                this.setState({ warehouseId: alm });
                console.log(this.state);
            }else {
                this.setState({ [e.target.name]: e.target.value });
            }
        };

    mitoogle = () => {
        this.setState({ accion: 0 });
    }

    mostrarModalAgregar = () => {
        this.setState({
            accion: 1,
        });
    };

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
                            <a href="/warehouses" className="d-block p-3 text-white selected"><BsInboxesFill className="me-2 lead" /> Almacenes</a>
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
                                        <Button color="primary" onClick={() => this.mostrarModalAgregar()}><BsPlusLg /> Agregar </Button>
                                    </div>
                                    <div>
                                        <Modal isOpen={this.state.accion == 1} toggle={this.mitoggle} className={this.props.className} centered>
                                            <ModalHeader toggle={this.mitoogle} className="text-dark" close={<Button onClick={this.mitoogle} className="btn-close"></Button>}>Agregar Almacen</ModalHeader>
                                            <ModalBody className="text-dark">
                                                <Form>
                                                    <FormGroup>
                                                        <label for="txt-company">ID del almacen</label>
                                                        <input type="text" className="form-control mb-3" placeholder="" disabled="true" />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <label for="txt-company">Descripción del almacen</label>
                                                        <input type="text" name="description" className="form-control mb-3" onChange={this.handleChange} value={this.state.description} placeholder="Empresa-X" />
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <label for="txt-company">Dirección del almacen</label>
                                                        <input type="text" name="address" className="form-control mb-3" onChange={this.handleChange} value={this.state.address} placeholder="Juan López Zavala" />
                                                    </FormGroup>
                                                </Form>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="primary" onClick={this.handleClick}>Agregar</Button>
                                                <Button color="secondary" onClick={this.mitoogle}>Cancelar</Button>
                                            </ModalFooter>
                                        </Modal>
                                    </div>
                                    <Table className="dt-responsive nowrap align-middle px-2">
                                        <thead>
                                            <tr>
                                                <th>Clave</th>
                                                <th>Descripción</th>
                                                <th>Dirección</th>
                                                <th className="text-center">Operacion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.data.map(warehouses =>
                                                    <tr key={warehouses.warehouseId}>
                                                        <th scope="row">{warehouses.warehouseId}</th>
                                                        <td>{warehouses.description}</td>
                                                        <td>{warehouses.address}</td>
                                                        <td className="text-center"><Button type="button" onClick={this.toggle2} className="btn btn-primary">
                                                            <BsPencilFill /></Button>
                                                            <Modal isOpen={this.state.modal2} toggle={this.toggle2} className={this.props.className} centered>
                                                                <ModalHeader toggle={this.toggle2} className="text-dark" close={<Button onClick={this.toggle2} className="btn-close"></Button>}>Editar Almacen</ModalHeader>
                                                                <ModalBody className="text-dark">
                                                                    <Form>
                                                                        <FormGroup>
                                                                            <label for="txt-company">ID del almacen</label>
                                                                            <input type="text" className="form-control mb-3" placeholder="" disabled="true" />
                                                                        </FormGroup>
                                                                        <FormGroup>
                                                                            <label for="txt-company">Descripción del almacen</label>
                                                                            <input type="text" name="description" className="form-control mb-3" placeholder="Empresa-X" />
                                                                        </FormGroup>

                                                                        <FormGroup>
                                                                            <label for="txt-company">Dirección del almacen</label>
                                                                            <input type="text" name="address" className="form-control mb-3" placeholder="Juan López Zavala" />
                                                                        </FormGroup>
                                                                    </Form>
                                                                </ModalBody>
                                                                <ModalFooter>
                                                                    <Button color="primary" onClick={this.toggle2}>Editar</Button>
                                                                    <Button color="secondary" onClick={this.toggle2}>Cancelar</Button>
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}